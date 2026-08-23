import { expect, test, type Page } from '@playwright/test';

const STORAGE_KEY = 'ray-of-light.profile.v1';

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
}

async function seedDailyClosure(
	page: Page,
	mode: 'learn' | 'recall',
	initializeAssignment: boolean,
	lessonId = mode === 'learn' ? 'fr-04' : 'fr-01'
) {
	await page.evaluate(
		({ key, mode, initializeAssignment, lessonId }) => {
			const stored = JSON.parse(localStorage.getItem(key)!);
			const now = new Date();
			const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
			if (initializeAssignment) {
				stored.completedLessons.fr = ['fr-01', 'fr-02', 'fr-03'];
				stored.dailyAssignments.fr = {
					[day]: {
						day,
						newLessonId: 'fr-04',
						recallLessonId: 'fr-01',
						completedModes: []
					}
				};
			}
			const flow =
				mode === 'learn'
					? ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure']
					: ['recall', 'compare', 'closure'];
			stored.activeSession = {
				id: `daily-${mode}`,
				mode,
				language: 'fr',
				lessonId,
				flow,
				currentStep: 'closure',
				completedSteps: flow.slice(0, -1),
				recallDraft:
					mode === 'recall'
						? {
								lineId: 'fr-01-l3',
								text: "Je voudrais un café, s'il vous plaît.",
								hinted: false,
								revealed: false,
								canonicalAnswer: "Je voudrais un café, s'il vous plaît."
							}
						: undefined,
				assignmentDay: day,
				startedAt: Date.now(),
				updatedAt: Date.now()
			};
			localStorage.setItem(key, JSON.stringify(stored));
		},
		{ key: STORAGE_KEY, mode, initializeAssignment, lessonId }
	);
	await page.goto(`/${mode}/${lessonId}/closure`);
}

async function finishSeededClosure(page: Page) {
	await page.getByRole('button', { name: 'Done for today' }).click();
	await expect(page).toHaveURL(/\/today/);
}

test('Today and refresh resume the persisted current learn step', async ({ page }) => {
	await onboard(page);
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.getByRole('button', { name: /listened twice|Skip ahead/ }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/spread/);

	await page.reload();
	await expect(page.getByText('Bonjour, monsieur.')).toBeVisible();
	await page.goto('/today');
	await expect(page.getByText(/Resume · Au café/)).toBeVisible();
	await page.getByRole('button', { name: 'Resume lesson' }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/spread/);
});

test('browser Back explains completed-step limits and resumes without mutating progress', async ({ page }) => {
	await onboard(page);
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.getByRole('button', { name: /listened twice|Skip ahead/ }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/spread/);
	const before = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
	await page.goBack();
	await expect(page.getByText(/completed-step review is not available/)).toBeVisible();
	const whileReviewing = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
	expect(whileReviewing).toBe(before);
	await page.getByRole('button', { name: 'Resume current step' }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/spread/);
});

test('language switching cannot orphan an active session', async ({ page }) => {
	await onboard(page);
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.goto('/settings');
	await expect(page.getByText('Finish or resume the active session before switching languages.')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Tamil' })).toBeDisabled();
	await page.goto('/today');
	await expect(page.getByText(/Resume · Au café/)).toBeVisible();
	await page.getByRole('button', { name: 'Resume lesson' }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/preview/);
});

test('direct comparison and closure URLs are rejected without an authorized session', async ({ page }) => {
	await onboard(page);
	await page.goto('/recall/fr-01/compare');
	await expect(page).toHaveURL(/\/today/);

	await page.goto('/learn/fr-01/closure');
	await expect(page).toHaveURL(/\/today/);
	const completed = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).completedLessons.fr ?? [], STORAGE_KEY);
	expect(completed).toEqual([]);
});

