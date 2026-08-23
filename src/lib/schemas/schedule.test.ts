import { describe, expect, it } from 'vitest';
import {
	adjustStepForClosure,
	daysBetween,
	dueResurfaces,
	planToday,
	POC_WAVE_CONFIG,
	scheduleResurface,
	toDayKey
} from './schedule.js';

const base = {
	language: 'fr' as const,
	startedOn: '2026-01-01',
	lessonCount: 14,
	config: POC_WAVE_CONFIG
};

describe('day arithmetic', () => {
	it('counts whole days between keys', () => {
		expect(daysBetween('2026-01-01', '2026-01-01')).toBe(0);
		expect(daysBetween('2026-01-01', '2026-01-08')).toBe(7);
		expect(daysBetween('2026-01-08', '2026-01-01')).toBe(-7);
	});

	it('crosses a month boundary correctly', () => {
		expect(daysBetween('2026-01-30', '2026-02-02')).toBe(3);
	});

	it('formats a date as a local day key', () => {
		expect(toDayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
	});
});

describe('planToday', () => {
	it('offers the first lesson on day one', () => {
		const plan = planToday({ ...base, today: '2026-01-01', completedCount: 0 });
		expect(plan.dayNumber).toBe(1);
		expect(plan.newLessonIndex).toBe(1);
		expect(plan.recallLessonIndex).toBeNull();
		expect(plan.courseComplete).toBe(false);
	});

	it('drives the passive wave from lessons completed, not days elapsed', () => {
		// Two weeks in, but nothing completed: still on lesson 1. Missing days
		// must not skip content.
		const plan = planToday({ ...base, today: '2026-01-15', completedCount: 0 });
		expect(plan.dayNumber).toBe(15);
		expect(plan.newLessonIndex).toBe(1);
	});

	it('opens the active wave at the configured lesson', () => {
		const before = planToday({ ...base, today: '2026-01-03', completedCount: 2 });
		expect(before.newLessonIndex).toBe(3);
		expect(before.recallLessonIndex).toBeNull();

		const after = planToday({ ...base, today: '2026-01-04', completedCount: 3 });
		expect(after.newLessonIndex).toBe(4);
		expect(after.recallLessonIndex).toBe(1);
	});

	it('trails the active wave behind the passive wave by the configured lag', () => {
		const plan = planToday({ ...base, today: '2026-01-10', completedCount: 8 });
		expect(plan.newLessonIndex).toBe(9);
		expect(plan.recallLessonIndex).toBe(9 - POC_WAVE_CONFIG.activeWaveLagLessons);
	});

	it('marks every 7th lesson as a synthesis day', () => {
		const seven = planToday({ ...base, today: '2026-01-08', completedCount: 6 });
		expect(seven.newLessonIndex).toBe(7);
		expect(seven.isSynthesisDay).toBe(true);

		const eight = planToday({ ...base, today: '2026-01-09', completedCount: 7 });
		expect(eight.isSynthesisDay).toBe(false);

		const fourteen = planToday({ ...base, today: '2026-01-16', completedCount: 13 });
		expect(fourteen.isSynthesisDay).toBe(true);
	});

	it('reports completion once every lesson is worked through', () => {
		const plan = planToday({ ...base, today: '2026-02-01', completedCount: 14 });
		expect(plan.courseComplete).toBe(true);
		expect(plan.newLessonIndex).toBeNull();
	});

	it('never offers more than one new and one recall lesson', () => {
		const plan = planToday({ ...base, today: '2026-01-10', completedCount: 8 });
		const offered = [plan.newLessonIndex, plan.recallLessonIndex].filter((x) => x !== null);
		expect(offered.length).toBeLessThanOrEqual(2);
	});

	it('clamps the day number to at least 1 if the clock went backwards', () => {
		const plan = planToday({ ...base, today: '2025-12-25', completedCount: 0 });
		expect(plan.dayNumber).toBe(1);
	});
});

describe('resurfacing', () => {
	const line = { lineId: 'fr-02-l3', lessonId: 'fr-02', language: 'fr' as const };

	it('walks the 1 / 3 / 7 day ladder', () => {
		expect(scheduleResurface(line, '2026-01-01', 0).dueOn).toBe('2026-01-02');
		expect(scheduleResurface(line, '2026-01-01', 1).dueOn).toBe('2026-01-04');
		expect(scheduleResurface(line, '2026-01-01', 2).dueOn).toBe('2026-01-08');
	});

	it('holds at the last rung once the ladder is exhausted', () => {
		expect(scheduleResurface(line, '2026-01-01', 9).dueOn).toBe('2026-01-08');
	});

	it('returns entries that are due today or overdue', () => {
		const entries = [
			scheduleResurface(line, '2026-01-01', 0), // due 01-02
			scheduleResurface(line, '2026-01-01', 2) // due 01-08
		];
		expect(dueResurfaces(entries, '2026-01-02')).toHaveLength(1);
		expect(dueResurfaces(entries, '2026-01-08')).toHaveLength(2);
		expect(dueResurfaces(entries, '2026-01-01')).toHaveLength(0);
	});

	it('tightens the interval when the learner reports it was too hard', () => {
		expect(adjustStepForClosure(2, 'too-hard')).toBe(1);
		expect(adjustStepForClosure(2, 'just-right')).toBe(2);
		expect(adjustStepForClosure(2, 'easy')).toBe(3);
		expect(adjustStepForClosure(0, 'too-hard')).toBe(0);
	});
});
