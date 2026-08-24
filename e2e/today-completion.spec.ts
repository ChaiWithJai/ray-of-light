import { expect, test, type Page } from '@playwright/test';

const STORAGE_KEY = 'ray-of-light.profile.v1';

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
}

async function startRecall(page: Page, lessonId: string, language: 'fr' | 'ta' = 'fr') {
	await page.evaluate(
		({ lessonId, language, key }) => {
			const current = JSON.parse(localStorage.getItem(key)!);
			const now = Date.now();
			const lessonIndex = Number(lessonId.slice(-2));
			const id = (index: number) => `${language}-${String(index).padStart(2, '0')}`;
			const day = new Date();
			const dayKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
			current.activeLanguage = language;
			current.completedLessons[language] = Array.from(
				{ length: lessonIndex + 2 },
				(_, index) => id(index + 1)
			);
			current.completedRecallLessons[language] = Array.from(
				{ length: lessonIndex - 1 },
				(_, index) => id(index + 1)
			);
			current.dailyAssignments[language] = {
				[dayKey]: {
					day: dayKey,
					newLessonId: id(lessonIndex + 3),
					recallLessonId: lessonId,
					completedModes: []
				}
			};
			current.activeSession = {
				id: `test-recall-${lessonId}`,
				mode: 'recall',
				language,
				lessonId,
				flow: ['recall', 'compare', 'closure'],
				currentStep: 'recall',
				completedSteps: [],
				origin: 'today',
				assignmentDay: dayKey,
				startedAt: now,
				updatedAt: now
			};
			localStorage.setItem(key, JSON.stringify(current));
		},
		{ lessonId, language, key: STORAGE_KEY }
	);
	await page.goto(`/recall/${lessonId}/recall`);
}

async function finishRecallFlow(page: Page) {
	await page.getByRole('button', { name: 'Show the original line' }).click();
	await page.getByRole('button', { name: /Say the corrected line/ }).click();
	await page.getByRole('button', { name: 'Done for today' }).click();
	await expect(page).toHaveURL(/\/today/);
}

async function readProfile(page: Page) {
	return page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
}

test('the entry assessment places the learner and Today starts the passive wave there', async ({
	page
}) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();

	// Recognize the audio sample's meaning and say it back: both signals present
	// places the learner at lesson 3.
	await page.getByRole('button', { name: '"I would like a coffee, please."' }).click();
	await page.getByRole('button', { name: 'Hold to speak' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();

	await expect(page.getByText(/places you at lesson 3 · Au marché/)).toBeVisible();
	await page.getByRole('button', { name: 'Set my plan' }).click();

	// Today starts the passive wave at the placed lesson, not lesson 1.
	await expect(page.getByText('Lesson 3 · new')).toBeVisible();
	await expect(page.getByText('Au marché')).toBeVisible();

	// Placement is scheduling only: no completion flags, no evidence granted.
	const profile = await readProfile(page);
	expect(profile.plans.fr.entryLessonIndex).toBe(3);
	expect(profile.completedLessons.fr ?? []).toEqual([]);
	expect(profile.evidence).toEqual([]);
});

test('a failed recall becomes a due resurface item that Today surfaces into retrieval', async ({
	page
}) => {
	await onboard(page);
	await startRecall(page, 'fr-02');

	// Fail the recall: a nonblank wrong attempt records attempt-incorrect.
	await page.getByLabel('Your production').fill('Bonjour, monsieur.');
	await page.getByRole('button', { name: /Compare with the original line/ }).click();
	await expect(page).toHaveURL(/\/recall\/fr-02\/compare/);
	await finishRecallFlow(page);

	// The miss is due tomorrow (1 · 3 · 7 ladder), so nothing surfaces today.
	await expect(page.getByText('Worth another look')).not.toBeVisible();

	// A day passes: shift the recorded evidence back one local day.
	await page.evaluate((key) => {
		const current = JSON.parse(localStorage.getItem(key)!);
		const dayMs = 86_400_000;
		const toDayKey = (date: Date) =>
			`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
		current.evidence = current.evidence.map((event: { at: number }) => {
			const at = event.at - dayMs;
			return { ...event, at, day: toDayKey(new Date(at)) };
		});
		localStorage.setItem(key, JSON.stringify(current));
	}, STORAGE_KEY);
	await page.reload();

	// Today derives the due item from evidence and offers the retrieval.
	await expect(page.getByText('Worth another look')).toBeVisible();
	await expect(page.getByText("À l'hôtel")).toBeVisible();
	await page.getByRole('button', { name: 'Retrieve it again' }).click();
	await expect(page).toHaveURL(/\/recall\/fr-02\/recall/);

	// This time the retrieval succeeds and lands as ordinary recall evidence.
	await page.getByLabel('Your production').fill('Je voudrais réserver une chambre pour deux nuits.');
	await page.getByRole('button', { name: /Compare with the original line/ }).click();
	await expect(page).toHaveURL(/\/recall\/fr-02\/compare/);
	await finishRecallFlow(page);

	const profile = await readProfile(page);
	const latest = profile.evidence.slice(-2) as Array<{ kind: string; hinted: boolean }>;
	expect(latest).toHaveLength(2);
	expect(latest.every((event) => event.kind === 'recall-correct' && !event.hinted)).toBe(true);

	// The resurface retrieval never advances the recall wave's sequencing.
	expect(profile.completedRecallLessons.fr).toEqual(['fr-01', 'fr-02']);

	// The successful retrieval climbed the ladder: the item is no longer due.
	await expect(page.getByText('Worth another look')).not.toBeVisible();
});
