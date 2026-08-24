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
	await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
}

async function authorizeLearnStep(
	page: Page,
	lessonId: string,
	step: string,
	completedSteps: string[],
	language: 'fr' | 'ta' = 'fr'
) {
	await page.evaluate(
		({ lessonId, step, completedSteps, language }) => {
			const key = 'ray-of-light.profile.v1';
			const stored = JSON.parse(localStorage.getItem(key)!);
			const assignmentDay = Object.keys(stored.dailyAssignments[language])[0];
			stored.activeSession = {
				id: `test-learn-${lessonId}`,
				mode: 'learn',
				language,
				lessonId,
				flow: ['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion', 'transfer', 'closure'],
				currentStep: step,
				completedSteps,
				origin: 'today',
				assignmentDay,
				startedAt: Date.now(),
				updatedAt: Date.now()
			};
			localStorage.setItem(key, JSON.stringify(stored));
		},
		{ lessonId, step, completedSteps, language }
	);
	await page.goto(`/learn/${lessonId}/${step}`);
}

async function evidenceFor(page: Page, constructionId: string) {
	return page.evaluate((id) => {
		const raw = localStorage.getItem('ray-of-light.profile.v1');
		if (!raw) return [];
		const profile = JSON.parse(raw) as {
			evidence: { id: string; constructionId: string; kind: string }[];
		};
		return profile.evidence.filter((event) => event.constructionId === id);
	}, constructionId);
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

	// Comprehension — the ported corpus gave lesson 1 a second check (#8);
	// answer each in turn before the flow advances.
	await expect(page).toHaveURL(/\/comprehension/);
	await page.getByRole('button', { name: /I would like a coffee/ }).first().click();
	await page.getByRole('button', { name: /Next|Continue/ }).click();
	await page.getByRole('button', { name: /drink it there or take it away/ }).first().click();
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
	await expect(page.getByText("Today's session complete")).toBeVisible();
});

test('AC3: the spread is trackable by keyboard alone', async ({ page }) => {
	await onboard(page);
	await authorizeLearnStep(page, 'fr-01', 'spread', ['preview']);

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
	await authorizeLearnStep(page, 'fr-01', 'spread', ['preview']);

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
	await authorizeLearnStep(page, 'fr-01', 'translate', [
		'preview',
		'spread',
		'comprehension',
		'shadow'
	]);

	// Nothing revealed, and Check is unavailable with an empty answer.
	await expect(page.getByTestId('reveal')).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Check' })).toBeDisabled();

	await page.getByLabel('Your English translation').fill('anything at all');
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByTestId('reveal')).toBeVisible();
});

test('AC9: Tamil shows script, transliteration and both glosses', async ({ page }) => {
	await onboard(page, 'Tamil');
	await authorizeLearnStep(page, 'ta-01', 'spread', ['preview'], 'ta');

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
	await authorizeLearnStep(page, 'fr-01', 'spread', ['preview']);
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
	await authorizeLearnStep(page, 'fr-01', 'spread', ['preview']);
	await expect(page.getByText('Bonjour, monsieur.')).toBeVisible();

	// The page itself must not scroll sideways at phone width.
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	expect(overflow).toBeLessThanOrEqual(1);
});

test('#19 disclosure: Settings carries the synthesized-audio provenance and evidence honesty', async ({ page }) => {
	// Design R1 #41 relocated both disclosures out of the learner flow; the
	// obligation itself stands, so it is asserted here at its new altitude.
	await onboard(page);
	await page.goto('/settings');
	await expect(page.getByText('About the audio')).toBeVisible();
	await expect(page.getByText(/draft synthesized voice/)).toBeVisible();
	await expect(
		page.getByText(/Matched constructions record recognition evidence only/)
	).toBeVisible();
});

test('AC7 + AC10: a French pattern match records non-transferable evidence', async ({ page }) => {
	await onboard(page);
	await authorizeLearnStep(page, 'fr-01', 'transfer', [
		'preview',
		'spread',
		'comprehension',
		'shadow',
		'translate',
		'completion'
	]);
	await page.getByLabel('Your new sentence').fill("Je voudrais un croissant, s'il vous plaît.");
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(
		page.getByText('Your answer matched the target construction and situation patterns.')
	).toBeVisible();
	// Design R1 #41: the evidence-honesty caveat lives in Settings now, not on
	// the graded result card — the card stays clean.
	await expect(
		page.getByText(/Matched constructions record recognition evidence only/)
	).not.toBeVisible();

	const evidence = await evidenceFor(page, 'fr.je-voudrais');
	expect(evidence).toHaveLength(1);
	expect(evidence.at(-1)?.kind).toBe('transfer-pattern-matched');
	expect(evidence.at(-1)?.id).toMatch(/-transfer-pattern-matched-fr\.je-voudrais$/);
});

