import { expect, test, type Page } from '@playwright/test';

/**
 * AC 5 (issue #1): "At least one previously encountered construction is
 * retrieved from English after a delay."
 *
 * This walks the real product across the two-wave lag. Per POC_WAVE_CONFIG the
 * active wave opens when the passive wave reaches lesson 4 and trails it by 3
 * lessons — so the learner must genuinely complete daily sessions 1–3 before
 * Today first pairs a recall lesson (lesson 1) with the new one (lesson 4).
 *
 * Every lesson below is completed through its real routes and the buttons the
 * product itself offers (the preview step's own "Skip ahead" fast path, the
 * same one flow.spec.ts uses). No profile state is fabricated for fr-01, the
 * lesson whose delayed retrieval is asserted: its completion, the day it was
 * assigned, and the recall evidence all come out of walking the app. Day
 * boundaries are crossed with the suite's established rollover idiom (shifting
 * the frozen daily-assignment keys back one day, as session-guards.spec.ts
 * does), which never touches lesson-completion or evidence state.
 */

const STORAGE_KEY = 'ray-of-light.profile.v1';

async function onboard(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
}

/** Per-lesson interactions for the exercise steps that need real answers. */
const LESSON_SCRIPTS: Record<
	string,
	{ comprehension: RegExp[]; completion: string; translate: string; transfer: string }
> = {
	'fr-01': {
		comprehension: [/I would like a coffee, please/, /drink it there or take it away/],
		completion: 'Bonjour',
		translate: "It's very good.",
		transfer: "Je voudrais un croissant, s'il vous plaît."
	},
	'fr-02': {
		comprehension: [/Do you have a quiet room\?/],
		completion: 'réserver',
		translate: 'I would like to book a room.',
		transfer: 'Je voudrais réserver une table pour quatre personnes.'
	},
	'fr-03': {
		comprehension: [/Anything else\?/, /7\.50 euros/],
		completion: 'de',
		translate: 'I would like a kilo of tomatoes.',
		transfer: 'Je voudrais deux cents grammes de comté.'
	}
};

/**
 * Complete one full daily session through the real learn flow:
 * preview → spread → comprehension → shadow → translate → completion →
 * transfer → closure, ending back on Today.
 */
