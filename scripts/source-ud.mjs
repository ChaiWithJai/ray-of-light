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
 *   UD_French-GSD   CC BY-SA 4.0       usable with attribution + share-alike
 *   UD_Tamil-TTB    CC BY-NC-SA 3.0    NON-COMMERCIAL — deliberately NOT sourced
 *
 * The Tamil treebank is excluded on purpose. A non-commercial licence cannot go
 * into a corpus that may ship commercially, and quietly vendoring it would be
 * exactly the "every corpus has its own licence" trap. Tamil morphology needs a
 * differently-licensed source or a native linguist — see docs/ISSUE-1-LIMITATIONS.md.
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
		file: 'fr_gsd-ud-train.conllu',
		license: 'CC BY-SA 4.0',
		attribution:
			'Universal Dependencies French-GSD treebank, https://github.com/UniversalDependencies/UD_French-GSD'
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
		const url = `https://raw.githubusercontent.com/UniversalDependencies/${source.treebank}/master/${source.file}`;

		process.stdout.write(`Fetching ${source.treebank}/${source.file}…\n`);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`${url} → HTTP ${response.status}`);
		}
		const text = await response.text();

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
					sourceFile: source.file,
					license: source.license,
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

## Sourced

| Source | License | Use |
| --- | --- | --- |
| UD_French-GSD | CC BY-SA 4.0 | Morphological annotation for French word forms used in our lessons |

Attribution: Universal Dependencies French-GSD treebank —
https://github.com/UniversalDependencies/UD_French-GSD

CC BY-SA 4.0 is share-alike. The derived lexicon in \`fr/morphology.json\` carries
that obligation; it is kept in its own directory, and out of the canonical corpus,
so the share-alike boundary is explicit rather than accidental.

## Deliberately NOT sourced

| Source | License | Why not |
| --- | --- | --- |
| UD_Tamil-TTB | **CC BY-NC-SA 3.0** | Non-commercial. Cannot go into a corpus that may ship commercially. |

Tamil morphological annotation needs a differently-licensed source or a native
linguist. See \`docs/ISSUE-1-LIMITATIONS.md\`.
`
	);

	process.stdout.write('Wrote data/reference/LICENSE.md\n');
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
