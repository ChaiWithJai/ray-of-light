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
	// #34: the free "cover EN" toggle became the ladder's "Hide English" rung.
	await page.getByRole('button', { name: 'Hide English' }).click();
	const readingLabel = await page.getByRole('option').first().getAttribute('aria-label');
	expect(readingLabel).toContain('Bonjour');
	expect(readingLabel).toContain('English covered');
	expect(readingLabel).not.toContain('Good morning');

	// #39: recall now chunks to the prompted line (fr-01's "je voudrais" line),
	// so the single visible item is that pair — covered target, English cue.
	await authorizeRecall(page);
	const retrievalLabel = await page.getByRole('option').first().getAttribute('aria-label');
	expect(retrievalLabel).toContain('target language covered');
	expect(retrievalLabel).toContain('I would like a coffee');
	expect(retrievalLabel).not.toContain('Je voudrais');
});

/*
 * Phone-width contracts (issue #55, mobile-method spike). At phone widths the
 * learn spread renders the stack projection of the same state machine: one
 * pair per viewport, stepped by swipe, thumb rail, keys or audio. These tests
 * re-encode the method contracts the removed two-finger/scroll tests carried,
 * in the stack's interaction grammar:
 *  - linked pair activation: stepping activates both languages of one pair
 *  - anchor→audio coupling: every step re-anchors the line's audio slice (D4)
 *  - stray vertical single-finger motion is inert (no audio, no evidence)
 *  - cover states hold, without reflow, while stepping (C3)
 *  - keyboard driver still works (D5)
 *  - one pointer + assistive tech completes the step (AC 5, issue #1)
 */

const PHONE = { width: 390, height: 844 };

async function railGeometry(page: Page) {
	const rail = page.getByRole('slider', { name: 'Pair position' });
	const box = await rail.boundingBox();
	expect(box).toBeTruthy();
	// Mirrors the rail's 12px end insets: index i sits at inset + track · i/(n-1).
	const xFor = (i: number) => box!.x + 12 + ((box!.width - 24) * i) / 10;
	const y = box!.y + box!.height / 2;
	return { rail, box: box!, xFor, y };
}

test('phone width renders the stack projection: one linked pair, rail below the text', async ({
	page
}) => {
	await page.setViewportSize(PHONE);
	await onboard(page);
	await authorizeLearnSpread(page);

	// One pair per viewport — the compressed two-column grid never renders.
	const options = page.getByRole('option');
	await expect(options).toHaveCount(1);
	await expect(page.getByRole('listbox')).toHaveAccessibleName(/pair stack/i);

	// Linked pair activation: the single active pair carries both languages.
	const label = await options.first().getAttribute('aria-label');
	expect(label).toContain('Bonjour');
	expect(label).toContain('Good morning');

	// The rail is present, in the thumb zone below the text — never over it.
	const { rail, box } = await railGeometry(page);
	await expect(rail).toHaveCSS('touch-action', 'none');
	const pair = await options.first().boundingBox();
	expect(pair).toBeTruthy();
	expect(box.y).toBeGreaterThanOrEqual(pair!.y + pair!.height);

	// The audio-led auto driver stays the default, zero-gesture path.
	await expect(page.getByRole('button', { name: /listen/ })).toBeVisible();
});

test('thumb rail press-hold-slide steps pair to pair and re-anchors audio', async ({ page }) => {
	await installAudioProbe(page);
	await page.setViewportSize(PHONE);
	await onboard(page);
	const cdp = await enableTouch(page);
	await authorizeLearnSpread(page);

	const { xFor, y } = await railGeometry(page);
	const callsBefore = (await playCalls(page)).length;
	const evidenceBefore = await evidenceCount(page);

	// Press-and-hold on the current position engages without replaying.
	await dispatchTouches(cdp, 'touchStart', [touch(xFor(0), y, 1)]);
	await expect(page.getByRole('option', { selected: true })).toContainText('Bonjour');
	expect((await playCalls(page)).length).toBe(callsBefore);

	// Each slide step is a commit: the pair and its audio slice move together
	// (anchor→audio coupling is synchronous — well inside the 150 ms budget).
	await dispatchTouches(cdp, 'touchMove', [touch(xFor(1), y, 1)]);
	await expect(page.getByRole('option', { selected: true })).toContainText('Vous désirez');
	let calls = await playCalls(page);
	expect(calls.length).toBe(callsBefore + 1);
	expect(calls.at(-1)?.currentTime).toBeCloseTo(audioOffsets['fr-01'][1].startMs / 1000, 2);

	await dispatchTouches(cdp, 'touchMove', [touch(xFor(2), y, 1)]);
	await expect(page.getByRole('option', { selected: true })).toContainText('Je voudrais un café');
	await dispatchTouches(cdp, 'touchMove', [touch(xFor(3), y, 1)]);
	await expect(page.getByRole('option', { selected: true })).toContainText('Un café. Et avec ceci');
	calls = await playCalls(page);
	expect(calls.length).toBe(callsBefore + 3);
	expect(calls.at(-1)?.currentTime).toBeCloseTo(audioOffsets['fr-01'][3].startMs / 1000, 2);

	// Release stays put: no extra activation, no extra audio.
	await dispatchTouches(cdp, 'touchEnd', []);
	await expect(page.getByRole('option', { selected: true })).toContainText('Un café. Et avec ceci');
	expect((await playCalls(page)).length).toBe(callsBefore + 3);

	// Every rail step is a commit, so `parallel-read` exposure is recorded per
	// completed pair (spike §4): exactly one new event — `je voudrais` from the
	// stepped-through line 3; the construction-free lines append none.
	expect(await evidenceCount(page)).toBe(evidenceBefore + 1);
});

