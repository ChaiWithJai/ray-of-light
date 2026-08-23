/**
 * Canonical content schemas.
 *
 * The `LessonLine` shape is the one specified in issue #1 and is authoritative.
 * Everything else here is the surrounding structure that shape implies: lessons,
 * constructions, exercises, provenance, and the shipped bundle.
 *
 * These are runtime schemas, not just types, because the content pipeline has to
 * be able to *reject* content — AC 11 ("all canonical content has provenance,
 * licensing and native-review status") is only meaningful if it is enforced.
 */
import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

/** The two POC languages. Adding a third must not require renderer changes (D7). */
export const LanguageCode = z.enum(['fr', 'ta']);
export type LanguageCode = z.infer<typeof LanguageCode>;

/**
 * Tamil must distinguish what you say from what is written (AC 9). French only
 * ever uses `spoken`, but the field is required for both so nothing is implied.
 */
export const Register = z.enum(['spoken', 'formal', 'written']);
export type Register = z.infer<typeof Register>;

/**
 * Honest review state. `draft` is not a failure — it is the correct value for
 * content that has not yet been through a native reviewer, and shipping it
 * mislabelled would be worse than shipping it as draft.
 */
export const ReviewStatus = z.enum(['draft', 'one-native-review', 'two-native-review']);
export type ReviewStatus = z.infer<typeof ReviewStatus>;

export const NoteType = z.enum(['grammar', 'culture', 'pronunciation', 'morphology']);
export type NoteType = z.infer<typeof NoteType>;

export const CefrLevel = z.enum(['A0', 'A1', 'A2', 'B1', 'B2']);
export type CefrLevel = z.infer<typeof CefrLevel>;

/* -------------------------------------------------------------------------- */
/* Audio                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Sentence-level audio (AC 8). One clean recording per lesson is sliced by
 * `startMs`/`endMs`; issue #1 permits deriving slow playback by time-stretch, so
 * `slowUrl` is optional and the player falls back to `playbackRate`.
 */
export const AudioClip = z.object({
	normalUrl: z.string().min(1),
	slowUrl: z.string().min(1).optional(),
	speakerId: z.string().min(1),
	startMs: z.number().int().nonnegative().optional(),
	endMs: z.number().int().nonnegative().optional()
});
export type AudioClip = z.infer<typeof AudioClip>;

/** Phrase-level chunk boundaries for shadowing — never word-level. */
export const AudioChunk = z.object({
	label: z.string().min(1),
	startMs: z.number().int().nonnegative(),
	endMs: z.number().int().nonnegative()
});
export type AudioChunk = z.infer<typeof AudioChunk>;

/* -------------------------------------------------------------------------- */
/* Notes and provenance                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Notes are anchored to a span inside the line, not to the lesson — that is what
 * makes them just-in-time rather than a grammar chapter.
 */
export const LineNote = z.object({
	type: NoteType,
	text: z.string().min(1),
	/** Substring of `targetScript` the note is attached to. */
	anchor: z.string().min(1).optional()
});
export type LineNote = z.infer<typeof LineNote>;

/** Required on every canonical record. Enforced at ingest, not by convention. */
export const Provenance = z.object({
	source: z.string().min(1),
	license: z.string().min(1),
	reviewStatus: ReviewStatus
});
export type Provenance = z.infer<typeof Provenance>;

/* -------------------------------------------------------------------------- */
/* Lesson line — the shape from issue #1                                       */
/* -------------------------------------------------------------------------- */

export const LessonLine = z
	.object({
		id: z.string().min(1),
		lessonId: z.string().min(1),
		language: LanguageCode,
		register: Register,
		dialect: z.string().min(1).optional(),

		/** Native script. For French this is simply the French text. */
		targetScript: z.string().min(1),
		/** Tamil scaffold, removed around L30. Required for `ta` (see refine below). */
		transliteration: z.string().min(1).optional(),
		/** Reveals target structure; distinct from the natural translation (AC 9). */
		literalEnglish: z.string().min(1).optional(),
		naturalEnglish: z.string().min(1),

		/** Who is speaking, for dialogue rendering. */
		speaker: z.string().min(1).optional(),

		audio: AudioClip,
		chunks: z.array(AudioChunk).default([]),

		/** Construction ids this line exercises — the join key to learner state. */
		constructions: z.array(z.string().min(1)).default([]),
		notes: z.array(LineNote).default([]),

		source: z.string().min(1),
		license: z.string().min(1),
		reviewStatus: ReviewStatus
	})
	.refine((line) => line.language !== 'ta' || Boolean(line.transliteration), {
		message: 'Tamil lines require a transliteration (AC 9)',
		path: ['transliteration']
	})
	.refine((line) => line.language !== 'ta' || Boolean(line.literalEnglish), {
		message: 'Tamil lines require a literal English gloss (AC 9)',
		path: ['literalEnglish']
	})
	.refine(
		(line) =>
			line.audio.startMs === undefined ||
			line.audio.endMs === undefined ||
			line.audio.endMs > line.audio.startMs,
		{ message: 'audio.endMs must be greater than audio.startMs', path: ['audio', 'endMs'] }
	);
