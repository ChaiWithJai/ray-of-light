/**
 * Critical-path screenshot capture for the error-discovery review session.
 * Walks the real product (no synthetic state except the suite's established
 * day-shift idioms) and screenshots every state a learner actually sees.
 */
import { test, expect, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(import.meta.dirname, '..', 'shots');
mkdirSync(OUT, { recursive: true });
const STORAGE_KEY = 'ray-of-light.profile.v1';

async function shot(page: Page, name: string, project: string) {
	await page.waitForTimeout(350); // settle animations
	await page.screenshot({ path: join(OUT, `${name}.${project}.png`), fullPage: true });
}

const SCRIPTS: Record<string, { comprehension: RegExp[]; completion: string; translate: string; transfer: string }> = {
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

async function completeSession(page: Page, lessonId: string) {
	const s = SCRIPTS[lessonId];
	await page.goto('/today');
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.getByRole('button', { name: /listened twice|Skip ahead/ }).click();
	await page.getByRole('button', { name: /read the spread/ }).click();
	for (const answer of s.comprehension) {
		await page.getByRole('button', { name: answer }).first().click();
		await page.getByRole('button', { name: /Next|Continue/ }).click();
	}
	await page.getByRole('button', { name: 'Continue' }).click(); // shadow
	await page.getByLabel('Your English translation').fill(s.translate);
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByTestId('reveal')).toBeVisible();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: s.completion, exact: true }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByLabel('Your new sentence').fill(s.transfer);
	await page.getByRole('button', { name: 'Check' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Done for today' }).click();
	await expect(page).toHaveURL(/\/today/);
}

async function rollToNextDay(page: Page) {
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		const shifted: Record<string, Record<string, unknown>> = {};
		for (const [day, assignment] of Object.entries(stored.dailyAssignments.fr) as [string, Record<string, unknown>][]) {
			const date = new Date(`${day}T12:00:00`);
			date.setDate(date.getDate() - 1);
			const prev = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
			shifted[prev] = { ...assignment, day: prev };
		}
		stored.dailyAssignments.fr = shifted;
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
}

async function shiftEvidenceBackADay(page: Page) {
	await page.evaluate((key) => {
		const stored = JSON.parse(localStorage.getItem(key)!);
		for (const event of stored.evidence) {
			const date = new Date(`${event.day}T12:00:00`);
			date.setDate(date.getDate() - 1);
			event.day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
		}
		localStorage.setItem(key, JSON.stringify(stored));
	}, STORAGE_KEY);
	await page.reload();
}

test('critical path — French', async ({ page }, testInfo) => {
	const p = testInfo.project.name;

	// Onboarding
	await page.goto('/');
	await shot(page, '01-language', p);
	await page.getByRole('button', { name: 'Start French' }).click();
	await shot(page, '02-assessment', p);
	await page.getByRole('button', { name: 'Continue' }).click();
	await shot(page, '03-plan', p);
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await shot(page, '04-today-fresh', p);

	// Lesson flow, screenshotting each step before advancing
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await shot(page, '05-preview', p);
	await page.getByRole('button', { name: /listened twice|Skip ahead/ }).click();
	await shot(page, '06-spread', p);
	try {
		await page.getByRole('button', { name: 'Hide English' }).click({ timeout: 2000 });
		await shot(page, '07-spread-covered', p);
		await page.getByRole('button', { name: /Hide English|Read both/ }).click({ timeout: 2000 });
	} catch { /* cover control moved — skip state */ }
	await page.getByRole('button', { name: /read the spread/ }).click();
	await shot(page, '08-comprehension', p);
	for (const answer of SCRIPTS['fr-01'].comprehension) {
		await page.getByRole('button', { name: answer }).first().click();
		await page.getByRole('button', { name: /Next|Continue/ }).click();
	}
	await shot(page, '09-shadow', p);
	await page.getByRole('button', { name: 'Continue' }).click();
	await shot(page, '10-translate', p);
	await page.getByLabel('Your English translation').fill(SCRIPTS['fr-01'].translate);
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByTestId('reveal')).toBeVisible();
	await shot(page, '11-translate-revealed', p);
	await page.getByRole('button', { name: 'Continue' }).click();
	await shot(page, '12-completion', p);
	await page.getByRole('button', { name: SCRIPTS['fr-01'].completion, exact: true }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await shot(page, '13-transfer', p);
	await page.getByLabel('Your new sentence').fill(SCRIPTS['fr-01'].transfer);
	await page.getByRole('button', { name: 'Check' }).click();
	await shot(page, '14-transfer-checked', p);
	await page.getByRole('button', { name: 'Continue' }).click();
	await shot(page, '15-closure', p);
	await page.getByRole('button', { name: 'Done for today' }).click();
	await shot(page, '16-today-complete', p);

	// Unlock the active wave: two more real sessions across day rollovers
	await rollToNextDay(page);
	await completeSession(page, 'fr-02');
	await rollToNextDay(page);
	await completeSession(page, 'fr-03');
	await rollToNextDay(page);
	await shot(page, '17-today-recall-paired', p);

	// Recall with a WRONG answer — the miss path is a first-class state
	await page.getByRole('button', { name: /Start recall/ }).click();
	await shot(page, '18-recall', p);
	await page.getByLabel('Your production').fill('Bonjour, monsieur.');
	await shot(page, '19-recall-attempted', p);
	await page.getByRole('button', { name: /Compare with the original line/ }).click();
	await shot(page, '20-compare-miss', p);
	await page.getByRole('button', { name: 'Show the original line' }).click();
	await shot(page, '21-compare-revealed', p);
	await page.getByRole('button', { name: /Say the corrected line/ }).click();
	await page.getByRole('button', { name: 'Done for today' }).click();

	// The miss + a day boundary makes it due for resurfacing
	await shiftEvidenceBackADay(page);
	await page.goto('/today');
	await shot(page, '22-today-resurface', p);

	// Destinations
	await page.goto('/progress');
	await shot(page, '23-progress', p);
	await page.goto('/book');
	await shot(page, '24-book', p);
	await page.goto('/phrases');
	await shot(page, '25-phrases', p);
	await page.goto('/settings');
	await shot(page, '26-settings', p);
});

test('placement path', async ({ page }, testInfo) => {
	const p = testInfo.project.name;
	await page.goto('/');
	await page.getByRole('button', { name: 'Start French' }).click();
	await page.getByRole('button', { name: '"I would like a coffee, please."' }).click();
	await page.getByRole('button', { name: 'Hold to speak' }).click();
	await shot(page, '27-assessment-answered', p);
	await page.getByRole('button', { name: 'Continue' }).click();
	await expect(page.getByText(/places you at lesson 3/)).toBeVisible();
	await shot(page, '28-plan-placed', p);
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await shot(page, '29-today-placed', p);
});

test('Tamil surfaces', async ({ page }, testInfo) => {
	const p = testInfo.project.name;
	await page.goto('/');
	await page.getByRole('button', { name: 'Start Tamil' }).click();
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Set my plan' }).click();
	await shot(page, '30-ta-today', p);
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await page.getByRole('button', { name: /listened twice|Skip ahead/ }).click();
	await shot(page, '31-ta-spread', p);
	try {
		await page.getByRole('button', { name: 'notes' }).click({ timeout: 2000 });
		await shot(page, '32-ta-notes', p);
	} catch { /* notes control moved — skip state */ }
});
