import { describe, expect, it } from 'vitest';
import { CourseManifest, Lesson, type LanguageCode } from '../schemas/content.js';
import {
	buildManifest,
	frLessonModules,
	frLessons,
	getLesson,
	taLessonModules,
	taLessons
} from './index.js';

/**
 * NOTE: while content is still landing, these tests fail — that is expected.
 * Every failure message names the lesson file (or index) that is missing or
 * invalid so the offending author can be found without spelunking.
 */

const LESSON_COUNT = 14;
const SYNTHESIS_INDICES = [7, 14];

const languages: { language: LanguageCode; modules: Record<string, { lesson?: unknown }> }[] = [
	{ language: 'fr', modules: frLessonModules },
	{ language: 'ta', modules: taLessonModules }
];

function formatZodIssues(error: { issues: { path: PropertyKey[]; message: string }[] }): string {
	return error.issues
		.map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
		.join('\n');
}

describe.each(languages)('$language lesson files', ({ language, modules }) => {
	const files = Object.keys(modules).sort();

	it('discovers at least one lesson file', () => {
		expect(files, `no ./${language}/lesson-*.ts files found (content not landed yet?)`).not.toHaveLength(
			0
		);
	});

	it.each(files)('%s parses as a valid Lesson', (file) => {
		const mod = modules[file];
		expect(mod.lesson, `${file} does not export \`lesson\``).toBeDefined();
		const result = Lesson.safeParse(mod.lesson);
		if (!result.success) {
			expect.fail(`${file} failed Lesson.parse:\n${formatZodIssues(result.error)}`);
		}
		expect(result.data.language, `${file} declares the wrong language`).toBe(language);
	});
});

describe.each(languages)('$language course shape', ({ language }) => {
	const lessons = language === 'fr' ? frLessons : taLessons;

	it(`has exactly ${LESSON_COUNT} lessons with contiguous indices`, () => {
		const present = lessons.map((l) => l.index);
		const missing = Array.from({ length: LESSON_COUNT }, (_, i) => i + 1).filter(
			(i) => !present.includes(i)
		);
		expect(
			missing,
			`${language} is missing lesson index(es) ${missing.join(', ')} ` +
				`(expected ./${language}/lesson-NN.ts for each of 1-${LESSON_COUNT})`
		).toHaveLength(0);
		expect(
			present,
			`${language} has ${present.length} lessons, expected ${LESSON_COUNT}: [${present.join(', ')}]`
		).toHaveLength(LESSON_COUNT);
		const duplicates = present.filter((idx, i) => present.indexOf(idx) !== i);
		expect(duplicates, `${language} has duplicate lesson index(es) ${duplicates.join(', ')}`).toHaveLength(
			0
		);
	});

	it(`has synthesis lessons at ${SYNTHESIS_INDICES.join(' and ')} and nowhere else`, () => {
		for (const lesson of lessons) {
			const shouldBeSynthesis = SYNTHESIS_INDICES.includes(lesson.index);
			expect(
				lesson.kind,
				`${lesson.id} (index ${lesson.index}) should be ${shouldBeSynthesis ? 'synthesis' : 'regular'}`
			).toBe(shouldBeSynthesis ? 'synthesis' : 'regular');
		}
	});

	it('builds a manifest that satisfies CourseManifest.parse', () => {
		const result = CourseManifest.safeParse(buildManifest(language));
		if (!result.success) {
			expect.fail(
				`buildManifest('${language}') failed CourseManifest.parse:\n${formatZodIssues(result.error)}`
			);
		}
	});

	it('resolves every referenced construction to a declared one', () => {
		const declared = new Set(lessons.flatMap((l) => l.constructions.map((c) => c.id)));
		for (const lesson of lessons) {
			const referenced = [
				...lesson.lines.flatMap((line) => line.constructions.map((id) => ({ id, via: line.id }))),
				...lesson.exercises.flatMap((ex) => ex.constructions.map((id) => ({ id, via: ex.id })))
			];
			for (const { id, via } of referenced) {
				expect(
					declared.has(id),
					`${lesson.id}: "${via}" references construction "${id}", which no ${language} lesson declares`
				).toBe(true);
			}
		}
	});

	it('is reachable through getLesson', () => {
		for (const lesson of lessons) {
			expect(getLesson(language, lesson.index)?.id, `getLesson('${language}', ${lesson.index})`).toBe(
				lesson.id
			);
		}
	});
});

describe('tamil scaffolding (AC 9)', () => {
	it('gives every line a transliteration and a literal English gloss', () => {
		for (const lesson of taLessons) {
			for (const line of lesson.lines) {
				expect(
					line.transliteration,
					`${lesson.id}: line ${line.id} is missing a transliteration`
				).toBeTruthy();
				expect(
					line.literalEnglish,
					`${lesson.id}: line ${line.id} is missing a literalEnglish gloss`
				).toBeTruthy();
			}
		}
	});
});
