/**
 * Time sprites (issue #46, S1): deterministic mapping, bucket boundaries, and
 * the no-invented-states guarantee — every form is a pure function of what the
 * schedule already derives.
 */
import { describe, expect, it } from 'vitest';
import {
	DAY_ARC,
	daySpriteForm,
	durationShape,
	JOURNEY_PHASES,
	journeyFraction,
	journeyPhase
} from './time-sprites.js';

const COURSE_LESSONS = 14;

describe('journeyPhase — form buckets from real progress, not raw day count', () => {
	const at = (workedLessons: number, courseComplete = false) =>
		journeyPhase({ dayNumber: 999, workedLessons, lessonCount: COURSE_LESSONS, courseComplete });

	it('buckets by thirds of the actual lesson count', () => {
		// 14 lessons: a third is 4.67, two thirds 9.33.
		expect(at(0)).toBe('sprout');
		expect(at(4)).toBe('sprout'); // 4/14 ≈ 0.29 < 1/3
		expect(at(5)).toBe('stride'); // 5/14 ≈ 0.36 ≥ 1/3
		expect(at(9)).toBe('stride'); // 9/14 ≈ 0.64 < 2/3
		expect(at(10)).toBe('lantern'); // 10/14 ≈ 0.71 ≥ 2/3
		expect(at(13)).toBe('lantern');
	});

	it('ignores the day number entirely — a missed day moves nothing (D10)', () => {
		for (const dayNumber of [1, 7, 60]) {
			expect(
				journeyPhase({ dayNumber, workedLessons: 2, lessonCount: COURSE_LESSONS, courseComplete: false })
			).toBe('sprout');
		}
	});

	it('reserves rest for the schedule’s own courseComplete', () => {
		expect(at(14, true)).toBe('rest');
		// Full progress without the schedule vouching completion stays lantern —
		// the sprite never claims something planToday does not.
		expect(at(14, false)).toBe('lantern');
	});

	it('emits only the four declared phases', () => {
		for (let worked = 0; worked <= COURSE_LESSONS; worked++) {
			expect(JOURNEY_PHASES).toContain(at(worked));
			expect(JOURNEY_PHASES).toContain(at(worked, true));
		}
	});
});

describe('daySpriteForm — deterministic geometry', () => {
	const input = { dayNumber: 6, workedLessons: 5, lessonCount: COURSE_LESSONS, courseComplete: false };

	it('same inputs → same sprite params', () => {
		expect(daySpriteForm(input)).toEqual(daySpriteForm({ ...input }));
	});

	it('walks the sun left → right with progress (pinned, padded arc)', () => {
		const dawn = daySpriteForm({ ...input, workedLessons: 0 });
		const mid = daySpriteForm({ ...input, workedLessons: 7 });
		const done = daySpriteForm({ ...input, workedLessons: 14, courseComplete: true });
		// Pinned values: the 0.08 pad keeps the disc visibly on the arc.
		expect(dawn.sunX).toBe(8.5);
		expect(dawn.sunY).toBe(27);
		expect(mid.sunX).toBe(DAY_ARC.cx);
		expect(mid.sunY).toBe(DAY_ARC.groundY - DAY_ARC.radius);
		expect(done.sunX).toBe(39.5);
		expect(done.sunY).toBe(27);
		expect(mid.sunX).toBeGreaterThan(dawn.sunX);
		expect(done.sunX).toBeGreaterThan(mid.sunX);
	});

	it('clamps degenerate inputs instead of inventing states', () => {
		expect(journeyFraction(-3, COURSE_LESSONS)).toBe(0);
		expect(journeyFraction(99, COURSE_LESSONS)).toBe(1);
		expect(journeyFraction(3, 0)).toBe(0);
	});
});

describe('durationShape — the choice as a shape', () => {
	it('maps each offered duration to a distinct, deterministic candle', () => {
		expect(durationShape(15)).toEqual({ minutes: 15, notches: 3, height: 17 });
		expect(durationShape(25)).toEqual({ minutes: 25, notches: 5, height: 23 });
		expect(durationShape(40)).toEqual({ minutes: 40, notches: 8, height: 32 });
	});

	it('is monotone: more minutes, taller candle, more notches', () => {
		const [s, m, l] = [durationShape(15), durationShape(25), durationShape(40)];
		expect(m.height).toBeGreaterThan(s.height);
		expect(l.height).toBeGreaterThan(m.height);
		expect(l.notches).toBeGreaterThan(m.notches);
	});

	it('refuses durations the plan never offers', () => {
		for (const bad of [0, -5, 12, 17.5, NaN]) {
			expect(() => durationShape(bad)).toThrow();
		}
	});
});
