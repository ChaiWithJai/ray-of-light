/**
 * Content conformance tests.
 *
 * These check the corpus against the content requirements in issue #1 rather
 * than against itself, so a lesson that drifts out of spec fails here instead of
 * quietly shipping.
 */
import { describe, expect, it } from 'vitest';
import { COURSES, constructionsMetBy, courseManifest, getLessonByIndex, validateCourse } from './index.js';
import type { LanguageCode } from '$lib/schemas/content.js';

const LANGUAGES: LanguageCode[] = ['fr', 'ta'];

describe.each(LANGUAGES)('course: %s', (language) => {
	const course = COURSES[language];

	it('has 14 lessons', () => {
		expect(course.lessons).toHaveLength(14);
	});

	it('numbers lessons contiguously from 1', () => {
		expect(course.lessons.map((l) => l.index)).toEqual(
			Array.from({ length: 14 }, (_, i) => i + 1)
		);
	});

	it('has synthesis lessons at 7 and 14 and nowhere else', () => {
		const synthesis = course.lessons.filter((l) => l.kind === 'synthesis').map((l) => l.index);
		expect(synthesis).toEqual([7, 14]);
	});

	it('has 12 regular lessons', () => {
		expect(course.lessons.filter((l) => l.kind === 'regular')).toHaveLength(12);
	});

	describe('regular lessons', () => {
		const regular = course.lessons.filter((l) => l.kind === 'regular');

		it('each have 8-12 dialogue lines', () => {
			for (const lesson of regular) {
				expect(
					lesson.lines.length,
					`${lesson.id} has ${lesson.lines.length} lines`
				).toBeGreaterThanOrEqual(8);
				expect(lesson.lines.length).toBeLessThanOrEqual(12);
			}
		});

		it('each introduce at least 3 reusable constructions', () => {
			for (const lesson of regular) {
				expect(
					lesson.constructions.length,
					`${lesson.id} introduces ${lesson.constructions.length}`
				).toBeGreaterThanOrEqual(3);
			}
		});

		it('each have at least one comprehension, recall and transfer exercise', () => {
			for (const lesson of regular) {
				const kinds = new Set(lesson.exercises.map((e) => e.kind));
				expect(kinds.has('comprehension'), `${lesson.id} comprehension`).toBe(true);
				expect(kinds.has('recall'), `${lesson.id} recall`).toBe(true);
				expect(kinds.has('transfer'), `${lesson.id} transfer`).toBe(true);
			}
		});
	});

	it('ends every lesson with a transfer prompt (AC 7)', () => {
		for (const lesson of course.lessons) {
			const transfers = lesson.exercises.filter((e) => e.kind === 'transfer');
			expect(transfers.length, `${lesson.id}`).toBeGreaterThanOrEqual(1);
		}
	});

	it('authors explicit machine-checkable criteria for every transfer prompt', () => {
		for (const lesson of course.lessons) {
			for (const exercise of lesson.exercises) {
				if (exercise.kind !== 'transfer') continue;
				const expected = new Set([exercise.useConstruction, ...exercise.constructions]);
				const authored = exercise.criteria.constructions.map((criterion) => criterion.constructionId);
				expect(new Set(authored), exercise.id).toEqual(expected);
				for (const criterion of exercise.criteria.constructions) {
					expect(criterion.orderedGroups.length, exercise.id).toBeGreaterThan(0);
					for (const alternatives of criterion.orderedGroups) {
						expect(alternatives.length, exercise.id).toBeGreaterThan(0);
					}
				}
			}
		}
	});

	it('resolves every referenced construction somewhere in the course', () => {
		for (const lesson of course.lessons) {
			const referenced = [
				...lesson.lines.flatMap((l) => l.constructions),
				...lesson.exercises.flatMap((e) =>
					e.kind === 'transfer' ? [e.useConstruction, ...e.constructions] : e.constructions
				)
			];
			for (const id of referenced) {
				expect(course.constructions.has(id), `${lesson.id} → ${id}`).toBe(true);
			}
		}
	});

	it('records provenance, licensing and review status on every line (AC 11)', () => {
		for (const lesson of course.lessons) {
			for (const line of lesson.lines) {
				expect(line.source).toBeTruthy();
				expect(line.license).toBeTruthy();
				expect(line.reviewStatus).toBeTruthy();
			}
		}
	});

	it('gives every canonical line sentence-level audio addressing', () => {
		for (const lesson of course.lessons) {
			for (const line of lesson.lines) {
				expect(line.audio.normalUrl, line.id).toBeTruthy();
				expect(line.audio.startMs, line.id).toBeTypeOf('number');
				expect(line.audio.endMs!).toBeGreaterThan(line.audio.startMs!);
			}
		}
	});

	it('gives every line a natural English translation', () => {
		for (const lesson of course.lessons) {
			for (const line of lesson.lines) {
				expect(line.naturalEnglish, line.id).toBeTruthy();
			}
		}
	});

	it('uses unique line ids', () => {
		const ids = course.lessons.flatMap((l) => l.lines.map((line) => line.id));
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('reuses earlier constructions in later lessons', () => {
		// The course has to build on itself; if no later lesson ever referenced an
		// earlier construction, the "recombination" claim would be empty.
		const introducedEarly = new Set(
			course.lessons.filter((l) => l.index <= 6).flatMap((l) => l.constructions.map((c) => c.id))
		);
		const referencedLate = new Set(
			course.lessons
				.filter((l) => l.index >= 7)
				.flatMap((l) => l.lines.flatMap((line) => line.constructions))
		);
		const reused = [...referencedLate].filter((id) => introducedEarly.has(id));
		expect(reused.length).toBeGreaterThan(0);
	});
});

describe('Tamil-specific requirements (AC 9)', () => {
	it('distinguishes script, transliteration, literal and natural English on every line', () => {
		for (const lesson of COURSES.ta.lessons) {
			for (const line of lesson.lines) {
				expect(line.targetScript, line.id).toBeTruthy();
				expect(line.transliteration, `${line.id} transliteration`).toBeTruthy();
				expect(line.literalEnglish, `${line.id} literal`).toBeTruthy();
				expect(line.naturalEnglish, `${line.id} natural`).toBeTruthy();
			}
		}
	});

	it('uses the literal layer to reveal structure, not to restate the translation', () => {
		// Not asserted per line: for short noun phrases the two genuinely coincide
		// ("எந்த பிளாட்பாரம்?" glosses as "Which platform?" either way), and forcing
		// a difference there would mean inventing a fake gloss. What matters is
		// that the layer is doing real work across the corpus.
		const lines = COURSES.ta.lessons.flatMap((l) => l.lines);
		const revealing = lines.filter((l) => l.literalEnglish !== l.naturalEnglish);
		const ratio = revealing.length / lines.length;
		expect(ratio, `${revealing.length}/${lines.length} lines gloss differently`).toBeGreaterThan(
			0.85
		);
	});

	it('marks the register and dialect explicitly', () => {
		for (const lesson of COURSES.ta.lessons) {
			for (const line of lesson.lines) {
				expect(line.register).toBe('spoken');
				expect(line.dialect).toBe('chennai_general');
			}
		}
	});
});

describe('honest provenance', () => {
	it('reports all authored content as draft, since no native reviewer has seen it', () => {
		// If this ever fails it should be because review actually happened —
		// see docs/ISSUE-1-LIMITATIONS.md L2.
		for (const language of LANGUAGES) {
			for (const lesson of COURSES[language].lessons) {
				expect(lesson.provenance.reviewStatus).toBe('draft');
				expect(lesson.provenance.source).toBe('original');
				expect(lesson.provenance.license).toBe('owned');
			}
		}
	});

	it('has a measured recording behind every line not awaiting re-recording (draft TTS — see L1)', () => {
		// Draft synthesized audio exists with real per-line offsets measured at
		// generation time. Lessons enriched by the issue #8/#9 salvage ports carry
		// lines recorded after the fact: until that lesson's audio is regenerated,
		// those lines are explicitly `pending` (surfaced to the UI by
		// `audioPending`), and the lesson's measured offsets are stale. This test
		// keeps the honesty guarantee for everything that claims to be measured:
		// a non-pending line must have real, sane, non-overlapping offsets.
		for (const language of LANGUAGES) {
			for (const lesson of COURSES[language].lessons) {
				const anyPending = lesson.lines.some((line) => line.audio.pending);
				if (anyPending) continue; // whole lesson awaits audio regeneration
				let prevEnd = -1;
				for (const line of lesson.lines) {
					expect(line.audio.pending, line.id).toBe(false);
					expect(line.audio.endMs!, line.id).toBeGreaterThan(line.audio.startMs!);
					expect(line.audio.startMs!, `${line.id} overlaps previous line`).toBeGreaterThan(prevEnd);
					prevEnd = line.audio.endMs!;
				}
			}
		}
	});
});

describe('lookups', () => {
	it('accumulates constructions as lessons are met', () => {
		const afterOne = constructionsMetBy('fr', 1).length;
		const afterSix = constructionsMetBy('fr', 6).length;
		const afterAll = constructionsMetBy('fr', 14).length;
		expect(afterOne).toBeGreaterThan(0);
		expect(afterSix).toBeGreaterThan(afterOne);
		expect(afterAll).toBeGreaterThanOrEqual(afterSix);
	});

	it('builds a manifest that matches the course', () => {
		const manifest = courseManifest('fr');
		expect(manifest.lessons).toHaveLength(14);
		expect(manifest.lessons[0].lineCount).toBe(COURSES.fr.lessons[0].lines.length);
	});

	it('finds a lesson by index', () => {
		expect(getLessonByIndex('ta', 3)?.id).toBe('ta-03');
		expect(getLessonByIndex('ta', 99)).toBeUndefined();
	});
});

describe('construction identity invariants (issue #12)', () => {
	// validateCourse is the gate every course passes through at import; these
	// exercise its two rejection paths on mutated copies of real content.
	const mutated = () => structuredClone(COURSES.fr.lessons);

	it('rejects a re-declaration that disagrees about meaning', () => {
		const lessons = mutated();
		const donor = lessons[0].constructions[0];
		lessons[6].constructions.push({ ...donor, label: donor.label + ' (drifted)' });
		expect(() => validateCourse('fr', lessons)).toThrowError(
			/conflicting construction metadata/
		);
	});

	it('rejects a re-declaration that disagrees about origin', () => {
		const lessons = mutated();
		const donor = lessons[0].constructions[0];
		lessons[6].constructions.push({ ...donor, introducedIn: lessons[6].id });
		expect(() => validateCourse('fr', lessons)).toThrowError(
			/conflicting construction metadata/
		);
	});

	it('accepts a verbatim re-declaration', () => {
		const lessons = mutated();
		lessons[6].constructions.push({ ...lessons[0].constructions[0] });
		expect(() => validateCourse('fr', lessons)).not.toThrow();
	});

	it('rejects a declared construction no line or exercise references', () => {
		const lessons = mutated();
		lessons[0].constructions.push({
			id: 'fr.phantom-construction',
			language: 'fr',
			label: 'phantom + noun',
			gloss: 'declared but never taught',
			introducedIn: lessons[0].id
		});
		expect(() => validateCourse('fr', lessons)).toThrowError(
			/declares constructions no line or exercise references/
		);
	});

	it('rejects a construction whose introducing lesson never references it', () => {
		const lessons = mutated();
		// Find a construction that later lessons reuse, then strip it from its
		// introducing lesson only: it stays referenced course-wide (so the
		// dangling/phantom checks stay quiet) but is no longer taught where its
		// introducedIn claims.
		const intro = lessons[0];
		const reused = intro.constructions.find(
			(c) =>
				// Not pinned by an intro transfer exercise, whose useConstruction we
				// cannot strip without deleting the exercise.
				intro.exercises.every((e) => e.kind !== 'transfer' || e.useConstruction !== c.id) &&
				lessons.some(
				(l) =>
					l.id !== intro.id &&
					(l.lines.some((line) => line.constructions.includes(c.id)) ||
						l.exercises.some(
							(e) =>
								e.constructions.includes(c.id) ||
								(e.kind === 'transfer' && e.useConstruction === c.id)
						))
				)
		);
		expect(reused).toBeDefined();
		const id = reused!.id;
		for (const line of intro.lines) {
			line.constructions = line.constructions.filter((c) => c !== id);
		}
		for (const exercise of intro.exercises) {
			exercise.constructions = exercise.constructions.filter((c) => c !== id);
		}
		expect(() => validateCourse('fr', lessons)).toThrowError(
			new RegExp(`${id}: introducedIn "${intro.id}", but no line or exercise in that lesson`)
		);
	});

	it('rejects a construction whose introducedIn names no lesson in the course', () => {
		const lessons = mutated();
		lessons[0].constructions.push({
			id: 'fr.orphaned-construction',
			language: 'fr',
			label: 'orphan + noun',
			gloss: 'introduced in a lesson that does not exist',
			introducedIn: 'fr.no-such-lesson'
		});
		// Reference it from a real line so only the introducedIn claim is wrong.
		lessons[0].lines[0].constructions.push('fr.orphaned-construction');
		expect(() => validateCourse('fr', lessons)).toThrowError(
			/fr\.orphaned-construction: introducedIn "fr\.no-such-lesson" is not a lesson in this course/
		);
	});
});
