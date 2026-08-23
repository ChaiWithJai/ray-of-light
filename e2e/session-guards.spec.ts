import { expect, test, type Page } from '@playwright/test';

const STORAGE_KEY = 'ray-of-light.profile.v1';

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
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

test('language switching cannot orphan an active session', async ({ page }) => {
	await onboard(page);
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.goto('/settings');
	await expect(page.getByText('Finish or resume the active session before switching languages.')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Tamil' })).toHaveCount(0);
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
		stored.activeSession = {
			id: 'valid-completion',
			mode: 'learn',
			language: 'fr',
			lessonId: 'fr-01',
			flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'],
			currentStep: 'closure',
			completedSteps: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer'],
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