test('AC10: scenario mismatch does not become incorrect construction evidence', async ({ page }) => {
	await onboard(page);
	await authorizeLearnStep(page, 'fr-01', 'transfer', [
		'preview',
		'spread',
		'comprehension',
		'shadow',
		'translate',
		'completion'
	]);
	await page.getByLabel('Your new sentence').fill('Je voudrais du pain.');
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(
		page.getByText('The construction matched, but some situation details did not. Compare:')
	).toBeVisible();

	const evidence = await evidenceFor(page, 'fr.je-voudrais');
	expect(evidence.map((event) => event.kind)).toEqual(['transfer-pattern-matched']);
});

test('AC7 + AC10: Tamil transfer criteria support script and remain truthful', async ({ page }) => {
	await onboard(page, 'Tamil');
	await authorizeLearnStep(
		page,
		'ta-01',
		'transfer',
		['preview', 'spread', 'comprehension', 'shadow', 'translate', 'completion'],
		'ta'
	);
	await page.getByLabel('Your new sentence').fill('எனக்கு ஒரு டீ வேணும்.');
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(
		page.getByText('Your answer matched the target construction and situation patterns.')
	).toBeVisible();

	let evidence = await evidenceFor(page, 'ta.enakku-venum');
	expect(evidence).toHaveLength(1);
	expect(evidence.at(-1)?.kind).toBe('transfer-pattern-matched');
	expect(evidence.at(-1)?.id).toMatch(/-transfer-pattern-matched-ta\.enakku-venum$/);

	await page.reload();
	await page.getByLabel('Your new sentence').fill('இது சரியில்லை.');
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByText('The target construction pattern did not match. Compare:')).toBeVisible();
	// Design R1 #41: no evidence-honesty small print on the result card; the
	// evidence log below proves nothing was recorded as recognition progress.
	await expect(page.getByText(/No recognition progress was recorded/)).not.toBeVisible();
	evidence = await evidenceFor(page, 'ta.enakku-venum');
	expect(evidence.at(-1)?.kind).toBe('attempt-incorrect');
});

test('AC10: legacy heuristic transfer evidence is quarantined on hydration', async ({ page }) => {
	await onboard(page);
	await page.evaluate(() => {
		const key = 'ray-of-light.profile.v1';
		const stored = JSON.parse(localStorage.getItem(key)!);
		stored.evidence.push({
			id: 'legacy-transfer-event',
			constructionId: 'fr.je-voudrais',
			language: 'fr',
			kind: 'transfer-correct',
			lessonId: 'fr-01',
			at: 1,
			day: '2026-08-22',
			hinted: false,
			contentVersion: '2026.08.23-poc.1'
		});
		localStorage.setItem(key, JSON.stringify(stored));
	});
	await page.reload();
	await page.goto('/progress');
	await expect(page.getByText('0 of')).toBeVisible();

	const migrated = await evidenceFor(page, 'fr.je-voudrais');
	expect(migrated).toHaveLength(1);
	expect(migrated[0]).toMatchObject({
		id: 'legacy-transfer-event',
		kind: 'transfer-legacy-unverified'
	});
});

test('no lesson-level completion badge is presented as progress', async ({ page }) => {
	await onboard(page);
	await page.goto('/progress');
	await expect(page.getByText('%')).toHaveCount(0);
	await expect(page.getByText(/streak/i)).toHaveCount(0);
});

test('P1 regression: both listens complete through the main Play button', async ({ page }) => {
	// Two real end-to-end playthroughs of fr-01 (~16s each) plus build slack.
	test.setTimeout(180_000);
	await onboard(page);
	await page.getByRole('button', { name: 'Start', exact: true }).click();
	await expect(page).toHaveURL(/\/learn\/fr-01\/preview\/?$/);

	// First listen: only a completed playthrough counts.
	await page.getByRole('button', { name: 'Play the lesson' }).click();
	await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
	await expect(page.getByText('listen 1 of 2')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Play the lesson' })).toBeVisible({
		timeout: 60_000
	});
	await expect(page.getByText('listen 2 of 2')).toBeVisible();

	// Second listen through the SAME button. The regression: after `ended` the
	// button resumed at EOF, played nothing, and the second listen never
	// completed — Pause never appearing again is exactly that failure.
	await page.getByRole('button', { name: 'Play the lesson' }).click();
	await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
	await expect(page.getByRole('button', { name: "I've listened twice →" })).toBeVisible({
		timeout: 60_000
	});
});