async function completeDailySession(page: Page, lessonId: string) {
	const script = LESSON_SCRIPTS[lessonId];
	await page.goto('/today');
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await expect(page).toHaveURL(new RegExp(`/learn/${lessonId}/preview`));

	// The product's own fast path past the two mandatory listens.
	await page.getByRole('button', { name: /listened twice|Skip ahead/ }).click();

	await expect(page).toHaveURL(/\/spread/);
	await page.getByRole('button', { name: /read the spread/ }).click();

	await expect(page).toHaveURL(/\/comprehension/);
	for (const answer of script.comprehension) {
		await page.getByRole('button', { name: answer }).first().click();
		await page.getByRole('button', { name: /Next|Continue/ }).click();
	}

	await expect(page).toHaveURL(/\/shadow/);
	await page.getByRole('button', { name: 'Continue' }).click();

	await expect(page).toHaveURL(/\/translate/);
	await page.getByLabel('Your English translation').fill(script.translate);
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByTestId('reveal')).toBeVisible();
	await page.getByRole('button', { name: 'Continue' }).click();

	await expect(page).toHaveURL(/\/completion/);
	await page.getByRole('button', { name: script.completion, exact: true }).click();
	await page.getByRole('button', { name: 'Continue' }).click();

	await expect(page).toHaveURL(/\/transfer/);
	await page.getByLabel('Your new sentence').fill(script.transfer);
	await page.getByRole('button', { name: 'Check' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();

	await expect(page).toHaveURL(/\/closure/);
	await page.getByRole('button', { name: 'Done for today' }).click();
	await expect(page).toHaveURL(/\/today/);
}

/**
 * Cross a local-day boundary the way the rest of the suite does: shift the
 * frozen daily-assignment history back one day and reload, so Today prepares
 * a fresh assignment. Completed lessons and evidence are untouched.
 */
async function rollToNextDay(page: Page) {
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const shifted: Record<string, Record<string, unknown>> = {};
		for (const [day, assignment] of Object.entries(stored.dailyAssignments.fr) as [
			string,
			Record<string, unknown>
		][]) {
			const date = new Date(`${day}T12:00:00`);
			date.setDate(date.getDate() - 1);
			const previous = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
			shifted[previous] = { ...assignment, day: previous };
		}
		stored.dailyAssignments.fr = shifted;
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
}

test('AC5: a construction met lessons earlier is produced from English once the active wave opens', async ({
	page
}) => {
	// Three full real daily sessions plus the recall session, with build slack.
	test.setTimeout(300_000);
	await onboard(page);

	// Passive wave: complete sessions 1–3 for real. While the passive wave has
	// not reached POC_WAVE_CONFIG.activeWaveStartsAtLesson (4), Today must not
	// offer any recall — the retrieval only exists after the lag.
	for (const lessonId of ['fr-01', 'fr-02', 'fr-03']) {
		await completeDailySession(page, lessonId);
		await expect(page.getByText("Today's session complete")).toBeVisible();
		await expect(page.getByRole('button', { name: 'Start recall' })).toHaveCount(0);
		await rollToNextDay(page);
	}

	// The wave lag has elapsed: Today pairs the new lesson (4) with the recall
	// of lesson 1 — activeWaveStartsAtLesson 4, lag 3, so 4 − 3 = 1.
	await expect(page.getByText(/Lesson 4 ·/)).toBeVisible();
	const recallCard = page
		.locator('[data-slot="card"]')
		.filter({ hasText: /Lesson 1 ·/ })
		.filter({ hasText: 'Au café' });
	await expect(recallCard).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start recall' })).toBeVisible();

	// The delay is real: fr-01 was completed as the new lesson of an EARLIER
	// day, and only that history (never a synthetic write) produced this recall.
	const history = await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const assignments = Object.values(stored.dailyAssignments.fr) as {
			day: string;
			newLessonId: string | null;
			recallLessonId: string | null;
		}[];
		return { completed: stored.completedLessons.fr as string[], assignments };
	}, STORAGE_KEY);
	expect(history.completed).toEqual(['fr-01', 'fr-02', 'fr-03']);
	const learnedOn = history.assignments.find((a) => a.newLessonId === 'fr-01')?.day;
	const recalledOn = history.assignments.find((a) => a.recallLessonId === 'fr-01')?.day;
	expect(learnedOn).toBeTruthy();
	expect(recalledOn).toBeTruthy();
	expect(learnedOn! < recalledOn!).toBe(true);

	// The recall step presents English and demands production of the target:
	// the prompt is English, the canonical French line is nowhere on the page,
	// and comparison is unavailable until an attempt exists.
	await page.getByRole('button', { name: 'Start recall' }).click();
	await expect(page).toHaveURL(/\/recall\/fr-01\/recall/);
	const canonical = "Je voudrais un café, s'il vous plaît.";
	await expect(page.getByText('Say it in French: "I would like a coffee, please."')).toBeVisible();
	await expect(page.getByText(canonical, { exact: true })).toHaveCount(0);
	const compare = page.getByRole('button', { name: /Compare with the original line/ });
	await expect(compare).toBeDisabled();

	// A correct unhinted attempt, made before any reveal.
	await page.getByLabel('Your production').fill(canonical);
	await compare.click();
	await expect(page).toHaveURL(/\/recall\/fr-01\/compare/);

	// The attempt records recall evidence for the construction introduced in
	// the earlier lesson — read exactly as recall-evidence.spec.ts reads it.
	const recallEvidence = await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		return (
			stored.evidence as {
				kind: string;
				constructionId: string;
				lessonId: string;
				hinted: boolean;
			}[]
		).filter((event) => event.kind === 'recall-correct');
	}, STORAGE_KEY);
	expect(recallEvidence).toEqual([
		expect.objectContaining({
			kind: 'recall-correct',
			constructionId: 'fr.je-voudrais',
			lessonId: 'fr-01',
			hinted: false
		})
	]);

	// Finish the recall session through its real remaining steps; Today keeps
	// the paired new lesson and no longer offers the consumed recall.
	await page.getByRole('button', { name: 'Show the original line' }).click();
	await expect(page.getByText('That matches the original line.')).toBeVisible();
	await page.getByRole('button', { name: /Say the corrected line/ }).click();
	await expect(page).toHaveURL(/\/recall\/fr-01\/closure/);
	await page.getByRole('button', { name: 'Done for today' }).click();
	await expect(page).toHaveURL(/\/today/);
	await expect(page.getByText(/Lesson 4 ·/)).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start recall' })).toHaveCount(0);
});
