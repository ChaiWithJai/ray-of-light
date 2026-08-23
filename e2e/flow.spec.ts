import { expect, test, type Page } from '@playwright/test';

/**
 * Walks the acceptance criteria from issue #1 through the real app.
 *
 * These are deliberately written against what a learner can *see and do*, not
 * against internals — AC 1 is "Jai can select a language and finish a full daily
 * session", so the test finishes a full daily session.
 */

async function onboard(page: Page, language: 'French' | 'Tamil' = 'French') {
	await page.goto('/');
	await page.getByRole('button', { name: `Start ${language}` }).click();
	await expect(page.getByText("Let's find your starting point")).toBeVisible();
	await page.getByRole('button', { name: 'Continue' }).click();
	await expect(page.getByText('How much, daily?')).toBeVisible();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page).toHaveURL(/\/today/);
}

test('AC1: a learner can pick a language and reach Today', async ({ page }) => {
	await onboard(page);
	await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();
});

test('AC1 + AC2 + AC7: a full daily session, audio first and transfer last', async ({ page }) => {
	await onboard(page);
	await page.getByRole('button', { name: 'Start', exact: true }).click();

	// AC 2: the session opens on audio, with no target text reachable.
	await expect(page).toHaveURL(/\/learn\/fr-01\/preview/);
	await expect(page.getByText('Just listen.')).toBeVisible();
	await expect(page.getByText('Bonjour, monsieur.')).toHaveCount(0);

	await page.getByRole('button', { name: /listened twice|Skip ahead/ }).click();

	// The spread.
	await expect(page).toHaveURL(/\/spread/);
	await expect(page.getByText('Bonjour, monsieur.')).toBeVisible();
	await page.getByRole('button', { name: /read the spread/ }).click();

	// Comprehension, then the rest of the flow.
	await expect(page).toHaveURL(/\/comprehension/);
	await page.getByRole('button', { name: /I would like a coffee/ }).first().click();
	await page.getByRole('button', { name: /Next|Continue/ }).click();

	await expect(page).toHaveURL(/\/shadow/);
	await page.getByRole('button', { name: 'Continue' }).click();

	await expect(page).toHaveURL(/\/translate/);
	await page.getByLabel('Your English translation').fill("It's very good.");
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByTestId('reveal')).toBeVisible();
	await page.getByRole('button', { name: 'Continue' }).click();

	await expect(page).toHaveURL(/\/completion/);
	await page.getByRole('button', { name: 'Bonjour', exact: true }).click();
	await page.getByRole('button', { name: 'Continue' }).click();

	// AC 7: the lesson ends with a novel transfer prompt.
	await expect(page).toHaveURL(/\/transfer/);
	await expect(page.getByText(/New situation|bakery/i)).toBeVisible();
	await page.getByLabel('Your new sentence').fill("Je voudrais un croissant, s'il vous plaît.");
	await page.getByRole('button', { name: 'Check' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();

	// Closure, then back to Today with the lesson behind us.
	await expect(page).toHaveURL(/\/closure/);
	await page.getByRole('button', { name: 'Done for today' }).click();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByText('Lesson 2 ·')).toBeVisible();
});

test('AC3: the spread is trackable by keyboard alone', async ({ page }) => {
	await onboard(page);
	await page.goto('/learn/fr-01/spread');

	const spread = page.getByRole('listbox');
	await spread.focus();
	await expect(page.getByRole('option', { selected: true })).toContainText('Bonjour, monsieur.');

	await page.keyboard.press('ArrowDown');
	await expect(page.getByRole('option', { selected: true })).toContainText('Vous désirez');

	await page.keyboard.press('ArrowUp');
	await expect(page.getByRole('option', { selected: true })).toContainText('Bonjour, monsieur.');
});

test('AC4: covering a column does not change the layout', async ({ page }) => {
	await onboard(page);
	await page.goto('/learn/fr-01/spread');

	const firstPair = page.getByRole('option').first();
	const before = await firstPair.boundingBox();

	await page.getByRole('button', { name: 'cover EN' }).click();
	await expect(page.getByText('covered').first()).toBeVisible();

	const after = await firstPair.boundingBox();
	expect(after?.width).toBeCloseTo(before?.width ?? 0, 0);
	expect(after?.height).toBeCloseTo(before?.height ?? 0, 0);
});

test('AC6: the canonical answer stays hidden until an attempt is made', async ({ page }) => {
	await onboard(page);
	await page.goto('/learn/fr-01/translate');

	// Nothing revealed, and Check is unavailable with an empty answer.
	await expect(page.getByTestId('reveal')).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Check' })).toBeDisabled();

	await page.getByLabel('Your English translation').fill('anything at all');
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByTestId('reveal')).toBeVisible();
});

test('AC9: Tamil shows script, transliteration and both glosses', async ({ page }) => {
	await onboard(page, 'Tamil');
	await page.goto('/learn/ta-01/spread');

	await expect(page.getByText('எனக்கு ஒரு காபி வேணும்.')).toBeVisible();
	await expect(page.getByText('enakku oru kaapi vēṇum.')).toBeVisible();

	await page.getByRole('option', { name: /enakku oru kaapi/ }).click();
	await expect(page.getByText(/lit\. To-me one coffee is-wanted/)).toBeVisible();
});

test('AC10: progress reflects capability, and persists across a reload', async ({ page }) => {
	await onboard(page);

	await page.goto('/progress');
	await expect(page.getByText('Nothing yet.')).toBeVisible();

	// Reading a pair is what `exposed` means. Line 3 carries `je voudrais`.
	await page.goto('/learn/fr-01/spread');
	await page.getByRole('option', { name: /Je voudrais un caf/ }).click();

	await page.goto('/progress');
	await expect(page.getByText('je voudrais + noun')).toBeVisible();

	// Survives a reload: the evidence log is in localStorage, not memory.
	await page.reload();
	await expect(page.getByText('je voudrais + noun')).toBeVisible();
	await expect(page.getByText(/constructions met/)).toBeVisible();
});

test('AC12: the core flow works at a mobile width', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await onboard(page);

	await page.goto('/learn/fr-01/spread');
	await expect(page.getByText('Bonjour, monsieur.')).toBeVisible();

	// The page itself must not scroll sideways at phone width.
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	expect(overflow).toBeLessThanOrEqual(1);
});

test('no lesson-level completion badge is presented as progress', async ({ page }) => {
	await onboard(page);
	await page.goto('/progress');
	await expect(page.getByText('%')).toHaveCount(0);
	await expect(page.getByText(/streak/i)).toHaveCount(0);
});
