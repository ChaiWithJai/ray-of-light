import { expect, test, type Page } from '@playwright/test';

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
}

async function startRecall(page: Page, lessonId: string, language: 'fr' | 'ta' = 'fr') {
	await page.evaluate(
		({ lessonId, language }) => {
			const key = 'ray-of-light.profile.v1';
			const current = JSON.parse(localStorage.getItem(key)!);
			const now = Date.now();
			current.activeLanguage = language;
			current.activeSession = {
				id: `test-recall-${lessonId}`,
				mode: 'recall',
				language,
				lessonId,
				flow: ['recall', 'compare', 'closure'],
				currentStep: 'recall',
				completedSteps: [],
				startedAt: now,
				updatedAt: now
			};
			localStorage.setItem(key, JSON.stringify(current));
		},
		{ lessonId, language }
	);
	await page.goto(`/recall/${lessonId}/recall`);
}

async function persistedEvidence(page: Page) {
	return page.evaluate(() => {
		const raw = localStorage.getItem('ray-of-light.profile.v1');
		if (!raw) return [];
		const evidence = JSON.parse(raw).evidence as Array<{
			kind: string;
			constructionId: string;
			hinted: boolean;
		}>;
		return evidence;
	});
}

test('a correct active-recall attempt persists recall-correct evidence', async ({ page }) => {
	await onboard(page);
	await startRecall(page, 'fr-02');
	await expect(page.getByText(/I would like to book a room for two nights/)).toBeVisible();
	await page.getByLabel('Your production').fill('Je voudrais réserver une chambre pour deux nuits.');
	await page.getByRole('button', { name: /Compare with the canonical line/ }).click();

	await expect(page).toHaveURL(/\/recall\/fr-02\/compare/);
	const evidence = await persistedEvidence(page);
	expect(evidence.map((event) => event.constructionId)).toEqual([
		'fr.je-voudrais-inf',
		'fr.pour-duree'
	]);
	expect(evidence.every((event) => event.kind === 'recall-correct' && !event.hinted)).toBe(true);
	await page.getByRole('button', { name: 'Show the canonical line' }).click();
	await expect(
		page
			.getByText('CANONICAL ▶')
			.locator('..')
			.getByText('Je voudrais réserver une chambre pour deux nuits.', { exact: true })
	).toBeVisible();
});

test('a nonblank wrong active-recall attempt persists incorrect evidence', async ({ page }) => {
	await onboard(page);
	await startRecall(page, 'fr-02');
	await page.getByLabel('Your production').fill('Bonjour, monsieur.');
	await page.getByRole('button', { name: /Compare with the canonical line/ }).click();

	await expect(page).toHaveURL(/\/recall\/fr-02\/compare/);
	const evidence = await persistedEvidence(page);
	expect(evidence.map((event) => event.constructionId)).toEqual([
		'fr.je-voudrais-inf',
		'fr.pour-duree'
	]);
	expect(evidence.every((event) => event.kind === 'attempt-incorrect' && !event.hinted)).toBe(
		true
	);
	await page.getByRole('button', { name: 'Show the canonical line' }).click();
	await expect(
		page
			.getByText('CANONICAL ▶')
			.locator('..')
			.getByText('Je voudrais réserver une chambre pour deux nuits.', { exact: true })
	).toBeVisible();
});

test('a hinted accepted answer is recorded but grants no unhinted recall', async ({ page }) => {
	await onboard(page);
	await startRecall(page, 'fr-02');
	await page.getByRole('button', { name: 'hint: first word' }).click();
	await page.getByLabel('Your production').fill('Je voudrais réserver une chambre pour deux nuits.');
	await page.getByRole('button', { name: /Compare with the canonical line/ }).click();

	const evidence = await persistedEvidence(page);
	expect(evidence.map((event) => event.constructionId)).toEqual([
		'fr.je-voudrais-inf',
		'fr.pour-duree'
	]);
	expect(evidence.every((event) => event.kind === 'recall-correct' && event.hinted)).toBe(true);
});

test('an authored Tamil transliteration is accepted and compared as accepted', async ({ page }) => {
	await onboard(page);
	await startRecall(page, 'ta-02', 'ta');
	await expect(page.getByText('Say it in Tamil: "Do you have a room?"', { exact: true })).toBeVisible();
	await page.getByLabel('Your production').fill('room irukkā');
	await page.getByRole('button', { name: /Compare with the canonical line/ }).click();

	expect(await persistedEvidence(page)).toEqual([
		expect.objectContaining({
			kind: 'recall-correct',
			constructionId: 'ta.irukka-q',
			hinted: false
		})
	]);
	await page.getByRole('button', { name: 'Show the canonical line' }).click();
	const acceptedCard = page.getByText('ACCEPTED FORM ▶').locator('..');
	await expect(acceptedCard).toBeVisible();
	await expect(acceptedCard.getByText('room irukkā', { exact: true })).toBeVisible();
	await expect(page.getByText('Canonical script: ரூம் இருக்கா?')).toBeVisible();
});
