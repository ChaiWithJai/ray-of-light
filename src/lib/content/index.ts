/// <reference types="vite/client" />
/**
 * Content registry.
 *
 * Lesson files live at `./fr/lesson-NN.ts` and `./ta/lesson-NN.ts`, each
 * exporting `export const lesson: Lesson`. They are discovered eagerly at
 * build time via `import.meta.glob`, so adding a lesson file is all that is
 * required to ship it — no manual registration list to forget.
 */
import type { Construction, CourseManifest, LanguageCode, Lesson } from '../schemas/content.js';

/** Bumped when shipped lesson content changes shape or substance. */
export const CONTENT_VERSION = '0.1.0';

interface LessonModule {
	lesson: Lesson;
}

/**
 * Raw discovered modules, keyed by file path relative to this directory.
 * Exported so tests can validate every file and name the offender when one
 * fails to parse.
 */
export const frLessonModules = import.meta.glob<LessonModule>('./fr/lesson-*.ts', {
	eager: true
});
export const taLessonModules = import.meta.glob<LessonModule>('./ta/lesson-*.ts', {
	eager: true
});

function collect(modules: Record<string, LessonModule>): Lesson[] {
	return Object.values(modules)
		.map((mod) => mod.lesson)
		.filter((lesson): lesson is Lesson => lesson !== undefined)
		.sort((a, b) => a.index - b.index);
}

export const frLessons: Lesson[] = collect(frLessonModules);
export const taLessons: Lesson[] = collect(taLessonModules);

export function lessonsFor(language: LanguageCode): Lesson[] {
	return language === 'fr' ? frLessons : taLessons;
}

export function getLesson(language: LanguageCode, index: number): Lesson | undefined {
	return lessonsFor(language).find((lesson) => lesson.index === index);
}

/**
 * Deduplicate constructions by id across lessons. Synthesis lessons re-declare
 * constructions from earlier lessons; the canonical declaration is the one
 * that lives in the lesson `introducedIn` points at, and lessons are visited
 * in index order so the earliest such declaration wins.
 */
function dedupeConstructions(lessons: Lesson[]): Construction[] {
	const byId = new Map<string, { construction: Construction; canonical: boolean }>();
	for (const lesson of lessons) {
		for (const construction of lesson.constructions) {
			const canonical = construction.introducedIn === lesson.id;
			const existing = byId.get(construction.id);
			if (!existing || (canonical && !existing.canonical)) {
				byId.set(construction.id, { construction, canonical });
			}
		}
	}
	return [...byId.values()].map((entry) => entry.construction);
}

/**
 * Build the course manifest for a language from the discovered lessons.
 * The result is intentionally *not* parsed here — `CourseManifest.parse` is
 * the caller's (and the test suite's) job, so an incomplete course fails
 * loudly at the validation boundary rather than silently here.
 */
export function buildManifest(language: LanguageCode): CourseManifest {
	const lessons = lessonsFor(language);
	return {
		language,
		contentVersion: CONTENT_VERSION,
		lessons: lessons.map((lesson) => ({
			id: lesson.id,
			index: lesson.index,
			kind: lesson.kind,
			title: lesson.title,
			situation: lesson.situation,
			level: lesson.level,
			lineCount: lesson.lines.length,
			constructionIds: lesson.constructions.map((c) => c.id),
			reviewStatus: lesson.provenance.reviewStatus
		})),
		constructions: dedupeConstructions(lessons)
	};
}
