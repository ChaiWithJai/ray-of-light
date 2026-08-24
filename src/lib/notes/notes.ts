/**
 * The learner's notebook — data model and scoping (#48, Phase H0).
 *
 * A note is the learner's own voice: free text, written by them, never
 * generated. Scope is where it was written, not a category system — a note
 * can belong to a line, to a lesson, or to nothing but the notebook itself.
 */
import { z } from 'zod';

export const NoteScope = z.object({
	lessonId: z.string().min(1).optional(),
	lineId: z.string().min(1).optional()
});
export type NoteScope = z.infer<typeof NoteScope>;

export const NoteEntry = z
	.object({
		id: z.string().min(1),
		scope: NoteScope,
		body: z.string().min(1),
		createdAt: z.number(),
		updatedAt: z.number()
	})
	.refine((note) => !note.scope.lineId || note.scope.lessonId, {
		message: 'a line-scoped note must also name its lesson'
	});
export type NoteEntry = z.infer<typeof NoteEntry>;

/** Notebook order: most recently touched first. */
export function recentFirst(notes: readonly NoteEntry[]): NoteEntry[] {
	return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Notes anchored to one specific line. */
export function notesForLine(
	notes: readonly NoteEntry[],
	lessonId: string,
	lineId: string
): NoteEntry[] {
	return recentFirst(
		notes.filter((note) => note.scope.lessonId === lessonId && note.scope.lineId === lineId)
	);
}

/** Lesson-scoped notes that are not anchored to a line. */
export function notesForLesson(notes: readonly NoteEntry[], lessonId: string): NoteEntry[] {
	return recentFirst(
		notes.filter((note) => note.scope.lessonId === lessonId && !note.scope.lineId)
	);
}

/** Unscoped notes — the notebook proper. */
export function unscopedNotes(notes: readonly NoteEntry[]): NoteEntry[] {
	return recentFirst(notes.filter((note) => !note.scope.lessonId));
}

/**
 * The order a lesson step surfaces notes in (spec §2): this line's notes
 * first when a line is active, then this lesson's, recent-first within each.
 */
export function lessonStepOrder(
	notes: readonly NoteEntry[],
	lessonId: string,
	lineId?: string
): NoteEntry[] {
	const line = lineId ? notesForLine(notes, lessonId, lineId) : [];
	const lesson = recentFirst(
		notes.filter(
			(note) => note.scope.lessonId === lessonId && (!lineId || note.scope.lineId !== lineId)
		)
	);
	return [...line, ...lesson];
}
