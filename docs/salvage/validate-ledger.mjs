#!/usr/bin/env node
// No-dependency validator for docs/salvage/ledger.json against ledger.schema.json.
// Implements exactly the JSON Schema keywords the schema uses (type, const, enum,
// pattern, required, additionalProperties, minItems/maxItems, $ref into $defs),
// plus two checks JSON Schema cannot express: id uniqueness and per-lane counts.
// Usage: node docs/salvage/validate-ledger.mjs

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(readFileSync(join(here, "ledger.schema.json"), "utf8"));
const ledger = JSON.parse(readFileSync(join(here, "ledger.json"), "utf8"));

const errors = [];

function typeOf(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function resolveRef(ref) {
  // Supports "#/$defs/<name>" only.
  const m = /^#\/\$defs\/(.+)$/.exec(ref);
  if (!m) throw new Error(`Unsupported $ref: ${ref}`);
  return schema.$defs[m[1]];
}

function validate(value, sch, path) {
  if (sch.$ref) sch = resolveRef(sch.$ref);
  if (sch.type) {
    const types = Array.isArray(sch.type) ? sch.type : [sch.type];
    const t = typeOf(value);
    const ok = types.some((x) => x === t || (x === "integer" && t === "number" && Number.isInteger(value)));
    if (!ok) {
      errors.push(`${path}: expected type ${types.join("|")}, got ${t}`);
      return;
    }
  }
  if ("const" in sch && value !== sch.const) {
    errors.push(`${path}: expected const ${JSON.stringify(sch.const)}, got ${JSON.stringify(value)}`);
  }
  if (sch.enum && !sch.enum.includes(value)) {
    errors.push(`${path}: ${JSON.stringify(value)} not in enum ${JSON.stringify(sch.enum)}`);
  }
  if (sch.pattern && typeof value === "string" && !new RegExp(sch.pattern).test(value)) {
    errors.push(`${path}: ${JSON.stringify(value)} does not match pattern ${sch.pattern}`);
  }
  if (typeOf(value) === "object") {
    for (const req of sch.required ?? []) {
      if (!(req in value)) errors.push(`${path}: missing required property "${req}"`);
    }
    for (const [k, v] of Object.entries(value)) {
      const propSchema = sch.properties?.[k];
      if (propSchema) validate(v, propSchema, `${path}.${k}`);
      else if (sch.additionalProperties === false) errors.push(`${path}: unexpected property "${k}"`);
    }
  }
  if (typeOf(value) === "array") {
    if (sch.minItems !== undefined && value.length < sch.minItems)
      errors.push(`${path}: has ${value.length} items, minItems ${sch.minItems}`);
    if (sch.maxItems !== undefined && value.length > sch.maxItems)
      errors.push(`${path}: has ${value.length} items, maxItems ${sch.maxItems}`);
    if (sch.items) value.forEach((item, i) => validate(item, sch.items, `${path}[${i}]`));
  }
}

validate(ledger, schema, "ledger");

// Cross-entry checks the schema cannot express.
const ids = new Set();
for (const e of ledger.entries ?? []) {
  if (ids.has(e.id)) errors.push(`duplicate entry id: ${e.id}`);
  ids.add(e.id);
  const laneLang = { "#8": "fr", "#9": "fr", "#10": "ta", "#11": "ta" }[e.lane];
  if (laneLang && e.language !== laneLang)
    errors.push(`${e.id}: lane ${e.lane} implies language ${laneLang}, got ${e.language}`);
  if (e.sourceFile && e.sourceLesson) {
    const expected = `src/lib/content/${e.sourceLesson.slice(0, 2)}/lesson-${e.sourceLesson.slice(3)}.ts`;
    if (e.sourceFile !== expected)
      errors.push(`${e.id}: sourceFile ${e.sourceFile} does not match sourceLesson ${e.sourceLesson}`);
  }
}

const laneCounts = {};
for (const e of ledger.entries ?? []) laneCounts[e.lane] = (laneCounts[e.lane] ?? 0) + 1;
const expectedLaneCounts = { "#8": 24, "#9": 40, "#10": 33, "#11": 31 };
for (const [lane, expected] of Object.entries(expectedLaneCounts)) {
  const got = laneCounts[lane] ?? 0;
  if (got !== expected) errors.push(`lane ${lane}: expected ${expected} entries, got ${got}`);
}

console.log("Per-lane entry counts:");
for (const lane of ["#8", "#9", "#10", "#11"]) console.log(`  ${lane}: ${laneCounts[lane] ?? 0}`);
console.log(`  total: ${ledger.entries?.length ?? 0}`);

if (errors.length) {
  console.error(`\nFAIL — ${errors.length} error(s):`);
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}
console.log("\nOK — ledger.json is valid against ledger.schema.json.");
