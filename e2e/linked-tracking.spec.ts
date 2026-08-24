import { expect, test, type CDPSession, type Page } from '@playwright/test';
import audioOffsets from '../src/lib/content/audio-offsets.json' with { type: 'json' };

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
}

async function authorizeLearnSpread(page: Page) {
	await page.evaluate(() => {
		const key = 'ray-of-light.profile.v1';
		const stored = JSON.parse(localStorage.getItem(key)!);
		const assignmentDay = Object.keys(stored.dailyAssignments.fr)[0];
		stored.activeSession = {
			id: 'linked-tracking-learn',
			mode: 'learn',
			origin: 'today',
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
			currentStep: 'spread',
			completedSteps: ['preview'],
			assignmentDay,
			startedAt: Date.now(),
			updatedAt: Date.now()
		};
		localStorage.setItem(key, JSON.stringify(stored));
	});
	await page.goto('/learn/fr-01/spread');
	await expect(page).toHaveURL(/\/learn\/fr-01\/spread/);
}

async function authorizeRecall(page: Page) {
	await page.evaluate(() => {
		const key = 'ray-of-light.profile.v1';
		const stored = JSON.parse(localStorage.getItem(key)!);
		const assignmentDay = Object.keys(stored.dailyAssignments.fr)[0];
		stored.completedLessons.fr = ['fr-01', 'fr-02', 'fr-03'];
		stored.completedRecallLessons.fr = [];
		stored.dailyAssignments.fr[assignmentDay] = {
			day: assignmentDay,
			newLessonId: 'fr-04',
			recallLessonId: 'fr-01',
			completedModes: []
		};
		stored.activeSession = {
			id: 'linked-tracking-recall',
			mode: 'recall',
			origin: 'today',
			language: 'fr',
			lessonId: 'fr-01',
			flow: ['recall', 'compare', 'closure'],
			currentStep: 'recall',
			completedSteps: [],
			assignmentDay,
			startedAt: Date.now(),
			updatedAt: Date.now()
		};
		localStorage.setItem(key, JSON.stringify(stored));
	});
	await page.goto('/recall/fr-01/recall');
	await expect(page).toHaveURL(/\/recall\/fr-01\/recall/);
}

async function installAudioProbe(page: Page) {
	await page.addInitScript(() => {
		const calls: Array<{ src: string; currentTime: number }> = [];
		Object.defineProperty(window, '__linePlayCalls', {
			value: calls,
			configurable: true
		});
		HTMLMediaElement.prototype.play = function () {
			calls.push({
				src: this.currentSrc || this.src,
				currentTime: this.currentTime
			});
			return Promise.resolve();
		};
		HTMLMediaElement.prototype.pause = function () {};
	});
}

async function playCalls(page: Page) {
	return page.evaluate(
		() =>
			(
				window as typeof window & {
					__linePlayCalls: Array<{ src: string; currentTime: number }>;
				}
			).__linePlayCalls
	);
}

async function evidenceCount(page: Page) {
	return page.evaluate(() => {
		const stored = JSON.parse(localStorage.getItem('ray-of-light.profile.v1')!);
		return stored.evidence.length as number;
	});
}

async function enableTouch(page: Page): Promise<CDPSession> {
	const cdp = await page.context().newCDPSession(page);
	await cdp.send('Emulation.setTouchEmulationEnabled', {
		enabled: true,
		maxTouchPoints: 2
	});
	return cdp;
}

type TouchPoint = {
	x: number;
	y: number;
	id: number;
	radiusX: number;
	radiusY: number;
	force: number;
};

function touch(x: number, y: number, id: number): TouchPoint {
	return { x, y, id, radiusX: 8, radiusY: 8, force: 1 };
}

async function dispatchTouches(
	cdp: CDPSession,
	type: 'touchStart' | 'touchMove' | 'touchEnd' | 'touchCancel',
	touchPoints: TouchPoint[]
) {
	await cdp.send('Input.dispatchTouchEvent', { type, touchPoints });
}

