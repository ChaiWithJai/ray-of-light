import { expect, test, type Page } from '@playwright/test';

/**
 * Same incident class as assessment-audio.spec.ts: the Phrases library's
 * "Play phrase" button rendered enabled but had no onclick and no player at
 * all. Found by sweeping every audio affordance in the product after the
 * assessment fix, not by an existing test — /phrases had none.
 */

const STORAGE_KEY = 'ray-of-light.profile.v1';

async function installAudioProbe(page: Page) {
	await page.addInitScript(() => {
		const calls: Array<{ src: string; currentTime: number }> = [];
		Object.defineProperty(window, '__linePlayCalls', { value: calls, configurable: true });
		HTMLMediaElement.prototype.play = function () {
			calls.push({ src: this.currentSrc || this.src, currentTime: this.currentTime });
			this.dispatchEvent(new Event('play'));
			return Promise.resolve();
		};
		HTMLMediaElement.prototype.pause = function () {
			this.dispatchEvent(new Event('pause'));
		};
	});
}

async function playCalls(page: Page) {
	return page.evaluate(
		() =>
			(window as typeof window & { __linePlayCalls: Array<{ src: string; currentTime: number }> })
				.__linePlayCalls
	);
}

/** One honest parallel-read event — real learner behavior, grants `exposed` —
 *  just enough for the construction to appear in the phrase library. */
async function meetConstruction(page: Page, constructionId: string, lessonId: string) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page).toHaveURL(/\/today/);
	await page.evaluate(
		({ key, constructionId, lessonId }) => {
			const stored = JSON.parse(localStorage.getItem(key)!);
			const day = new Date().toISOString().slice(0, 10);
			stored.evidence.push({
				id: `test-${constructionId}`,
				constructionId,
				language: 'fr',
				kind: 'parallel-read',
				lessonId,
				at: Date.now(),
				day,
				hinted: false
			});
			localStorage.setItem(key, JSON.stringify(stored));
		},
		{ key: STORAGE_KEY, constructionId, lessonId }
	);
}

test('the Phrases "Play phrase" button actually plays the phrase, without selecting the card', async ({
	page
}) => {
	await installAudioProbe(page);
	await meetConstruction(page, 'fr.je-voudrais', 'fr-01');
	await page.goto('/phrases');

	const card = page.getByText('Je voudrais un café').locator('..').locator('..');
	const play = card.getByRole('button', { name: 'Play phrase' });
	await expect(play).toBeVisible();
	await expect(play).toBeEnabled();

	expect(await playCalls(page)).toHaveLength(0);
	await play.click();

	const calls = await playCalls(page);
	expect(calls).toHaveLength(1);
	expect(calls[0].src).toContain('/audio/fr/fr-01.mp3');

	// Playing must not also toggle the card's own selection click-handler.
	await expect(page.getByText(`Rehearse these`)).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Pause phrase' })).toBeVisible();
});
