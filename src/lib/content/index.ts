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
export const CONTENT_VERSION = '2026.08.23-poc.2';

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
 *
 * The one place references are lesson-local: a construction must be exercised by
 * its own `introducedIn` lesson, which must exist — "introduced in" means taught
 * there, not merely claimed there.
 */
export function validateCourse(language: LanguageCode, lessons: Lesson[]): Course {
	// One id, one meaning (issue #12). A construction may be re-declared — a
	// synthesis lesson carrying an earlier construction is correct content — but
	// only verbatim. Two declarations that disagree about label, gloss or origin
	// are not a tie to break silently; last-writer-wins here would let a review
	// lesson quietly redefine what the progress map says the learner knows.
	const constructions = new Map<string, Construction>();
	const conflicts: string[] = [];
	for (const lesson of lessons) {
		for (const construction of lesson.constructions) {
			const existing = constructions.get(construction.id);
			if (existing === undefined) {
				constructions.set(construction.id, construction);
				continue;
			}
			for (const field of ['label', 'gloss', 'introducedIn'] as const) {
				if (existing[field] !== construction[field]) {
					conflicts.push(
						`${construction.id}: ${lesson.id} re-declares ${field} as ${JSON.stringify(construction[field])}, ` +
							`but it is ${JSON.stringify(existing[field])}`
					);
				}
			}
		}
	}
	if (conflicts.length > 0) {
		throw new Error(
			`Course "${language}" has conflicting construction metadata:\n  ${conflicts.join('\n  ')}`
		);
	}

	const dangling: string[] = [];
	const referencedIds = new Set<string>();
	/** Which constructions each lesson actually touches in a line or exercise. */
	const referencedByLesson = new Map<string, Set<string>>();
	for (const lesson of lessons) {
		const referenced = [
			...lesson.lines.flatMap((l) => l.constructions),
			...lesson.exercises.flatMap((e) => e.constructions),
			...lesson.exercises.flatMap((e) => (e.kind === 'transfer' ? [e.useConstruction] : []))
		];
		const inThisLesson = new Set<string>();
		referencedByLesson.set(lesson.id, inThisLesson);
		for (const id of referenced) {
			referencedIds.add(id);
			inThisLesson.add(id);
			if (!constructions.has(id)) dangling.push(`${lesson.id} → ${id}`);
		}
	}

	if (dangling.length > 0) {
		throw new Error(
			`Course "${language}" references constructions that are never defined:\n  ${dangling.join('\n  ')}`
		);
	}

	// Reachability runs the other way too (issue #12): a declared construction
	// no line or exercise ever touches can never generate learner evidence, so
	// it would sit on the progress map forever as unearnable state. Declared
	// means teachable and observable, not merely counted.
	const phantoms = [...constructions.keys()].filter((id) => !referencedIds.has(id));
	if (phantoms.length > 0) {
		throw new Error(
			`Course "${language}" declares constructions no line or exercise references:\n  ${phantoms.join('\n  ')}`
		);
	}

	// "Introduced in" must mean taught there (issue #12, PR review). A
	// construction's `introducedIn` names the lesson the progress map credits
	// with teaching it, so that lesson must exist and must actually exercise the
	// construction in at least one line or exercise — being referenced only by
	// some later lesson would make the introduction a claim with no teaching
	// behind it.
	const lessonIds = new Set(lessons.map((l) => l.id));
	const untaught: string[] = [];
	for (const construction of constructions.values()) {
		if (!lessonIds.has(construction.introducedIn)) {
			untaught.push(
				`${construction.id}: introducedIn "${construction.introducedIn}" is not a lesson in this course`
			);
			continue;
		}
		if (!referencedByLesson.get(construction.introducedIn)?.has(construction.id)) {
			untaught.push(
				`${construction.id}: introducedIn "${construction.introducedIn}", but no line or exercise in that lesson references it`
			);
		}
	}
	if (untaught.length > 0) {
		throw new Error(
			`Course "${language}" has constructions not taught in their introducing lesson:\n  ${untaught.join('\n  ')}`
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
