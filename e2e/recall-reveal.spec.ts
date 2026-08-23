import { expect, test, type Page } from '@playwright/test';

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
}

async function startRecall(page: Page, lessonId: string) {
	await page.evaluate(() => {
		const key = 'ray-of-light.profile.v1';
		const current = JSON.parse(localStorage.getItem(key)!);
		current.completedLessons.fr = ['fr-01', 'fr-02', 'fr-03'];
		current.completedRecallLessons.fr = [];
		current.dailyAssignments.fr = {};
		current.activeSession = null;
		localStorage.setItem(key, JSON.stringify(current));
	});
	await page.goto('/today');
	await page.getByRole('button', { name: 'Start recall' }).click();
	await expect(page).toHaveURL(new RegExp(`/recall/${lessonId}/recall`));
}

async function persistedEvidence(page: Page) {
	return page.evaluate(() => {
		const raw = localStorage.getItem('ray-of-light.profile.v1');
		if (!raw) return [];
		return JSON.parse(raw).evidence as Array<{
			kind: string;
			constructionId: string;
			hinted: boolean;
		}>;
	});
}

test('recall reveal requires a nonblank attempt and cannot forge progress', async ({ page }) => {
	await onboard(page);
	await startRecall(page, 'fr-01');

	const reveal = page.getByRole('button', { name: 'reveal', exact: true });
	const canonical = "Je voudrais un café, s'il vous plaît.";
	await expect(reveal).toBeDisabled();
	await expect(page.getByText(canonical, { exact: true })).toHaveCount(0);

	await page.getByLabel('Your production').fill('   ');
	await expect(reveal).toBeDisabled();
	await reveal.evaluate((button) =>
		button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
	);
	await expect(page.getByText(canonical, { exact: true })).toHaveCount(0);
	await expect(await persistedEvidence(page)).toEqual([]);
	await page.evaluate(() => {
		const key = 'ray-of-light.profile.v1';
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.activeSession.recallDraft = {
			...stored.activeSession.recallDraft,
			text: '   ',
			hinted: true,
			revealed: true
		};
		localStorage.setItem(key, JSON.stringify(stored));
	});
	await page.reload();
	await expect(reveal).toBeDisabled();
	await expect(page.getByText(canonical, { exact: true })).toHaveCount(0);

	await page.getByLabel('Your production').fill(canonical);
	await expect(reveal).toBeEnabled();
	await reveal.click();
	await expect(page.getByText(canonical, { exact: true })).toBeVisible();
	await expect(page.getByText(/Hint used — this line won't count as recalled/)).toBeVisible();
	await expect(await persistedEvidence(page)).toEqual([]);

	await page.getByRole('button', { name: /Compare with the canonical line/ }).click();
	const evidence = await persistedEvidence(page);
	expect(evidence).toHaveLength(1);
	expect(evidence.every((event) => event.kind === 'recall-correct' && event.hinted)).toBe(true);

	await page.goto('/progress');
	await expect(page.getByText('je voudrais + noun')).toHaveCount(0);
});
