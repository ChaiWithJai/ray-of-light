<script lang="ts">
	/**
	 * 1m · Active-wave spread. The same layout as parallel reading, mirrored:
	 * the target column is covered and produced aloud, line by line (AC 5).
	 *
	 * Hints are graded, and taking one caps the evidence for that attempt — a
	 * hinted retrieval is real information, but it is not `recalled`.
	 */
	import Spread from '$lib/components/app/spread.svelte';
	import * as W from '$lib/components/wireframe/index.js';
	import { CONTENT_VERSION } from '$lib/content/index.js';
	import type { Lesson } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let {
		lesson,
		onDone
	}: { lesson: Lesson; onDone: (attempt: { lineId: string; text: string }) => void } = $props();

	let index = $state(0);
	let hinted = $state(false);
	let revealed = $state(false);
	let attempt = $state('');

	const line = $derived(lesson.lines[index]);
	const daysAgo = $derived(lesson.index);

	function produce() {
		if (attempt.trim() === '') return;
		profile.record('recall-correct', lesson.id, line.constructions, {
			hinted,
			contentVersion: CONTENT_VERSION
		});
		onDone({ lineId: line.id, text: attempt });
	}
</script>

<W.Muted class="text-center">
	You read this in lesson {daysAgo}. Say it in {lesson.language === 'ta' ? 'Tamil' : 'French'}.
</W.Muted>

<Spread {lesson} state="active-retrieval" bind:index settings={profile.settings} />

<W.AnswerField
	bind:value={attempt}
	placeholder="say or type the line…"
	minHeight={56}
	aria-label="Your production"
/>
<W.MicButton />

<div class="flex flex-wrap items-center justify-center gap-2">
	<W.Chip
		active={hinted}
		onclick={() => {
			hinted = true;
		}}
	>
		hint: first word
	</W.Chip>
	<W.Chip
		active={revealed}
		onclick={() => {
			hinted = true;
			revealed = true;
		}}
	>
		reveal
	</W.Chip>
</div>

{#if hinted}
	<W.SketchCard tone="warn">
		<W.Muted class="text-[12px] text-note">
			Hint used — this line won't count as recalled.
		</W.Muted>
		<W.Fr class="text-[13.5px]">
			{revealed ? line.targetScript : `${line.targetScript.split(' ')[0]}…`}
		</W.Fr>
	</W.SketchCard>
{/if}

<W.SketchButton
	tone="primary"
	class="mt-auto"
	disabled={attempt.trim() === ''}
	onclick={produce}
>
	Compare with the canonical line →
</W.SketchButton>