test('keyboard movement activates aligned pairs and sentence audio', async ({ page }) => {
	await installAudioProbe(page);
	await onboard(page);
	await authorizeLearnSpread(page);

	const spread = page.getByRole('listbox');
	await spread.focus();
	await page.keyboard.press('ArrowDown');
	await expect(page.getByRole('option', { selected: true })).toContainText('Vous désirez');

	let calls = await playCalls(page);
	expect(calls).toHaveLength(1);
	expect(calls[0].src).toContain('/audio/fr/fr-01.mp3');
	expect(calls[0].currentTime).toBeGreaterThan(0);

	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('Enter');
	calls = await playCalls(page);
	expect(calls).toHaveLength(3);
	expect(calls[1].currentTime).toBe(0);
	expect(calls[2].currentTime).toBe(0);
});

test('covered support stays covered in the accessible name', async ({ page }) => {
	await onboard(page);
	await authorizeLearnSpread(page);
	await page.getByRole('button', { name: 'cover EN' }).click();
	const readingLabel = await page.getByRole('option').first().getAttribute('aria-label');
	expect(readingLabel).toContain('Bonjour');
	expect(readingLabel).toContain('English covered');
	expect(readingLabel).not.toContain('Good morning');

	await authorizeRecall(page);
	const retrievalLabel = await page.getByRole('option').first().getAttribute('aria-label');
	expect(retrievalLabel).toContain('target language covered');
	expect(retrievalLabel).toContain('Good morning');
	expect(retrievalLabel).not.toContain('Bonjour');
});

test('a one-finger page scroll does not play audio or record a new line', async ({ page }) => {
	await installAudioProbe(page);
	await page.setViewportSize({ width: 390, height: 360 });
	await onboard(page);
	const cdp = await enableTouch(page);
	await authorizeLearnSpread(page);

	const spread = page.getByRole('listbox');
	await expect(spread).toHaveCSS('touch-action', 'pan-y');
	const option = await page.getByRole('option').nth(3).boundingBox();
	expect(option).toBeTruthy();
	if (!option) return;

	const callsBefore = (await playCalls(page)).length;
	const evidenceBefore = await evidenceCount(page);
	const startX = option.x + option.width / 2;
	const startY = option.y + option.height / 2;
	await dispatchTouches(cdp, 'touchStart', [touch(startX, startY, 1)]);
	await dispatchTouches(cdp, 'touchMove', [touch(startX, startY - 160, 1)]);
	await dispatchTouches(cdp, 'touchEnd', []);
	await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
	expect((await playCalls(page)).length).toBe(callsBefore);
	expect(await evidenceCount(page)).toBe(evidenceBefore);
});

