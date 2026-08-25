import { expect, test, type Page } from '@playwright/test';

/**
 * Per-construction wiki entries (#47 W3, #46 S2).
 *
 * Two things worth proving in a browser: the round trip a curious learner
 * actually takes (Progress card → the pattern's entry → back to Progress), and
 * that a pattern the learner has never met says so, in those words, instead of
 * dressing an absence up as a score.
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

/** One honest parallel-read event, the evidence that grants `exposed`. */
async function seedExposure(page: Page, constructionId: string) {
	await page.evaluate((id) => {
		const key = 'ray-of-light.profile.v1';
		const stored = JSON.parse(localStorage.getItem(key)!);
		const now = Date.now();
		const d = new Date(now);
		const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
			d.getDate()
		).padStart(2, '0')}`;
		stored.evidence.push({
			id: `seed-${id}`,
			constructionId: id,
			language: 'fr',
			kind: 'parallel-read',
			lessonId: 'fr-01',
			at: now,
			day,
			hinted: false
		});
		localStorage.setItem(key, JSON.stringify(stored));
	}, constructionId);
}

test('a Progress card opens its construction entry and leads back', async ({ page }) => {
	await onboard(page);
	await seedExposure(page, 'fr.je-voudrais');

	await page.goto('/progress');
	const card = page.getByTestId('construction-link-fr.je-voudrais');
	await expect(card).toBeVisible();
	await card.click();

	await expect(page).toHaveURL(/\/wiki\/constructions\/fr\.je-voudrais/);
	await expect(page.getByRole('heading', { name: 'je voudrais + noun' })).toBeVisible();
	// The state shown is the one the seeded evidence earns, not a page count.
	await expect(page.getByTestId('construction-stage')).toHaveText('exposed');
	// The drawing says exactly what the word says: a sprite that server-rendered
	// before the profile loaded must not stay at its "unmet" outline.
	await expect(page.locator('[data-testid="construction-state"] svg')).toHaveAttribute(
		'data-stage',
		'exposed'
	);
	// The lines it cites are real course lines carrying the pattern.
	await expect(page.getByTestId('construction-lines')).toContainText('Je voudrais');
	// Both ways out: the introducing lesson in the Book, and the ladder page.
	await expect(page.getByTestId('construction-lesson-link')).toHaveAttribute(
		'href',
		'/book#lesson-fr-01'
	);
	await page.getByTestId('construction-ladder-link').click();
	await expect(page).toHaveURL(/\/wiki\/capability/);

	await page.goBack();
	await page.getByLabel('Back').click();
	await expect(page).toHaveURL(/\/wiki\/constructions$/);
	await page.getByLabel('Back').click();
	await expect(page).toHaveURL(/\/wiki$/);
});

test('a pattern never met says "not yet met" and where to meet it', async ({ page }) => {
	await onboard(page);

	// fr.avec-plaisir is introduced in lesson 13; a first-day learner owns none.
	await page.goto('/wiki/constructions/fr.avec-plaisir');
	await expect(page.getByTestId('construction-stage')).toHaveText('not yet met');
	await expect(page.locator('[data-testid="construction-state"] svg')).toHaveAttribute(
		'data-stage',
		'unmet'
	);
	await expect(page.getByTestId('construction-state')).toContainText(
		'You have not met this pattern yet'
	);
	await expect(page.getByTestId('construction-lesson')).toContainText('13.');

	// The index tells the same truth: nothing owned, everything still coming.
	await page.goto('/wiki/constructions');
	await expect(page.getByTestId('constructions-owned')).toContainText('Nothing has been earned yet');
	await expect(page.getByTestId('constructions-coming')).toContainText('not yet met');
	await expect(page.getByTestId('construction-card-fr.avec-plaisir')).toBeVisible();
});

test('the index moves a met pattern out of "still coming" into what you own', async ({ page }) => {
	await onboard(page);
	await seedExposure(page, 'fr.je-voudrais');

	await page.goto('/wiki/constructions');
	const owned = page.getByTestId('construction-group-exposed');
	await expect(owned).toBeVisible();
	await expect(owned.getByTestId('construction-card-fr.je-voudrais')).toBeVisible();
	await expect(
		page.getByTestId('constructions-coming').getByTestId('construction-card-fr.je-voudrais')
	).toHaveCount(0);
});
