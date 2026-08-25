import { expect, test, type Page } from '@playwright/test';

/**
 * "Ask the method" — tier T1 of the aside harness (#48, spec §5).
 *
 * Retrieval only: no WebGPU, no weights, no model — which is exactly why this
 * suite can assert real answers. The learner asks mid-lesson and gets the
 * method's own passages with links into the wiki; asking with an answer still
 * unsubmitted says so first, and the attempt is recorded as hinted.
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

/** Drop the learner mid-session on a chosen step, as the other specs do. */
async function authorizeStep(page: Page, step: string, completed: string[]) {
	await page.evaluate(
		({ step, completed }) => {
			const key = 'ray-of-light.profile.v1';
			const stored = JSON.parse(localStorage.getItem(key)!);
			const assignmentDay = Object.keys(stored.dailyAssignments.fr)[0];
			stored.activeSession = {
				id: 'test-learn-fr-01',
				mode: 'learn',
				language: 'fr',
				lessonId: 'fr-01',
				flow: [
					'preview',
					'spread',
					'comprehension',
					'shadow',
					'translate',
					'completion',
					'transfer',
					'closure'
				],
				currentStep: step,
				completedSteps: completed,
				origin: 'today',
				assignmentDay,
				startedAt: Date.now(),
				updatedAt: Date.now()
			};
			localStorage.setItem(key, JSON.stringify(stored));
		},
		{ step, completed }
	);
	await page.goto(`/learn/fr-01/${step}`);
	await expect(page).toHaveURL(new RegExp(`/learn/fr-01/${step}`));
}

const BEFORE_COMPLETION = ['preview', 'spread', 'comprehension', 'shadow', 'translate'];

function evidence(page: Page) {
	return page.evaluate(() => {
		const stored = JSON.parse(localStorage.getItem('ray-of-light.profile.v1')!);
		return stored.evidence as { kind: string; hinted: boolean; constructionId: string }[];
	});
}

test('asking mid-lesson returns the wiki’s own passages, with links', async ({ page }) => {
	await onboard(page);
	// `shadow` grades nothing, so the boundary does not apply here.
	await authorizeStep(page, 'shadow', ['preview', 'spread', 'comprehension']);

	const ask = page.locator('aside').getByTestId('ask-method');
	await expect(ask).toBeVisible();
	// The honesty is stated up front: it finds, it does not compose.
	await expect(ask.getByTestId('ask-method-honesty')).toContainText(
		'does not write answers'
	);
	// No attempt is open on this step, so no hint notice.
	await expect(ask.getByTestId('ask-method-hint-notice')).toHaveCount(0);

	await ask.getByTestId('ask-method-input').fill('why do I say the line out loud');
	await ask.getByTestId('ask-method-submit').click();

	const results = ask.getByTestId('ask-method-results');
	await expect(results).toBeVisible();
	await expect(results.locator('li')).not.toHaveCount(0);
	await expect(ask.getByTestId('ask-method-provenance')).toContainText('method wiki');

	// The passages are real wiki text and they link into the wiki.
	const source = ask.getByTestId('ask-method-source').first();
	const href = await source.getAttribute('href');
	expect(href).toMatch(/^\/wiki\//);
	const quoted = (await results.locator('li p').first().innerText()).trim();
	await source.click();
	await expect(page).toHaveURL(new RegExp(href!.replace(/\//g, '\\/')));
	await expect(page.locator('body')).toContainText(quoted.slice(0, 60));

	// Nothing was recorded: reading the method outside an attempt costs nothing.
	expect(await evidence(page)).toEqual([]);
});

test('asking during an unsubmitted attempt says so first, then records the hint', async ({
	page
}) => {
	await onboard(page);
	await authorizeStep(page, 'completion', BEFORE_COMPLETION);

	const ask = page.locator('aside').getByTestId('ask-method');
	await expect(ask).toBeVisible();

	// The honesty lands BEFORE the learner asks — invitation register, not threat.
	const notice = ask.getByTestId('ask-method-hint-notice');
	await expect(notice).toBeVisible();
	await expect(notice).toContainText('counts as a hint');
	await expect(notice).toContainText('still counts as practice');

	await ask.getByTestId('ask-method-input').fill('what is a construction');
	await ask.getByTestId('ask-method-submit').click();
	await expect(ask.getByTestId('ask-method-results').locator('li')).not.toHaveCount(0);
	await expect(ask.getByTestId('ask-method-hint-recorded')).toContainText(
		'counts as practice'
	);

	// Answer the completion exercise: the attempt is now capped, exactly as a peek.
	const options = page.locator('main [data-slot="chip"]');
	await options.first().click();
	await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

	const recorded = await evidence(page);
	expect(recorded.length).toBeGreaterThan(0);
	expect(recorded.every((event) => event.hinted)).toBe(true);
});

test.describe('mobile', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test('the session overlay carries the same ask surface', async ({ page }) => {
		await onboard(page);
		await authorizeStep(page, 'shadow', ['preview', 'spread', 'comprehension']);

		// No aside column below lg — the overlay is the surface.
		await expect(page.locator('aside')).toBeHidden();
		await page.getByTestId('notes-link').click();

		const sheet = page.getByTestId('notes-sheet');
		const ask = sheet.getByTestId('ask-method');
		await expect(ask).toBeVisible();
		await ask.getByTestId('ask-method-input').fill('what does resurfacing mean');
		await ask.getByTestId('ask-method-submit').click();
		await expect(ask.getByTestId('ask-method-results').locator('li')).not.toHaveCount(0);
		await expect(ask.getByTestId('ask-method-source').first()).toHaveAttribute(
			'href',
			/^\/wiki\//
		);

		await page.getByTestId('notes-sheet-close').click();
		await expect(sheet).toHaveCount(0);
	});
});
