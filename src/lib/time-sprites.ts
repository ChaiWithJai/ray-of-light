/**
 * Time sprites — the parametric grammar for time-of-journey marks
 * (issue #46, phase S1; spec docs/design/sprite-world.md §2, §4).
 *
 * Two families, both deterministic from what they depict — never random,
 * never stored:
 *
 *  - the **day sprite** (Today's day counter): a sun on the course's arc.
 *    Its position and form derive from real progress through the lessons
 *    (`planToday`'s worked-lesson arithmetic), not from the raw day count —
 *    a learner who missed days is exactly where their work left them, which
 *    is the D10 no-punishment guarantee drawn instead of narrated.
 *  - the **duration sprite** (plan screen): each daily-minutes choice is a
 *    candle whose height and wax notches are the minutes themselves, so the
 *    15/25/40 decision is legible as a shape before it is read as a number.
 *
 * Honesty rules mirror `sprites.ts`: same inputs → same sprite, bucket
 * boundaries come from the real lesson count, and there is no state here the
 * schedule cannot vouch for (no streak forms, no regression forms).
 */

/** The day sprite's form buckets, in journey order. */
export const JOURNEY_PHASES = ['sprout', 'stride', 'lantern', 'rest'] as const;
export type JourneyPhase = (typeof JOURNEY_PHASES)[number];

export type JourneyInput = {
	/** 1-based day since the plan started (`planToday().dayNumber`). */
	dayNumber: number;
	/**
	 * Lessons behind the learner, placement included — i.e.
	 * `newLessonIndex - 1`, or the full lesson count once the course is done.
	 */
	workedLessons: number;
	/** Total lessons in the course. */
	lessonCount: number;
	/** `planToday().courseComplete`. */
	courseComplete: boolean;
};

export type DaySpriteForm = {
	dayNumber: number;
	phase: JourneyPhase;
	/** Progress through the lessons, 0–1, clamped. */
	fraction: number;
	/** Sun centre on the arc (48×40 viewBox), rounded for stable rendering. */
	sunX: number;
	sunY: number;
};

/** Real progress through the lessons, clamped to [0, 1]. */
export function journeyFraction(workedLessons: number, lessonCount: number): number {
	if (lessonCount <= 0) return 0;
	return Math.min(1, Math.max(0, workedLessons / lessonCount));
}

/**
 * Form bucket from real progress — early sprout, mid stride, late lantern —
 * with `rest` reserved for the schedule's own `courseComplete`. Boundaries sit
 * at thirds of the actual lesson count; nothing here reads the raw day count.
 */
export function journeyPhase(input: JourneyInput): JourneyPhase {
	if (input.courseComplete) return 'rest';
	const fraction = journeyFraction(input.workedLessons, input.lessonCount);
	if (fraction < 1 / 3) return 'sprout';
	if (fraction < 2 / 3) return 'stride';
	return 'lantern';
}

/* Arc geometry shared with `day-sprite.svelte` (48×40 viewBox). */
export const DAY_ARC = { cx: 24, groundY: 31, radius: 16 } as const;

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Everything the day sprite renders, derived once and pinned by tests. */
export function daySpriteForm(input: JourneyInput): DaySpriteForm {
	const fraction = input.courseComplete
		? 1
		: journeyFraction(input.workedLessons, input.lessonCount);
	// The sun rises at the left horizon (fraction 0) and sets at the right
	// (fraction 1): angle sweeps π → 0 across the journey. A small pad keeps
	// the disc visibly *on* the arc at the extremes instead of buried in the
	// ground line — purely presentational, monotone in the fraction.
	const PAD = 0.08;
	const angle = Math.PI * (1 - (PAD + fraction * (1 - 2 * PAD)));
	return {
		dayNumber: input.dayNumber,
		phase: journeyPhase(input),
		fraction,
		sunX: round1(DAY_ARC.cx + DAY_ARC.radius * Math.cos(angle)),
		sunY: round1(DAY_ARC.groundY - DAY_ARC.radius * Math.sin(angle))
	};
}

/* -------------------------------------------------------------------------- */
/* Plan-duration sprite                                                        */
/* -------------------------------------------------------------------------- */

export type DurationShape = {
	minutes: number;
	/** One wax notch per five minutes — the commitment, countable. */
	notches: number;
	/** Candle body height in viewBox units (48×48, base at y = 44). */
	height: number;
};

/**
 * Minutes → candle. Pure arithmetic over the offered plan durations; anything
 * the plan screen does not offer in 5-minute steps is a programming error, not
 * a renderable state.
 */
export function durationShape(minutes: number): DurationShape {
	if (!Number.isInteger(minutes) || minutes <= 0 || minutes % 5 !== 0) {
		throw new Error(`durationShape: ${minutes} is not a plan duration (positive multiple of 5)`);
	}
	const notches = minutes / 5;
	return { minutes, notches, height: 8 + notches * 3 };
}