test('forged persisted comparison and closure states are discarded', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const now = Date.now();
		stored.activeSession = {
			id: 'forged-compare', mode: 'recall', language: 'fr', lessonId: 'fr-01',
			flow: ['recall', 'compare', 'closure'], currentStep: 'compare', completedSteps: ['recall'],
			startedAt: now, updatedAt: now
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.goto('/recall/fr-01/compare');
	await expect(page).toHaveURL(/\/today/);

	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const now = Date.now();
		stored.activeSession = {
			id: 'forged-closure', mode: 'learn', language: 'fr', lessonId: 'fr-01',
			flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'],
			currentStep: 'closure', completedSteps: ['preview'], startedAt: now, updatedAt: now
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.goto('/learn/fr-01/closure');
	await expect(page).toHaveURL(/\/today/);
	const persisted = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(persisted.activeSession).toBeNull();
	expect(persisted.completedLessons.fr ?? []).toEqual([]);
});

test('refresh on legitimate recall comparison preserves attempt-before-reveal', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.completedLessons.fr = ['fr-01', 'fr-02', 'fr-03'];
		stored.dailyAssignments.fr = {};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.goto('/today');
	await page.getByRole('button', { name: 'Start recall' }).click();
	await page.getByLabel('Your production').fill("Je voudrais un café, s'il vous plaît.");
	await page.getByRole('button', { name: /Compare with the canonical line/ }).click();
	await expect(page).toHaveURL(/\/recall\/fr-01\/compare/);

	await page.reload();
	await expect(page.getByText("Je voudrais un café, s'il vous plaît.")).toBeVisible();
	await expect(page.getByRole('button', { name: 'Show the canonical line' })).toBeVisible();
	await page.getByRole('button', { name: 'Show the canonical line' }).click();
	await expect(page.getByText('That matches the canonical line.')).toBeVisible();
});

test('valid closure clears the session and records completion atomically', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const now = Date.now();
		const day = Object.keys(stored.dailyAssignments.fr)[0];
		stored.activeSession = {
			id: 'valid-completion',
			mode: 'learn',
			language: 'fr',
			lessonId: 'fr-01',
			flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'],
			currentStep: 'closure',
			completedSteps: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer'],
			origin: 'today',
			assignmentDay: day,
			startedAt: now,
			updatedAt: now
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.goto('/learn/fr-01/closure');
	await page.getByRole('button', { name: 'Done for today' }).click();
	await expect(page).toHaveURL(/\/today/);

	const persisted = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(persisted.activeSession).toBeNull();
	expect(persisted.completedLessons.fr).toEqual(['fr-01']);
	expect(persisted.closures).toHaveLength(1);
});

test('new-first completion keeps the paired recall stable across refresh', async ({ page }) => {
	await onboard(page);
	await seedDailyClosure(page, 'learn', true);
	await finishSeededClosure(page);
	await expect(page.getByText(/Lesson 1 · Au café/)).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start recall' })).toBeVisible();
	await expect(page.getByText(/Lesson 5 ·/)).toHaveCount(0);

	await page.reload();
	await expect(page.getByText(/Lesson 1 · Au café/)).toBeVisible();
	await seedDailyClosure(page, 'recall', false);
	await finishSeededClosure(page);
	await expect(page.getByText("Today's session complete")).toBeVisible();
});

test('recall-first completion keeps the paired new lesson stable', async ({ page }) => {
	await onboard(page);
	await seedDailyClosure(page, 'recall', true);
	await finishSeededClosure(page);
	await expect(page.getByText(/Lesson 4 ·/)).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start recall' })).toHaveCount(0);

	await seedDailyClosure(page, 'learn', false);
	await finishSeededClosure(page);
	await expect(page.getByText("Today's session complete")).toBeVisible();
});

