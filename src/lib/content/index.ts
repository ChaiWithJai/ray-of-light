/**
 * The content index — the only place raw authored lessons become trusted data.
 *
 * Everything is parsed through `Lesson` here rather than being cast, so a typo in
 * a content file is a loud failure at import time (and in `npm test`) instead of
 * a silently broken lesson at runtime.
 */
import {
	Lesson,
	type Construction,
	type CourseManifest,
	type LanguageCode,
	type LessonLine
} from '$lib/schemas/content.js';
import { FR_LESSONS, FR_PROFILE } from './fr.js';
import { TA_LESSONS, TA_PROFILE } from './ta.js';
import { validateReviewGate } from './review-gate.js';

/** Bumped whenever content changes, so evidence can cite what it was recorded against. */
export const CONTENT_VERSION = '2026.08.23-poc.1';

export type Course = {
	language: LanguageCode;
	contentVersion: string;
	lessons: Lesson[];
	/** Every construction in the course, by id. */
	constructions: Map<string, Construction>;
};

/**
 * Constructions must resolve across the whole course, not within one lesson.
 * Lessons recombine what earlier lessons introduced — a line in lesson 10 that
 * exercises `fr.je-voudrais` from lesson 1 is correct content, not an error. What
 * would be an error is referencing an id that is never defined anywhere, because
 * the progress map would then render a state for something with no label.
 */
function validateCourse(language: LanguageCode, lessons: Lesson[]): Course {
	const constructions = new Map<string, Construction>();
	for (const lesson of lessons) {
		for (const construction of lesson.constructions) {
			constructions.set(construction.id, construction);
		}
	}

	const dangling: string[] = [];
	for (const lesson of lessons) {
		const referenced = [
			...lesson.lines.flatMap((l) => l.constructions),
			...lesson.exercises.flatMap((e) => e.constructions),
			...lesson.exercises.flatMap((e) => (e.kind === 'transfer' ? [e.useConstruction] : []))
		];
		for (const id of referenced) {
			if (!constructions.has(id)) dangling.push(`${lesson.id} → ${id}`);
		}
	}

	if (dangling.length > 0) {
		throw new Error(
			`Course "${language}" references constructions that are never defined:\n  ${dangling.join('\n  ')}`
		);
	}

	return { language, contentVersion: CONTENT_VERSION, lessons, constructions };
}

function buildCourse(language: LanguageCode, raw: unknown[]): Course {
	const lessons = raw.map((lesson, i) => {
		const parsed = Lesson.safeParse(lesson);
		if (!parsed.success) {
			const detail = parsed.error.issues
				.map((issue) => `    ${issue.path.join('.') || '(root)'}: ${issue.message}`)
				.join('\n');
			throw new Error(`Invalid ${language} lesson at index ${i}:\n${detail}`);
		}
		return parsed.data;
	});

	lessons.sort((a, b) => a.index - b.index);
	return validateCourse(language, lessons);
}

export const COURSES: Record<LanguageCode, Course> = {
	fr: buildCourse('fr', FR_LESSONS),
	ta: buildCourse('ta', TA_LESSONS)
};

/**
 * The native-review promotion gate runs here, at module init, so a
 * `reviewStatus` claim without hash-matched approved records fails at app
 * import time exactly like a dangling construction reference — not only in
 * tests. `review-gate.ts` is pure (it does not import this module), which is
 * what makes this call cycle-free. See docs/NATIVE-REVIEW.md.
 */
validateReviewGate(COURSES);

export const LANGUAGE_PROFILES = { fr: FR_PROFILE, ta: TA_PROFILE };

export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
	fr: 'French',
	ta: 'Tamil'
};

/* -------------------------------------------------------------------------- */
/* Lookups                                                                     */
/* -------------------------------------------------------------------------- */

export function getCourse(language: LanguageCode): Course {
	return COURSES[language];
}

export function getLesson(language: LanguageCode, lessonId: string): Lesson | undefined {
	return COURSES[language].lessons.find((l) => l.id === lessonId);
}

export function getLessonByIndex(language: LanguageCode, index: number): Lesson | undefined {
	return COURSES[language].lessons.find((l) => l.index === index);
}

export function getConstruction(
	language: LanguageCode,
	id: string
): Construction | undefined {
	return COURSES[language].constructions.get(id);
}

/** Constructions introduced at or before `index` — what the learner "owns". */
export function constructionsMetBy(language: LanguageCode, index: number): Construction[] {
	const course = COURSES[language];
	const metLessonIds = new Set(
		course.lessons.filter((l) => l.index <= index).map((l) => l.id)
	);
	return [...course.constructions.values()].filter((c) => metLessonIds.has(c.introducedIn));
}

/** Every line the learner has met — the corpus the phrase library searches. */
export function linesMetBy(language: LanguageCode, index: number): LessonLine[] {
	return COURSES[language].lessons.filter((l) => l.index <= index).flatMap((l) => l.lines);
}

/** The lightweight listing Book and the scheduler work from. */
export function courseManifest(language: LanguageCode): CourseManifest {
	const course = COURSES[language];
	return {
		language,
		contentVersion: course.contentVersion,
		lessons: course.lessons.map((l) => ({
			id: l.id,
			index: l.index,
			kind: l.kind,
			title: l.title,
			situation: l.situation,
			level: l.level,
			lineCount: l.lines.length,
			constructionIds: l.constructions.map((c) => c.id),
			reviewStatus: l.provenance.reviewStatus
		})),
		constructions: [...course.constructions.values()]
	};
}

/**
 * True when no canonical recording exists yet for this course. The UI uses this
 * to say so plainly rather than presenting a player that cannot play.
 * See docs/ISSUE-1-LIMITATIONS.md L1.
 */
export function audioPending(language: LanguageCode): boolean {
	return COURSES[language].lessons.some((l) => l.lines.some((line) => line.audio.pending));
}
