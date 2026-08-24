import { expect, test, type Page } from '@playwright/test';

/**
 * The learner's notebook (#48, Phase H0): the desktop aside captures a note
 * during a session, the notebook view collects it, and it survives a reload
 * (IndexedDB). On mobile there is no aside column, so the same notes surface
 * opens as a session overlay and closes back to the exercise.
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

test('a note captured in the session aside lands in the notebook and survives a reload', async ({
	page
}) => {
	await onboard(page);
	await authorizeTransferStep(page);

	// The desktop aside carries the notebook alongside the step map.
	const aside = page.locator('aside').getByTestId('lesson-notes');
	await expect(aside).toBeVisible();
	await aside.getByTestId('note-input').fill('voudrais feels softer than veux');
	await aside.getByTestId('note-save').click();
	await expect(aside.getByTestId('note-list')).toContainText('voudrais feels softer than veux');

	// The notebook view is reachable from the aside — not from the nav. Note
	// bodies render as edit-in-place textareas, so assert their values.
	const notebookNote = () => page.getByTestId('notebook-list').getByLabel('Edit note');
	await aside.getByTestId('open-notebook').click();
	await expect(page).toHaveURL(/\/notebook/);
	await expect(notebookNote()).toHaveValue('voudrais feels softer than veux');
	await expect(page.getByTestId('notebook-list')).toContainText('Au café');

	// Reload: the note comes back from IndexedDB.
	await page.reload();
	await expect(notebookNote()).toHaveValue('voudrais feels softer than veux');

	// And the notebook is also reachable from Settings.
	await page.goto('/settings');
	await page.getByRole('link', { name: 'Open your notebook' }).click();
	await expect(page).toHaveURL(/\/notebook/);
	await expect(notebookNote()).toHaveValue('voudrais feels softer than veux');
});

test.describe('mobile', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test('the session notes overlay opens, captures, and closes back to the exercise', async ({
		page
	}) => {
		await onboard(page);
		await authorizeTransferStep(page);

		// No aside column on mobile — the lightweight affordance opens an overlay.
		await page.getByTestId('notes-link').click();
		const sheet = page.getByTestId('notes-sheet');
		await expect(sheet).toBeVisible();
		await expect(page).toHaveURL(/\/learn\/fr-01\/transfer/);

		await sheet.getByTestId('note-input').fill('practice this one out loud');
		await sheet.getByTestId('note-save').click();
		await expect(sheet.getByTestId('note-list')).toContainText('practice this one out loud');

		await sheet.getByTestId('notes-sheet-close').click();
		await expect(sheet).toHaveCount(0);
		await expect(page).toHaveURL(/\/learn\/fr-01\/transfer/);
		await expect(page.getByLabel('Your new sentence')).toBeVisible();
	});
});