export type LessonLine = z.infer<typeof LessonLine>;

/* -------------------------------------------------------------------------- */
/* Constructions                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The unit of learning. Progress is tracked per construction, never per lesson —
 * a lesson can be finished while its constructions remain unretrievable (AC 10).
 */
export const Construction = z.object({
	id: z.string().min(1),
	language: LanguageCode,
	/** How it is written on the progress map, e.g. "je voudrais + noun". */
	label: z.string().min(1),
	gloss: z.string().min(1),
	introducedIn: z.string().min(1),
	notes: z.string().min(1).optional()
});
export type Construction = z.infer<typeof Construction>;

/* -------------------------------------------------------------------------- */
/* Exercises                                                                   */
/* -------------------------------------------------------------------------- */

/** AC 6: the learner must attempt before the canonical answer is revealed. */
const ExerciseBase = z.object({
	id: z.string().min(1),
	lessonId: z.string().min(1),
	constructions: z.array(z.string().min(1)).default([]),
	prompt: z.string().min(1)
});

/** Multiple choice over the meaning of a line (1i). */
export const ComprehensionCheck = ExerciseBase.extend({
	kind: z.literal('comprehension'),
	lineId: z.string().min(1),
	options: z.array(z.string().min(1)).min(2),
	answerIndex: z.number().int().nonnegative()
}).refine((x) => x.answerIndex < x.options.length, {
	message: 'answerIndex is out of range',
	path: ['answerIndex']
});
export type ComprehensionCheck = z.infer<typeof ComprehensionCheck>;

/** Free production from an English cue (1k, 1m). */
export const RecallPrompt = ExerciseBase.extend({
	kind: z.literal('recall'),
	lineId: z.string().min(1).optional(),
	/** Human-reviewed accepted forms. Never fuzzy matching alone. */
	acceptedAnswers: z.array(z.string().min(1)).min(1),
	canonicalAnswer: z.string().min(1),
	hints: z.array(z.string().min(1)).default([])
});
export type RecallPrompt = z.infer<typeof RecallPrompt>;

/** One missing element, always the lesson's target construction (1l). */
export const CompletionPrompt = ExerciseBase.extend({
	kind: z.literal('completion'),
	/** Sentence with `___` marking the gap. */
	template: z.string().includes('___'),
	options: z.array(z.string().min(1)).min(2),
	answer: z.string().min(1),
	rule: z.string().min(1)
});
export type CompletionPrompt = z.infer<typeof CompletionPrompt>;

/** A new situation reusing an owned construction (1o). AC 7: one per lesson. */
export const TransferPrompt = ExerciseBase.extend({
	kind: z.literal('transfer'),
	situation: z.string().min(1),
	useConstruction: z.string().min(1),
	exemplar: z.string().min(1)
});
export type TransferPrompt = z.infer<typeof TransferPrompt>;

export const Exercise = z.discriminatedUnion('kind', [
	ComprehensionCheck,
	RecallPrompt,
	CompletionPrompt,
	TransferPrompt
]);
export type Exercise = z.infer<typeof Exercise>;

/* -------------------------------------------------------------------------- */
/* Lesson                                                                      */
/* -------------------------------------------------------------------------- */

export const LessonKind = z.enum(['regular', 'synthesis']);
export type LessonKind = z.infer<typeof LessonKind>;

/**
 * Content requirements from issue #1, enforced rather than documented:
 * 8–12 lines per regular lesson, ≥3 reusable constructions, ≥1 comprehension
 * check, ≥1 recall prompt, ≥1 transfer prompt.
 *
 * Synthesis lessons (7 and 14) introduce nothing new, so they are exempt from
 * the line-count floor but must still carry a transfer prompt.
 */
