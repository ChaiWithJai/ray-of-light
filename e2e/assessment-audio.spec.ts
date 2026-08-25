import { expect, test, type Page } from '@playwright/test';

/**
 * Incident (2026-08-25): "Play the sample" on the entry assessment was
 * visibly present, correctly enabled (audio.pending was false — the
 * recording genuinely exists), yet clicking it did nothing. Root cause:
 * the button had no onclick and no LessonPlayer at all — a component-
 * wiring gap present since the very first wiring commit (02924ca) and
 * silently carried through every later redesign because no test ever
 * asserted playback here. Not a `pending`/audio-inventory problem.
 *
 * This guards the fix: clicking the button must actually invoke playback
 * of the assessment's specific sample line.
 */

async function installAudioProbe(page: Page) {
	await page.addInitScript(() => {
		const calls: Array<{ src: string; currentTime: number }> = [];
		Object.defineProperty(window, '__linePlayCalls', { value: calls, configurable: true });
		HTMLMediaElement.prototype.play = function () {
			calls.push({ src: this.currentSrc || this.src, currentTime: this.currentTime });
			// LessonPlayer's `playing` state is driven by the element's real
			// `play` event, not the call itself — dispatch it so components
			// reacting to that state behave as they would with real audio.
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

test('the assessment Play button actually plays the sample line', async ({ page }) => {
	await installAudioProbe(page);
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await expect(page.getByText("Let's find your starting point")).toBeVisible();

	const play = page.getByRole('button', { name: 'Play the sample' });
	await expect(play).toBeVisible();
	await expect(play).toBeEnabled();

	expect(await playCalls(page)).toHaveLength(0);
	await play.click();

	const calls = await playCalls(page);
	expect(calls).toHaveLength(1);
	expect(calls[0].src).toContain('/audio/fr/fr-01.mp3');

	// The button reflects the transport state it now actually drives.
	await expect(page.getByRole('button', { name: 'Pause the sample' })).toBeVisible();
});
