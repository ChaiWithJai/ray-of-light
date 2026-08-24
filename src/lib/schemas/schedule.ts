/**
 * The two-wave scheduler.
 *
 * Assimil's structure is a *passive wave* (new material from lesson 1) and an
 * *active wave* that begins much later and walks the same lessons again, this
 * time producing the target language from English. The scheduler decides what
 * appears on Today; it never decides how anything is presented.
 *
 * ## Why the POC offsets differ from the book
 *
 * In the full course the active wave starts around day 50 and recalls the lesson
 * from ~49 days earlier. This POC ships 14 lessons, so a day-50 start would make
 * AC 5 ("at least one previously encountered construction is retrieved from
 * English after a delay") untestable — the learner would run out of content
 * before the active wave ever began.
 *
 * So the offsets are configuration, not constants. `POC_WAVE_CONFIG` starts the
 * active wave at lesson 4 with a 3-lesson lag; `FULL_COURSE_WAVE_CONFIG` is the
 * real thing. The delay is preserved in structure and shortened in magnitude.
 */
import { z } from 'zod';
import { LanguageCode } from './content.js';
import type { EvidenceEvent } from './learner.js';

export const WaveConfig = z.object({
	/** Lesson index at which the active wave begins. */
	activeWaveStartsAtLesson: z.number().int().positive(),
	/** How many lessons behind the passive wave the active wave runs. */
	activeWaveLagLessons: z.number().int().positive(),
	/** Every Nth lesson is a synthesis lesson. */
	synthesisEvery: z.number().int().positive(),
	/** Spacing ladder, in days, for lines the learner found difficult. */
	resurfaceLadderDays: z.array(z.number().int().positive()).min(1)
});
export type WaveConfig = z.infer<typeof WaveConfig>;

/** 14-lesson POC: the active wave has to start early enough to be reachable. */
export const POC_WAVE_CONFIG: WaveConfig = {
	activeWaveStartsAtLesson: 4,
	activeWaveLagLessons: 3,
	synthesisEvery: 7,
	resurfaceLadderDays: [1, 3, 7]
};

/** The real course shape, for when there are 100+ lessons. */
export const FULL_COURSE_WAVE_CONFIG: WaveConfig = {
	activeWaveStartsAtLesson: 50,
	activeWaveLagLessons: 49,
	synthesisEvery: 7,
	resurfaceLadderDays: [1, 3, 7]
};

/* -------------------------------------------------------------------------- */
/* Day arithmetic                                                             */
/* -------------------------------------------------------------------------- */

/** Local calendar day as YYYY-MM-DD. Local, deliberately — not UTC. */
export function toDayKey(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
}

export function parseDayKey(day: string): Date {
	const [y, m, d] = day.split('-').map(Number);
	return new Date(y, m - 1, d);
}