export const Lesson = z
	.object({
		id: z.string().min(1),
		language: LanguageCode,
		index: z.number().int().positive(),
		kind: LessonKind,
		title: z.string().min(1),
		situation: z.string().min(1),
		level: CefrLevel,
		lines: z.array(LessonLine).min(1),
		constructions: z.array(Construction).default([]),
		exercises: z.array(Exercise).default([]),
		provenance: Provenance
	})
	.superRefine((lesson, ctx) => {
		const issue = (message: string, path: (string | number)[] = []) =>
			ctx.addIssue({ code: 'custom', message, path });

		if (lesson.kind === 'regular') {
			if (lesson.lines.length < 8 || lesson.lines.length > 12) {
				issue(
					`regular lessons need 8-12 lines, got ${lesson.lines.length}`,
					['lines']
				);
			}
			if (lesson.constructions.length < 3) {
				issue(
					`regular lessons need at least 3 constructions, got ${lesson.constructions.length}`,
					['constructions']
				);
			}
		}

		const kinds = new Set(lesson.exercises.map((e) => e.kind));
		for (const required of ['comprehension', 'recall', 'transfer'] as const) {
			if (lesson.kind === 'synthesis' && required !== 'transfer') continue;
			if (!kinds.has(required)) {
				issue(`lesson needs at least one ${required} exercise`, ['exercises']);
			}
		}

		for (const [i, line] of lesson.lines.entries()) {
			if (line.lessonId !== lesson.id) {
				issue(`line.lessonId does not match lesson.id`, ['lines', i, 'lessonId']);
			}
			if (line.language !== lesson.language) {
				issue(`line.language does not match lesson.language`, ['lines', i, 'language']);
			}
		}

		// Every construction referenced by a line or exercise must be declared,
		// or the progress map would render state for something with no definition.
		const declared = new Set(lesson.constructions.map((c) => c.id));
		const referenced = new Set([
			...lesson.lines.flatMap((l) => l.constructions),
			...lesson.exercises.flatMap((e) => e.constructions)
		]);
		for (const ref of referenced) {
			if (!declared.has(ref)) {
				issue(`construction "${ref}" is referenced but not declared`, ['constructions']);
			}
		}
	});
export type Lesson = z.infer<typeof Lesson>;

/* -------------------------------------------------------------------------- */
/* Course and bundles                                                          */
/* -------------------------------------------------------------------------- */

/** What the app fetches once per lesson and then works from offline (D9). */
export const LessonBundle = z.object({
	contentVersion: z.string().min(1),
	lesson: Lesson
});
export type LessonBundle = z.infer<typeof LessonBundle>;

export const CourseManifestEntry = z.object({
	id: z.string().min(1),
	index: z.number().int().positive(),
	kind: LessonKind,
	title: z.string().min(1),
	situation: z.string().min(1),
	level: CefrLevel,
	lineCount: z.number().int().nonnegative(),
	constructionIds: z.array(z.string().min(1)),
	reviewStatus: ReviewStatus
});
export type CourseManifestEntry = z.infer<typeof CourseManifestEntry>;

/** 14 lessons per language: 12 regular plus synthesis at 7 and 14 (issue #1). */
export const CourseManifest = z
	.object({
		language: LanguageCode,
		contentVersion: z.string().min(1),
		lessons: z.array(CourseManifestEntry).min(1),
		constructions: z.array(Construction).default([])
	})
	.superRefine((course, ctx) => {
		const indices = course.lessons.map((l) => l.index).sort((a, b) => a - b);
		const expected = Array.from({ length: indices.length }, (_, i) => i + 1);
		if (indices.join() !== expected.join()) {
			ctx.addIssue({
				code: 'custom',
				message: `lesson indices must be contiguous from 1, got [${indices.join(', ')}]`,
				path: ['lessons']
			});
		}
		for (const lesson of course.lessons) {
			const shouldBeSynthesis = lesson.index % 7 === 0;
			if (shouldBeSynthesis !== (lesson.kind === 'synthesis')) {
				ctx.addIssue({
					code: 'custom',
					message: `lesson ${lesson.index} should${shouldBeSynthesis ? '' : ' not'} be a synthesis lesson`,
					path: ['lessons']
				});
			}
		}
	});
export type CourseManifest = z.infer<typeof CourseManifest>;
