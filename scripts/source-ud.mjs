#!/usr/bin/env node
/**
 * Sources morphological annotation from Universal Dependencies.
 *
 * UD is *linguistic infrastructure*, not teaching content. Nothing it produces
 * enters the canonical corpus — it only annotates word forms that already appear
 * in lessons we wrote, so the notes drawer can show real morphology instead of
 * hand-waving.
 *
 * ## Licensing (checked, not assumed)
 *
 *   UD_French-GSD   CC BY-SA 4.0       attribution + share-alike
 *   UD_Tamil-TTB    CC BY-NC-SA 3.0    attribution + share-alike + NON-COMMERCIAL
 *
 * ⚠️  THE TAMIL LEXICON IS NON-COMMERCIAL-ONLY.
 *
 * This project is personal and non-commercial, which is exactly the use
 * CC BY-NC-SA grants — so Tamil morphology is sourced. But it is a one-way door:
 * if this ever ships commercially, `data/reference/ta/` must be deleted and Tamil
 * morphology re-sourced from something else. That is why the Tamil output carries
 * a `commercialUse: 'prohibited'` field, why `hasCommercialRestriction()` exists in
 * morphology.ts, and why a test asserts the restriction is recorded — so the
 * constraint travels with the data instead of living in someone's memory.
 *
 * Run: node scripts/source-ud.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const SOURCES = [
	{
		language: 'fr',
		treebank: 'UD_French-GSD',
		// The train split (~25MB) rather than dev (~2.5MB). Dev is news/blog/wiki
		// genre and covers function words well but misses exactly the vocabulary
		// that teaches — `voudrais`, `tomates`, `bonjour` are all absent from it.
		// The download is one-off; the committed lexicon stays tiny either way.
		files: ['fr_gsd-ud-train.conllu'],
		license: 'CC BY-SA 4.0',
		commercialUse: 'permitted',
		attribution:
			'Universal Dependencies French-GSD treebank, https://github.com/UniversalDependencies/UD_French-GSD'
	},
	{
		language: 'ta',
		treebank: 'UD_Tamil-TTB',
		// TTB is small (~1.7MB across all three splits), so take all of them —
		// Tamil is agglutinative and the corpus is news genre, so surface-form
		// overlap with conversational lessons is thin to begin with.
		files: ['ta_ttb-ud-train.conllu', 'ta_ttb-ud-dev.conllu', 'ta_ttb-ud-test.conllu'],
		license: 'CC BY-NC-SA 3.0',
		commercialUse: 'prohibited',
		attribution:
			'Universal Dependencies Tamil-TTB treebank, https://github.com/UniversalDependencies/UD_Tamil-TTB'
	}
];

const OUT_DIR = path.join(process.cwd(), 'data', 'reference');

/** Pull the word forms our own lessons actually use. */
async function lessonVocabulary(language) {
	const file = path.join(process.cwd(), 'src', 'lib', 'content', `${language}.ts`);
	const source = fs.readFileSync(file, 'utf8');
	const forms = new Set();
	for (const match of source.matchAll(/target:\s*'([^']+)'/g)) {
		for (const token of match[1].split(/[\s’'.,!?;:—–]+/)) {
			const word = token.trim().toLowerCase();
			if (word) forms.add(word);
		}
	}
	return forms;
}

/** Minimal CoNLL-U reader: form, lemma, UPOS, features. */
function* conlluTokens(text) {
	for (const line of text.split('\n')) {
		if (!line || line.startsWith('#')) continue;
		const cols = line.split('\t');
		if (cols.length < 6) continue;
		if (cols[0].includes('-') || cols[0].includes('.')) continue; // multiword ranges
		yield { form: cols[1], lemma: cols[2], upos: cols[3], feats: cols[5] };
	}
}

async function main() {
	fs.mkdirSync(OUT_DIR, { recursive: true });

	for (const source of SOURCES) {
		const vocabulary = await lessonVocabulary(source.language);
		let text = '';
		for (const file of source.files) {
			const url = `https://raw.githubusercontent.com/UniversalDependencies/${source.treebank}/master/${file}`;
			process.stdout.write(`Fetching ${source.treebank}/${file}…\n`);
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`${url} → HTTP ${response.status}`);
			}
			text += (await response.text()) + '\n';
		}

		/** form → { lemma, upos, feats, count } — restricted to our vocabulary. */
		const lexicon = {};
		let scanned = 0;
		for (const token of conlluTokens(text)) {
			scanned += 1;
			const form = token.form.toLowerCase();
			if (!vocabulary.has(form)) continue;
			const existing = lexicon[form];
			if (existing) {
				existing.count += 1;
				continue;
			}
			lexicon[form] = {
				lemma: token.lemma,
				upos: token.upos,
				feats: token.feats === '_' ? null : token.feats,
				count: 1
			};
		}

		const covered = Object.keys(lexicon).length;
		const outFile = path.join(OUT_DIR, source.language, 'morphology.json');
		fs.mkdirSync(path.dirname(outFile), { recursive: true });
		fs.writeFileSync(
			outFile,
			JSON.stringify(
				{
					$comment:
						'Derived from Universal Dependencies. Reference annotation only — never teaching content.',
					source: source.treebank,
					sourceFiles: source.files,
					license: source.license,
					commercialUse: source.commercialUse,
					attribution: source.attribution,
					derivedAt: null,
					vocabularySize: vocabulary.size,
					covered,
					lexicon: Object.fromEntries(Object.entries(lexicon).sort(([a], [b]) => a.localeCompare(b)))
				},
				null,
				'\t'
			) + '\n'
		);

		process.stdout.write(
			`  scanned ${scanned} tokens · matched ${covered}/${vocabulary.size} lesson forms\n` +
				`  → ${path.relative(process.cwd(), outFile)}\n`
		);
	}

	fs.writeFileSync(
		path.join(OUT_DIR, 'LICENSE.md'),
		`# Reference data licensing

Everything in this directory is **reference annotation**, never teaching content.
Canonical lessons are original and owned; see \`src/lib/content/\`.

## Sources

| Source | Licence | Commercial use |
| --- | --- | --- |
| UD_French-GSD | CC BY-SA 4.0 | Permitted, with attribution + share-alike |
| UD_Tamil-TTB | CC BY-NC-SA 3.0 | **PROHIBITED** |

Attribution:
- Universal Dependencies French-GSD — https://github.com/UniversalDependencies/UD_French-GSD
- Universal Dependencies Tamil-TTB — https://github.com/UniversalDependencies/UD_Tamil-TTB

## ⚠️ The Tamil lexicon is non-commercial-only

\`ta/morphology.json\` is derived from a **CC BY-NC-SA 3.0** corpus. This project is
personal and non-commercial, which is exactly the use that licence grants.

**It is a one-way door.** If this ever ships commercially:

1. Delete \`data/reference/ta/\`.
2. Remove the Tamil branch from \`src/lib/morphology.ts\`.
3. Re-source Tamil morphology from something else, or annotate our own lines.

\`hasCommercialRestriction('ta')\` returns true so the constraint is queryable in
code, and \`morphology.test.ts\` asserts it stays recorded.

## Share-alike

Both licences are share-alike, so these derived lexicons carry that obligation.
They are kept in this directory and out of the canonical corpus so the boundary is
explicit rather than accidental.

## Coverage, and why Tamil's is thin

| Language | Lesson forms covered |
| --- | --- |
| French | 174 / 184 |
| Tamil | 27 / 158 |

Tamil coverage is low for a reason worth knowing: **TTB annotates written news
Tamil, and this course teaches spoken Tamil.** The forms it lacks — \`வேணும்\`,
\`இருக்கு\`, \`குடுங்க\` — are precisely the spoken verb forms. That is the same
written/spoken split the product exists to bridge, so a larger treebank of the
same register would not help. Annotating our own lines is the real fix.
`
	);

	process.stdout.write('Wrote data/reference/LICENSE.md\n');
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
