import { describe, expect, it } from 'vitest';
import { EvidenceEvent } from './learner.js';
import {
	adjustStepForClosure,
	daysBetween,
	deriveResurfaceQueue,
	dueResurfaces,
	parseDayKey,
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

	it('never shows a day number smaller than the assignment history (#45)', () => {
		// A synthetic or restored profile can carry shifted assignment keys while
		// startedOn still says "today". The history wins: three recorded
		// assignment days can never sit next to "Day 1".
		const plan = planToday({
			...base,
			startedOn: '2026-01-04',
			today: '2026-01-04',
			completedCount: 3,
			assignmentDays: ['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04']
		});
		expect(plan.dayNumber).toBe(4);
	});

	it('counts assignment days distinctly and ignores days in the future', () => {
		const plan = planToday({
			...base,
			startedOn: '2026-01-02',
			today: '2026-01-02',
			completedCount: 2,
			assignmentDays: ['2026-01-01', '2026-01-01', '2026-01-02', '2026-01-09']
		});
		expect(plan.dayNumber).toBe(2);
	});

	it('keeps the calendar-derived day number when it is the larger view', () => {
		const plan = planToday({
			...base,
			today: '2026-01-15',
			completedCount: 2,
			assignmentDays: ['2026-01-01', '2026-01-02']
		});
		expect(plan.dayNumber).toBe(15);
	});
});