test('a new local day receives a fresh assignment without rewriting yesterday', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const now = new Date();
		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);
		const dayKey = (date: Date) =>
			`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
		const oldDay = dayKey(yesterday);
		stored.completedLessons.fr = ['fr-01', 'fr-02', 'fr-03', 'fr-04'];
		stored.completedRecallLessons = { fr: ['fr-01'] };
		stored.activeSession = null;
		stored.dailyAssignments.fr = {
			[oldDay]: {
				day: oldDay,
				newLessonId: 'fr-04',
				recallLessonId: 'fr-01',
				completedModes: ['learn', 'recall']
			}
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	await expect(page.getByText(/Lesson 5 ·/)).toBeVisible();
	await expect(page.getByText(/Lesson 2 ·/)).toBeVisible();

	const assignments = await page.evaluate(
		(key) => JSON.parse(localStorage.getItem(key)!).dailyAssignments.fr,
		STORAGE_KEY
	);
	expect(Object.keys(assignments)).toHaveLength(2);
});

test('course-invalid sessions are cleared without losing the valid profile', async ({ page }) => {
	await onboard(page);
	const invalidSessions = [
		{ language: 'fr', lessonId: 'fr-99', flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'], currentStep: 'preview' },
		{ language: 'ta', lessonId: 'ta-01', flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'], currentStep: 'preview' },
		{ language: 'fr', lessonId: 'fr-07', flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'], currentStep: 'preview' },
		{ mode: 'recall', language: 'fr', lessonId: 'fr-07', flow: ['recall', 'compare', 'closure'], currentStep: 'recall' }
	];

	for (const invalid of invalidSessions) {
		await page.evaluate(
			({ key, invalid }) => {
				const stored = JSON.parse(localStorage.getItem(key)!);
				stored.evidence = [{ id: 'keep-me', constructionId: 'fr.je-voudrais', language: 'fr', kind: 'parallel-read', lessonId: 'fr-01', at: 1, day: '2026-08-23', hinted: false }];
				stored.activeSession = {
					id: 'invalid-course-session',
					mode: invalid.mode ?? 'learn',
					...invalid,
					completedSteps: [],
					startedAt: 1,
					updatedAt: 1
				};
				localStorage.setItem(key, JSON.stringify(stored));
			},
			{ key: STORAGE_KEY, invalid }
		);
		await page.reload();
		await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
		const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
		expect(stored.activeSession).toBeNull();
		expect(stored.evidence).toHaveLength(1);
	}
});

test('failed cleanup persistence still recovers the valid profile in memory', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.activeSession = {
			id: 'missing-lesson',
			mode: 'learn',
			language: 'fr',
			lessonId: 'fr-99',
			flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'],
			currentStep: 'preview',
			completedSteps: [],
			startedAt: 1,
			updatedAt: 1
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.addInitScript(() => {
		Storage.prototype.setItem = () => {
			throw new DOMException('blocked', 'QuotaExceededError');
		};
	});
	await page.reload();
	await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
});

test('abandon leaves evidence and the frozen assignment intact', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.evidence = [{
			id: 'keep-after-abandon', constructionId: 'fr.je-voudrais', language: 'fr',
			kind: 'parallel-read', lessonId: 'fr-01', at: 1, day: '2026-08-23', hinted: false
		}];
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.goto('/today');
	await page.getByRole('button', { name: 'Abandon session' }).click();
	await expect(page.getByText(/Lesson 1 · Au café/)).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
	const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(stored.activeSession).toBeNull();
	expect(stored.evidence.map((event: { id: string }) => event.id)).toEqual(['keep-after-abandon']);
});

test('post-course recall advances past synthesis lessons and reaches true completion', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.completedLessons.fr = Array.from({ length: 14 }, (_, index) => `fr-${String(index + 1).padStart(2, '0')}`);
		stored.completedRecallLessons = {
			fr: ['fr-01', 'fr-02', 'fr-03', 'fr-04', 'fr-05', 'fr-06', 'fr-08', 'fr-09', 'fr-10', 'fr-11', 'fr-12']
		};
		stored.activeSession = null;
		stored.dailyAssignments.fr = {};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	await expect(page.getByText(/Lesson 13 ·/)).toBeVisible();
	await expect(page.getByText(/Lesson 14 ·/)).toHaveCount(0);

	await seedDailyClosure(page, 'recall', false, 'fr-13');
	await finishSeededClosure(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.dailyAssignments.fr = {};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	await expect(page.getByText('Course complete', { exact: true })).toBeVisible();
});

test('invalid current daily assignments recover without rewriting history', async ({ page }) => {
	await onboard(page);
	const corruptions = [
		{ name: 'missing new lesson', patch: { newLessonId: 'fr-99' } },
		{ name: 'missing recall lesson', patch: { recallLessonId: 'fr-99' } },
		{ name: 'wrong recall cursor', patch: { recallLessonId: 'fr-02' } },
		{ name: 'wrong-language recall', patch: { recallLessonId: 'ta-01' } },
		{ name: 'synthesis without recall', patch: { recallLessonId: 'fr-07' } },
		{ name: 'mismatched assignment day', patch: { day: '2026-08-22' } },
		{ name: 'completed absent mode', patch: { recallLessonId: null, completedModes: ['recall'] } }
	];

	for (const corruption of corruptions) {
		await page.evaluate(
			({ key, patch }) => {
				const stored = JSON.parse(localStorage.getItem(key)!);
				const now = new Date();
				const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
				stored.completedLessons.fr = ['fr-01', 'fr-02', 'fr-03'];
				stored.completedRecallLessons = { fr: [] };
				stored.activeSession = null;
				stored.dailyAssignments.fr = {
					'2026-08-01': {
						day: '2026-08-01', newLessonId: 'historical-removed-id',
						recallLessonId: null, completedModes: []
					},
					[today]: {
						day: today, newLessonId: 'fr-04', recallLessonId: 'fr-01',
						completedModes: [], ...patch
					}
				};
				localStorage.setItem(key, JSON.stringify(stored));
			},
			{ key: STORAGE_KEY, patch: corruption.patch }
		);
		await page.reload();
		await expect(page.getByText(/Lesson 4 ·/), corruption.name).toBeVisible();
		await expect(page.getByText(/Lesson 1 · Au café/), corruption.name).toBeVisible();
		const assignments = await page.evaluate(
			(key) => JSON.parse(localStorage.getItem(key)!).dailyAssignments.fr,
			STORAGE_KEY
		);
		expect(assignments['2026-08-01'], corruption.name).toEqual({
			day: '2026-08-01', newLessonId: 'historical-removed-id',
			recallLessonId: null, completedModes: []
		});
	}
});

test('daily-assignment cleanup write failure still regenerates Today in memory', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const now = new Date();
		const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
		stored.dailyAssignments.fr[today].newLessonId = 'fr-99';
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.addInitScript(() => {
		Storage.prototype.setItem = () => {
			throw new DOMException('blocked', 'QuotaExceededError');
		};
	});
	await page.reload();
	await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();
	await expect(page.getByText(/Lesson 1 · Au café/)).toBeVisible();
});

test('Book Start creates an authorized session tied to the matching Today assignment', async ({ page }) => {
	await onboard(page);
	await page.goto('/book');
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/preview/);
	const session = await page.evaluate(
		(key) => JSON.parse(localStorage.getItem(key)!).activeSession,
		STORAGE_KEY
	);
	expect(session.lessonId).toBe('fr-01');
	expect(session.assignmentDay).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

test('Book truthfully resumes an active session and does not offer a conflicting start', async ({ page }) => {
	await onboard(page);
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.goto('/book');
	await expect(page.getByRole('button', { name: 'Resume current session' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toHaveCount(0);
	await page.getByRole('button', { name: 'Resume current session' }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/preview/);
});

test('Book review is off-assignment and preserves the frozen new lesson', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const now = new Date();
		const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
		stored.completedLessons.fr = ['fr-01'];
		stored.dailyAssignments.fr[today] = {
			day: today, newLessonId: 'fr-02', recallLessonId: null, completedModes: []
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.goto('/book');
	await page.getByRole('button', { name: 'Review' }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/preview/);
	const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(stored.activeSession.assignmentDay).toBeUndefined();
	expect(Object.values(stored.dailyAssignments.fr)[0]).toEqual(
		expect.objectContaining({ newLessonId: 'fr-02', completedModes: [] })
	);
});

test('Book cannot advance beyond a completed frozen assignment before rollover', async ({ page }) => {
	await onboard(page);
	await seedDailyClosure(page, 'learn', false, 'fr-01');
	await finishSeededClosure(page);
	await page.goto('/book');
	await expect(page.getByRole('button', { name: 'Review' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toHaveCount(0);
	await expect(page.getByText('Opens when Today assigns this lesson.').first()).toBeVisible();

	await page.getByRole('button', { name: 'Review' }).click();
	let stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(stored.activeSession.assignmentDay).toBeUndefined();
	const todayAssignment = Object.values(stored.dailyAssignments.fr)[0] as {
		newLessonId: string;
		completedModes: string[];
	};
	expect(todayAssignment).toEqual(expect.objectContaining({
		newLessonId: 'fr-01', completedModes: ['learn']
	}));

	await page.goto('/today');
	await page.getByRole('button', { name: 'Abandon session' }).click();
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const [today, assignment] = Object.entries(stored.dailyAssignments.fr)[0] as [string, Record<string, unknown>];
		const date = new Date(`${today}T12:00:00`);
		date.setDate(date.getDate() - 1);
		const yesterday = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
		stored.dailyAssignments.fr = { [yesterday]: { ...assignment, day: yesterday } };
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	await expect(page.getByText(/Lesson 2 ·/)).toBeVisible();
});

test('Today notices a local day change without a reload', async ({ page }) => {
	await page.clock.install({ time: new Date('2026-08-23T10:00:00') });
	await onboard(page);
	const beforeUrl = page.url();
	await page.clock.setSystemTime(new Date('2026-08-24T10:00:00'));
	await page.evaluate(() => window.dispatchEvent(new Event('focus')));
	await expect(page.getByText('Day 2', { exact: true })).toBeVisible();
	await expect(page.getByText(/Lesson 1 · Au café/)).toBeVisible();
	expect(page.url()).toBe(beforeUrl);
});

test('corrupt sequencing cursors recover to ordered course prefixes', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.completedLessons = {
			fr: ['fr-01', 'fr-03', 'fr-02'],
			ta: ['ta-01', 'fr-02']
		};
		stored.completedRecallLessons = { fr: ['fr-02', 'fr-01'], ta: ['ta-02'] };
		stored.evidence = [{
			id: 'keep-cursor-recovery', constructionId: 'fr.je-voudrais', language: 'fr',
			kind: 'parallel-read', lessonId: 'fr-01', at: 1, day: '2026-08-23', hinted: false
		}];
		stored.settings.textScale = 73;
		stored.activeSession = null;
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(stored.completedLessons).toEqual({ fr: ['fr-01'], ta: ['ta-01'] });
	expect(stored.completedRecallLessons).toEqual({ fr: [], ta: [] });
	expect(stored.evidence.map((event: { id: string }) => event.id)).toEqual(['keep-cursor-recovery']);
	expect(stored.settings.textScale).toBe(73);
	await expect(page.getByText(/Lesson 2 ·/)).toBeVisible();
});

test('assignment-origin session must match its persisted assignment authorization', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const day = Object.keys(stored.dailyAssignments.fr)[0];
		stored.activeSession = {
			id: 'mismatched-assignment-session', mode: 'learn', origin: 'today',
			language: 'fr', lessonId: 'fr-02',
			flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'],
			currentStep: 'preview', completedSteps: [], assignmentDay: day,
			startedAt: 1, updatedAt: 1
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
	const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(stored.activeSession).toBeNull();
});

test('storage failure warns before navigation state is lost on refresh', async ({ page }) => {
	await onboard(page);
	await page.addInitScript(() => {
		Storage.prototype.setItem = () => {
			throw new DOMException('blocked', 'QuotaExceededError');
		};
	});
	await page.reload();
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await expect(page.getByRole('alert')).toContainText('will be lost on refresh');
	await expect(page).toHaveURL(/\/learn\/fr-01\/preview/);
	await page.reload();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
});

test('stale Book Start at midnight cannot become an off-assignment session', async ({ page }) => {
	await page.clock.install({ time: new Date('2026-08-23T23:59:50') });
	await onboard(page);
	await page.goto('/book');
	const staleStart = page.getByRole('button', { name: 'Start', exact: true });
	await expect(staleStart).toBeVisible();
	await page.clock.setSystemTime(new Date('2026-08-24T00:00:10'));
	await staleStart.click();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByText('Day 2', { exact: true })).toBeVisible();
	const active = await page.evaluate((key) => {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw).activeSession : null;
	}, STORAGE_KEY);
	expect(active).toBeNull();
});

test('forged Book sessions authorize completed learn reviews only', async ({ page }) => {
	await onboard(page);
	const forgeries = [
		{ mode: 'learn', lessonId: 'fr-02', flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'] },
		{ mode: 'recall', lessonId: 'fr-01', flow: ['recall', 'compare', 'closure'] }
	];
	for (const forgery of forgeries) {
		await page.evaluate(
			({ key, forgery }) => {
				const stored = JSON.parse(localStorage.getItem(key)!);
				stored.activeSession = {
					id: `forged-book-${forgery.mode}`, origin: 'book', ...forgery,
					language: 'fr', currentStep: forgery.flow[0], completedSteps: [],
					startedAt: 1, updatedAt: 1
				};
				localStorage.setItem(key, JSON.stringify(stored));
			},
			{ key: STORAGE_KEY, forgery }
		);
		await page.reload();
		await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
		const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
		expect(stored.activeSession).toBeNull();
	}
});

test('inactive-language corrupt assignment is recovered before switching', async ({ page }) => {
	await onboard(page);
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const today = Object.keys(stored.dailyAssignments.fr)[0];
		stored.plans.ta = { ...stored.plans.fr };
		stored.completedLessons.ta = ['ta-01', 'fr-02'];
		stored.completedRecallLessons.ta = ['ta-02'];
		stored.dailyAssignments.ta = {
			[today]: {
				day: today, newLessonId: 'ta-99', recallLessonId: 'fr-01', completedModes: []
			}
		};
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
	await page.goto('/settings');
	await page.getByRole('button', { name: 'Tamil' }).click();
	await page.goto('/today');
	await expect(page.getByText(/Lesson 2 · ஹோட்டலில்/)).toBeVisible();
	const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
	expect(stored.completedLessons.ta).toEqual(['ta-01']);
	expect(stored.completedRecallLessons.ta).toEqual([]);
});
