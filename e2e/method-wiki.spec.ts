import { expect, test, type Page } from '@playwright/test';

/**
 * The method wiki's three access forms (#47), each exercised as a learner
 * would meet it: the glossary popover mid-exercise, the stuck panel that never
 * leaves the route, and the full pages entered deliberately and left again.
 */

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await expect(page.getByText("Let's find your starting point")).toBeVisible();
	await page.getByRole('button', { name: 'Continue' }).click();
	await expect(page.getByText('How much, daily?')).toBeVisible();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page).toHaveURL(/\/today/);
}

/** Drop the learner mid-session on the transfer step, as flow.spec.ts does. */
async function authorizeTransferStep(page: Page) {
	await page.evaluate(() => {
		const key = 'ray-of-light.profile.v1';
		const stored = JSON.parse(localStorage.getItem(key)!);
		const assignmentDay = Object.keys(stored.dailyAssignments.fr)[0];
		stored.activeSession = {
			id: 'test-learn-fr-01',
			mode: 'learn',
			language: 'fr',
			lessonId: 'fr-01',
			flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'],
			currentStep: 'transfer',
			completedSteps: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion'],
			origin: 'today',
			assignmentDay,
			startedAt: Date.now(),
			updatedAt: Date.now()
		};
		localStorage.setItem(key, JSON.stringify(stored));
	});
	await page.goto('/learn/fr-01/transfer');
	await expect(page).toHaveURL(/\/learn\/fr-01\/transfer/);
}

test('a marked term opens its glossary popover in place, mid-exercise', async ({ page }) => {
	await onboard(page);
	await authorizeTransferStep(page);

	await page.getByTestId('term-construction').click();
	const popover = page.getByTestId('term-popover');
	await expect(popover).toBeVisible();
	await expect(popover).toContainText('A reusable phrase pattern');
	await expect(popover.getByRole('link', { name: 'more' })).toHaveAttribute(
		'href',
		'/wiki/glossary/construction'
	);

	// No navigation happened, and dismissing returns to the exercise untouched.
	await expect(page).toHaveURL(/\/learn\/fr-01\/transfer/);
	await page.keyboard.press('Escape');
	await expect(popover).toHaveCount(0);
	await expect(page.getByLabel('Your new sentence')).toBeVisible();
});

test('the stuck panel unblocks without a route change and returns state intact', async ({
	page
}) => {
	await onboard(page);
	await authorizeTransferStep(page);

	// Type an attempt first, to prove the overlay preserves exercise state.
	await page.getByLabel('Your new sentence').fill('Je voudrais un thé');

	await page.getByTestId('stuck-link').click();
	const panel = page.getByTestId('wiki-panel');
	await expect(panel).toBeVisible();
	await expect(panel).toContainText('Transfer: make it yours');
	await expect(page.getByTestId('wiki-panel-unstuck')).toContainText(
		'Start from the pattern shown on the step'
	);
	await expect(page).toHaveURL(/\/learn\/fr-01\/transfer/);

	await page.getByTestId('wiki-panel-close').click();
	await expect(panel).toHaveCount(0);
	await expect(page).toHaveURL(/\/learn\/fr-01\/transfer/);
	await expect(page.getByLabel('Your new sentence')).toHaveValue('Je voudrais un thé');
});

test('a concept intro goes deeper as an overlay, never leaving the step', async ({ page }) => {
	await onboard(page);
	await authorizeTransferStep(page);

	// First run: the intro card is open and carries the "learn more" affordance.
	await page.getByTestId('intro-learn-more').click();
	const panel = page.getByTestId('wiki-panel');
	await expect(panel).toBeVisible();
	await expect(panel).toContainText('turns a memorised line into language you own');
	await expect(page).toHaveURL(/\/learn\/fr-01\/transfer/);
	await page.getByTestId('wiki-panel-close').click();
	await expect(panel).toHaveCount(0);
});

test('the deep pages are reachable from Settings and lead back out again', async ({ page }) => {
	await onboard(page);
	await page.goto('/settings');
	await page.getByRole('link', { name: 'Read the method guide' }).click();
	await expect(page).toHaveURL(/\/wiki$/);
	await expect(page.getByRole('heading', { name: 'The method, explained' })).toBeVisible();

	await page.getByRole('link', { name: 'Shadowing', exact: true }).click();
	await expect(page).toHaveURL(/\/wiki\/techniques\/shadowing/);
	await expect(page.getByRole('heading', { name: 'Shadowing' })).toBeVisible();
	await expect(page.getByText('If you are stuck')).toBeVisible();
	await expect(page.getByText('Why it works')).toBeVisible();

	// Leaving retraces the way in: page → guide → settings.
	await page.getByLabel('Back').click();
	await expect(page).toHaveURL(/\/wiki$/);
	await page.getByLabel('Back').click();
	await expect(page).toHaveURL(/\/settings/);
});

test('the capability page is linked from Progress and lists every state', async ({ page }) => {
	await onboard(page);
	await page.goto('/progress');
	await page.getByRole('button', { name: 'what these mean' }).click();
	await page.getByRole('link', { name: 'The full capability ladder' }).click();
	await expect(page).toHaveURL(/\/wiki\/capability/);
	for (const state of ['exposed', 'recognized', 'recalled', 'stabilized', 'transferable']) {
		await expect(page.getByRole('heading', { name: state, exact: true })).toBeVisible();
	}
});