test('two real touch contacts preview, then commit from dedicated handles', async ({ page }) => {
	await installAudioProbe(page);
	await page.setViewportSize({ width: 390, height: 844 });
	await onboard(page);
	await page.evaluate(() => {
		const key = 'ray-of-light.profile.v1';
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.settings.trackingMode = 'two-finger';
		localStorage.setItem(key, JSON.stringify(stored));
	});
	const cdp = await enableTouch(page);
	await authorizeLearnSpread(page);

	const spread = page.getByRole('listbox');
	await expect(page.getByText(/drag either side/)).toBeVisible();
	await expect(spread).toHaveCSS('touch-action', 'pan-y');
	const targetHandle = page.locator('[data-tracking-handle][data-side="target"]').first();
	const sourceHandle = page.locator('[data-tracking-handle][data-side="source"]').nth(1);
	await expect(targetHandle).toHaveCSS('touch-action', 'none');
	await expect(sourceHandle).toHaveCSS('touch-action', 'none');

	const options = page.getByRole('option');
	const firstHandle = await targetHandle.boundingBox();
	const secondHandle = await sourceHandle.boundingBox();
	const third = await options.nth(2).boundingBox();
	const fourth = await options.nth(3).boundingBox();
	expect(firstHandle && secondHandle && third && fourth).toBeTruthy();
	if (!firstHandle || !secondHandle || !third || !fourth) return;

	const first = touch(
		firstHandle.x + firstHandle.width / 2,
		firstHandle.y + firstHandle.height / 2,
		11
	);
	const second = touch(
		secondHandle.x + secondHandle.width / 2,
		secondHandle.y + secondHandle.height / 2,
		22
	);
	const callsBefore = (await playCalls(page)).length;
	const evidenceBefore = await evidenceCount(page);
	await dispatchTouches(cdp, 'touchStart', [first, second]);
	await expect(page.getByRole('option', { selected: true })).toContainText('Vous désirez');

	const movedFirst = touch(third.x + third.width * 0.25, third.y + third.height / 2, 11);
	await dispatchTouches(cdp, 'touchMove', [movedFirst, second]);
	await expect(page.getByRole('option', { selected: true })).toContainText('Je voudrais un café');

	const movedSecond = touch(fourth.x + fourth.width * 0.75, fourth.y + fourth.height / 2, 22);
	await dispatchTouches(cdp, 'touchMove', [movedFirst, movedSecond]);
	await expect(page.getByRole('option', { selected: true })).toContainText('Un café. Et avec ceci');
	expect((await playCalls(page)).length).toBe(callsBefore);
	expect(await evidenceCount(page)).toBe(evidenceBefore);

	await dispatchTouches(cdp, 'touchEnd', []);
	await expect.poll(async () => (await playCalls(page)).length).toBe(callsBefore + 1);
	// The final row has no construction. If the intermediate row were committed,
	// it would append evidence for `je voudrais`; a gesture-level commit appends none.
	await expect.poll(() => evidenceCount(page)).toBe(evidenceBefore);
	const committedCalls = await playCalls(page);
	const expectedStart = audioOffsets['fr-01'][3].startMs / 1000;
	expect(committedCalls.at(-1)?.currentTime).toBeCloseTo(expectedStart, 2);

	// Staggered lifts are still one linked gesture: the first released contact
	// must not commit an intermediate row while the second remains down.
	const callsAfterFirstGesture = committedCalls.length;
	await dispatchTouches(cdp, 'touchStart', [first, second]);
	await dispatchTouches(cdp, 'touchMove', [movedFirst, second]);
	await dispatchTouches(cdp, 'touchMove', [movedFirst, movedSecond]);
	await dispatchTouches(cdp, 'touchEnd', [movedSecond]);
	expect((await playCalls(page)).length).toBe(callsAfterFirstGesture);
	await dispatchTouches(cdp, 'touchEnd', []);
	await expect.poll(async () => (await playCalls(page)).length).toBe(callsAfterFirstGesture + 1);
	expect(await evidenceCount(page)).toBe(evidenceBefore);
});

test('an outside mouse release aborts the drag without audio or evidence', async ({ page }) => {
	await installAudioProbe(page);
	await onboard(page);
	await authorizeLearnSpread(page);
	const spread = page.getByRole('listbox');
	const second = await page.getByRole('option').nth(1).boundingBox();
	const box = await spread.boundingBox();
	expect(second && box).toBeTruthy();
	if (!second || !box) return;

	const callsBefore = (await playCalls(page)).length;
	const evidenceBefore = await evidenceCount(page);
	await page.mouse.move(second.x + second.width / 2, second.y + second.height / 2);
	await page.mouse.down();
	await page.mouse.move(box.x - 20, box.y - 20);
	await page.mouse.up();

	expect((await playCalls(page)).length).toBe(callsBefore);
	expect(await evidenceCount(page)).toBe(evidenceBefore);
	await expect(page.getByRole('option', { selected: true })).toContainText('Bonjour');
});

test('line activation requests the real lesson asset', async ({ page }) => {
	await onboard(page);
	await authorizeLearnSpread(page);
	const response = page.waitForResponse(
		(candidate) => candidate.url().includes('/audio/fr/fr-01.mp3') && candidate.ok()
	);
	await page.getByRole('option').nth(1).click();
	await response;
});

test('rejected line playback is reported without an unhandled error', async ({ page }) => {
	await page.addInitScript(() => {
		HTMLMediaElement.prototype.play = () =>
			Promise.reject(new DOMException('blocked', 'NotAllowedError'));
		HTMLMediaElement.prototype.pause = function () {};
	});
	const pageErrors: Error[] = [];
	page.on('pageerror', (error) => pageErrors.push(error));
	await onboard(page);
	await authorizeLearnSpread(page);
	await page.getByRole('option').nth(1).click();
	await expect(page.getByRole('alert')).toContainText('Audio could not play');
	expect(pageErrors).toEqual([]);
});