test('a one-finger vertical drag on the stack neither steps, plays, nor records', async ({
	page
}) => {
	await installAudioProbe(page);
	await page.setViewportSize(PHONE);
	await onboard(page);
	const cdp = await enableTouch(page);
	await authorizeLearnSpread(page);

	const pair = await page.getByRole('option').first().boundingBox();
	expect(pair).toBeTruthy();
	if (!pair) return;
	const x = pair.x + pair.width / 2;
	const yMid = pair.y + pair.height / 2;

	const callsBefore = (await playCalls(page)).length;
	const evidenceBefore = await evidenceCount(page);

	// Vertical motion is reserved for the page — it must not read as tracking.
	await dispatchTouches(cdp, 'touchStart', [touch(x, yMid, 1)]);
	await dispatchTouches(cdp, 'touchMove', [touch(x, yMid - 160, 1)]);
	await dispatchTouches(cdp, 'touchEnd', []);
	await expect(page.getByRole('option', { selected: true })).toContainText('Bonjour');
	expect((await playCalls(page)).length).toBe(callsBefore);
	expect(await evidenceCount(page)).toBe(evidenceBefore);

	// A horizontal swipe is the sequential step: next pair, audio follows.
	// (The vertical drag scrolled the page — settle back and re-measure.)
	await page.evaluate(() => window.scrollTo(0, 0));
	const settled = await page.getByRole('option').first().boundingBox();
	expect(settled).toBeTruthy();
	if (!settled) return;
	const sx = settled.x + settled.width / 2;
	const sy = settled.y + settled.height / 2;
	await dispatchTouches(cdp, 'touchStart', [touch(sx + 100, sy, 1)]);
	await dispatchTouches(cdp, 'touchMove', [touch(sx - 100, sy, 1)]);
	await dispatchTouches(cdp, 'touchEnd', []);
	await expect(page.getByRole('option', { selected: true })).toContainText('Vous désirez');
	await expect.poll(async () => (await playCalls(page)).length).toBe(callsBefore + 1);
});

test('cover states hold while stepping the stack', async ({ page }) => {
	await page.setViewportSize(PHONE);
	await onboard(page);
	await authorizeLearnSpread(page);

	// #34: the ladder's "Hide English" rung, unchanged in the stack projection.
	await page.getByRole('button', { name: 'Hide English' }).click();
	const option = page.getByRole('option');
	let label = await option.first().getAttribute('aria-label');
	expect(label).toContain('Bonjour');
	expect(label).toContain('English covered');
	expect(label).not.toContain('Good morning');

	// Stepping must not reset the rung: the cover travels with the anchor (C3).
	await page.getByRole('button', { name: 'Next pair' }).click();
	label = await option.first().getAttribute('aria-label');
	expect(label).toContain('Vous désirez');
	expect(label).toContain('English covered');
	expect(label).not.toContain('What would you like');

	await page.getByRole('button', { name: 'Previous pair' }).click();
	label = await option.first().getAttribute('aria-label');
	expect(label).toContain('Bonjour');
	expect(label).toContain('English covered');
});

test('keyboard drives the stack: listbox arrows and the rail slider', async ({ page }) => {
	await installAudioProbe(page);
	await page.setViewportSize(PHONE);
	await onboard(page);
	await authorizeLearnSpread(page);

	// The keyboard driver survives the projection switch (D5).
	await page.getByRole('listbox').focus();
	await page.keyboard.press('ArrowDown');
	await expect(page.getByRole('option', { selected: true })).toContainText('Vous désirez');
	let calls = await playCalls(page);
	expect(calls).toHaveLength(1);
	expect(calls[0].currentTime).toBeCloseTo(audioOffsets['fr-01'][1].startMs / 1000, 2);

	// The rail itself is an accessible slider — the thumb gesture has a
	// first-class assistive-tech equivalent, not just a pointer path.
	const rail = page.getByRole('slider', { name: 'Pair position' });
	await expect(rail).toHaveAttribute('aria-valuetext', 'pair 2 of 11');
	await rail.focus();
	await page.keyboard.press('ArrowRight');
	await expect(page.getByRole('option', { selected: true })).toContainText('Je voudrais un café');
	await expect(rail).toHaveAttribute('aria-valuetext', 'pair 3 of 11');
	await page.keyboard.press('ArrowLeft');
	await expect(page.getByRole('option', { selected: true })).toContainText('Vous désirez');
	calls = await playCalls(page);
	expect(calls).toHaveLength(3);
});

test('the whole spread step completes with one pointer', async ({ page }) => {
	await installAudioProbe(page);
	await page.setViewportSize(PHONE);
	await onboard(page);
	await authorizeLearnSpread(page);

	// AC 5 (issue #1): one pointer, no multitouch, end to end — step through
	// every pair, replay a line, and advance to the next lesson step.
	const next = page.getByRole('button', { name: 'Next pair' });
	for (let i = 1; i < 11; i += 1) {
		await next.click();
	}
	await expect(page.getByRole('option', { selected: true })).toContainText("C'est très bon");
	await expect(next).toBeDisabled();

	// Tap the pair to replay its line (C6: audio belongs to the target line).
	const callsBefore = (await playCalls(page)).length;
	await page.getByRole('option').first().click();
	await expect.poll(async () => (await playCalls(page)).length).toBe(callsBefore + 1);

	await page.getByRole('button', { name: /I've read the spread/ }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/comprehension/);
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