describe('planToday with placement', () => {
	it('starts the passive wave at the placed lesson', () => {
		const plan = planToday({
			...base,
			today: '2026-01-01',
			completedCount: 0,
			entryLessonIndex: 3
		});
		expect(plan.newLessonIndex).toBe(3);
		expect(plan.courseComplete).toBe(false);
	});

	it('advances from the placed lesson as work completes', () => {
		const plan = planToday({
			...base,
			today: '2026-01-03',
			completedCount: 2,
			entryLessonIndex: 3
		});
		expect(plan.newLessonIndex).toBe(5);
	});

	it('never reaches the active wave back past the placement point', () => {
		// Placed at 3, one completion: next is 4, so the lag would point at
		// lesson 1 — but the learner never worked lessons 1–2, and placement is
		// not evidence, so there is nothing to recall yet.
		const early = planToday({
			...base,
			today: '2026-01-02',
			completedCount: 1,
			entryLessonIndex: 3
		});
		expect(early.newLessonIndex).toBe(4);
		expect(early.recallLessonIndex).toBeNull();

		// Three completions in: next is 6, the lag points at 3 — the placed
		// lesson itself, which the learner did work.
		const later = planToday({
			...base,
			today: '2026-01-04',
			completedCount: 3,
			entryLessonIndex: 3
		});
		expect(later.recallLessonIndex).toBe(3);
	});

	it('counts placed-over lessons toward completion', () => {
		const plan = planToday({
			...base,
			today: '2026-01-03',
			completedCount: 2,
			entryLessonIndex: 13
		});
		expect(plan.courseComplete).toBe(true);
		expect(plan.newLessonIndex).toBeNull();
	});

	it('treats placement past the course end as complete rather than out of range', () => {
		const plan = planToday({
			...base,
			today: '2026-01-01',
			completedCount: 0,
			entryLessonIndex: 99
		});
		expect(plan.courseComplete).toBe(true);
		expect(plan.newLessonIndex).toBeNull();
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

describe('deriveResurfaceQueue', () => {
	let seq = 0;
	const at = (day: string) => parseDayKey(day).getTime();
	const ev = (partial: Partial<EvidenceEvent> & Pick<EvidenceEvent, 'kind' | 'day'>): EvidenceEvent =>
		EvidenceEvent.parse({
			id: `e${seq++}`,
			constructionId: 'fr.je-voudrais-inf',
			language: 'fr',
			lessonId: 'fr-02',
			at: at(partial.day) + seq,
			hinted: false,
			...partial
		});

	it('derives nothing from a log with no misses', () => {
		expect(
			deriveResurfaceQueue([
				ev({ kind: 'parallel-read', day: '2026-01-01' }),
				ev({ kind: 'recall-correct', day: '2026-01-02' })
			])
		).toEqual([]);
	});

	it('queues a wrong attempt on the first rung of the ladder', () => {
		const queue = deriveResurfaceQueue([ev({ kind: 'attempt-incorrect', day: '2026-01-05' })]);
		expect(queue).toEqual([
			{
				constructionId: 'fr.je-voudrais-inf',
				language: 'fr',
				lessonId: 'fr-02',
				step: 0,
				dueOn: '2026-01-06'
			}
		]);
	});

	it('treats a hinted retrieval as a miss', () => {
		const queue = deriveResurfaceQueue([
			ev({ kind: 'recall-correct', day: '2026-01-05', hinted: true })
		]);
		expect(queue).toHaveLength(1);
		expect(queue[0].step).toBe(0);
	});

	it('climbs the ladder on each later unhinted retrieval day', () => {
		const queue = deriveResurfaceQueue([
			ev({ kind: 'attempt-incorrect', day: '2026-01-05' }),
			ev({ kind: 'recall-correct', day: '2026-01-06' })
		]);
		expect(queue).toEqual([
			expect.objectContaining({ step: 1, dueOn: '2026-01-09' })
		]);
	});

	it('counts retrieval days, not raw attempts', () => {
		const queue = deriveResurfaceQueue([
			ev({ kind: 'attempt-incorrect', day: '2026-01-05' }),
			ev({ kind: 'recall-correct', day: '2026-01-06' }),
			ev({ kind: 'recall-correct', day: '2026-01-06' })
		]);
		expect(queue[0].step).toBe(1);
	});

	it('clears the item after the ladder is climbed on distinct days', () => {
		expect(
			deriveResurfaceQueue([
				ev({ kind: 'attempt-incorrect', day: '2026-01-05' }),
				ev({ kind: 'recall-correct', day: '2026-01-06' }),
				ev({ kind: 'recall-correct', day: '2026-01-09' }),
				ev({ kind: 'recall-correct', day: '2026-01-16' })
			])
		).toEqual([]);
	});

	it('ignores retrievals that happened before the last miss', () => {
		const queue = deriveResurfaceQueue([
			ev({ kind: 'recall-correct', day: '2026-01-02' }),
			ev({ kind: 'attempt-incorrect', day: '2026-01-05' })
		]);
		expect(queue[0].step).toBe(0);
		expect(queue[0].dueOn).toBe('2026-01-06');
	});

	it('a new miss after retrievals restarts the ladder', () => {
		const queue = deriveResurfaceQueue([
			ev({ kind: 'attempt-incorrect', day: '2026-01-05' }),
			ev({ kind: 'recall-correct', day: '2026-01-06' }),
			ev({ kind: 'attempt-incorrect', day: '2026-01-09' })
		]);
		expect(queue[0].step).toBe(0);
		expect(queue[0].dueOn).toBe('2026-01-10');
	});

	it('keeps constructions and languages apart', () => {
		const queue = deriveResurfaceQueue([
			ev({ kind: 'attempt-incorrect', day: '2026-01-05' }),
			ev({
				kind: 'attempt-incorrect',
				day: '2026-01-05',
				constructionId: 'fr.pour-duree',
				lessonId: 'fr-03'
			}),
			ev({ kind: 'attempt-incorrect', day: '2026-01-05', language: 'ta', lessonId: 'ta-02' })
		]);
		expect(queue).toHaveLength(3);
		expect(new Set(queue.map((item) => `${item.language}:${item.constructionId}`)).size).toBe(3);
	});

	it('is consumable by dueResurfaces', () => {
		const queue = deriveResurfaceQueue([ev({ kind: 'attempt-incorrect', day: '2026-01-05' })]);
		expect(dueResurfaces(queue, '2026-01-05')).toHaveLength(0);
		expect(dueResurfaces(queue, '2026-01-06')).toHaveLength(1);
		expect(dueResurfaces(queue, '2026-02-01')).toHaveLength(1);
	});
});