/** Whole days between two day keys. Immune to DST because it re-reads local noon. */
export function daysBetween(from: string, to: string): number {
	const a = parseDayKey(from);
	const b = parseDayKey(to);
	a.setHours(12, 0, 0, 0);
	b.setHours(12, 0, 0, 0);
	return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/* -------------------------------------------------------------------------- */
/* Today                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * What Today offers. At most one new lesson and one recall lesson — the whole
 * point of the surface is that there is nothing to choose (1c).
 */
export type TodayPlan = {
	language: LanguageCode;
	/** 1-based day since the plan started. */
	dayNumber: number;
	/** The next unworked lesson in the passive wave, if any remain. */
	newLessonIndex: number | null;
	/** The lesson being re-produced from English, if the active wave has begun. */
	recallLessonIndex: number | null;
	/** True when the new lesson is a synthesis lesson (nothing new, only reassembly). */
	isSynthesisDay: boolean;
	/** True when every lesson has been worked through. */
	courseComplete: boolean;
};

export type TodayInput = {
	language: LanguageCode;
	/** YYYY-MM-DD the plan started. */
	startedOn: string;
	/** YYYY-MM-DD today. */
	today: string;
	/** Total lessons available in this course. */
	lessonCount: number;
	/** How many lessons have been fully worked through, in order. */
	completedCount: number;
	/**
	 * Placement from the entry assessment (1a). Lessons before it count as met
	 * for scheduling only — placement is a starting point, not learner evidence,
	 * so those lessons never enter the recall wave or grant construction state.
	 */
	entryLessonIndex?: number;
	/**
	 * YYYY-MM-DD keys of the learner's daily assignments. When this history is
	 * longer than the calendar span since `startedOn`, the history wins: a
	 * learner with three assignment days behind them is on at least day 3, no
	 * matter what `startedOn` claims. This keeps a synthetic or restored
	 * profile (where assignment keys were shifted but `startedOn` was not)
	 * from ever showing "Day 1" next to days of recorded work.
	 */
	assignmentDays?: readonly string[];
	config?: WaveConfig;
};

export function planToday({
	language,
	startedOn,
	today,
	lessonCount,
	completedCount,
	entryLessonIndex = 1,
	assignmentDays = [],
	config = POC_WAVE_CONFIG
}: TodayInput): TodayPlan {
	// Day number is calendar-derived, but never less than the number of
	// distinct assignment days actually on record (ignoring any dated in the
	// future) — two views of the same history that must not contradict.
	const assignmentDayCount = new Set(
		assignmentDays.filter((day) => daysBetween(day, today) >= 0)
	).size;
	const dayNumber = Math.max(1, daysBetween(startedOn, today) + 1, assignmentDayCount);

	// The passive wave is driven by lessons completed, not by days elapsed —
	// missing a day must not skip content (D10: no punishment for missed days).
	// Placement shifts where the wave starts; it does not mark anything done.
	const entryOffset = Math.min(Math.max(0, entryLessonIndex - 1), lessonCount);
	const nextIndex = entryOffset + completedCount + 1;
	const courseComplete = entryOffset + completedCount >= lessonCount;
	const newLessonIndex = courseComplete ? null : nextIndex;

	// The active wave trails the passive wave by a fixed number of lessons. It
	// can only recall lessons the learner actually worked, so it never reaches
	// back past the placement point — placement met them for scheduling, but the
	// learner has no evidence to retrieve.
	const recallCandidate = nextIndex - config.activeWaveLagLessons;
	const activeWaveOpen = nextIndex >= config.activeWaveStartsAtLesson;
	const recallLessonIndex =
		activeWaveOpen && recallCandidate >= entryOffset + 1 ? recallCandidate : null;

	return {
		language,
		dayNumber,
		newLessonIndex,
		recallLessonIndex,
		isSynthesisDay: newLessonIndex !== null && newLessonIndex % config.synthesisEvery === 0,
		courseComplete
	};
}

/* -------------------------------------------------------------------------- */
/* Resurfacing                                                                 */
/* -------------------------------------------------------------------------- */

/** A line the learner stumbled on, queued to come back at 1 · 3 · 7 days. */
export const ResurfaceEntry = z.object({
	lineId: z.string().min(1),
	lessonId: z.string().min(1),
	language: LanguageCode,
	/** Index into the ladder; advances on each successful resurface. */
	step: z.number().int().nonnegative().default(0),
	/** YYYY-MM-DD it is next due. */
	dueOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});
export type ResurfaceEntry = z.infer<typeof ResurfaceEntry>;

export function scheduleResurface(
	entry: Pick<ResurfaceEntry, 'lineId' | 'lessonId' | 'language'>,
	from: string,
	step = 0,
	config: WaveConfig = POC_WAVE_CONFIG
): ResurfaceEntry {
	const ladder = config.resurfaceLadderDays;
	const offset = ladder[Math.min(step, ladder.length - 1)];
	const due = parseDayKey(from);
	due.setDate(due.getDate() + offset);
	return { ...entry, step, dueOn: toDayKey(due) };
}

export function dueResurfaces<T extends { dueOn: string }>(
	entries: readonly T[],
	today: string
): T[] {
	return entries.filter((e) => daysBetween(e.dueOn, today) >= 0);
}

/**
 * A construction the learner missed, derived entirely from the append-only
 * evidence log — there is no persisted queue to drift out of sync. A miss is a
 * wrong attempt or a hinted one; each later unhinted `recall-correct` climbs
 * the ladder, and climbing past its top clears the item.
 */
export type ResurfaceQueueItem = {
	constructionId: string;
	language: LanguageCode;
	/** The lesson the miss happened in — where the retrieval links back to. */
	lessonId: string;
	/** Ladder step the next retrieval sits on. */
	step: number;
	/** YYYY-MM-DD the retrieval is next due. */
	dueOn: string;
};

function isMiss(event: EvidenceEvent): boolean {
	return event.kind === 'attempt-incorrect' || event.hinted;
}

export function deriveResurfaceQueue(
	events: readonly EvidenceEvent[],
	config: WaveConfig = POC_WAVE_CONFIG
): ResurfaceQueueItem[] {
	const byConstruction = new Map<string, EvidenceEvent[]>();
	for (const event of events) {
		const key = `${event.language}:${event.constructionId}`;
		const bucket = byConstruction.get(key);
		if (bucket) bucket.push(event);
		else byConstruction.set(key, [event]);
	}

	const ladder = config.resurfaceLadderDays;
	const queue: ResurfaceQueueItem[] = [];
	for (const group of byConstruction.values()) {
		const misses = group.filter(isMiss);
		if (misses.length === 0) continue;
		const lastMiss = misses.reduce((a, b) => (b.at >= a.at ? b : a));

		// Distinct-day retrievals after the last miss climb the ladder, mirroring
		// how `stabilized` counts days rather than raw attempts.
		const retrievals = group.filter(
			(event) => !event.hinted && event.kind === 'recall-correct' && event.at > lastMiss.at
		);
		const retrievalDays = new Set(retrievals.map((event) => event.day));
		if (retrievalDays.size >= ladder.length) continue;

		const anchor = retrievals.reduce((a, b) => (b.at >= a.at ? b : a), lastMiss);
		const step = retrievalDays.size;
		const due = parseDayKey(anchor.day);
		due.setDate(due.getDate() + ladder[step]);
		queue.push({
			constructionId: lastMiss.constructionId,
			language: lastMiss.language,
			lessonId: lastMiss.lessonId,
			step,
			dueOn: toDayKey(due)
		});
	}

	return queue.sort(
		(a, b) => a.dueOn.localeCompare(b.dueOn) || a.constructionId.localeCompare(b.constructionId)
	);
}

/**
 * Closure self-ratings tune the ladder (1q). A learner who reports weak
 * production gets a shorter interval; one who found it easy gets a longer one.
 * This is what makes honest self-rating instrumentally rational.
 */
export function adjustStepForClosure(step: number, effort: 'easy' | 'just-right' | 'too-hard') {
	if (effort === 'too-hard') return Math.max(0, step - 1);
	if (effort === 'easy') return step + 1;
	return step;
}
