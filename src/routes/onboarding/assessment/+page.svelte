<script lang="ts">
	/**
	 * 1a · Entry assessment. Samples listening, reading and speaking, then places
	 * the learner. Nothing is scored to the learner — "there are no wrong answers"
	 * is literal, because the point is placement, not judgement.
	 */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/wireframe/index.js';
	import { getLessonByIndex } from '$lib/content/index.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const lesson = $derived(getLessonByIndex(profile.language, 1)!);
	const sample = $derived(lesson.lines[2] ?? lesson.lines[0]);

	let heard = $state<number | null>(null);
	let spoke = $state(false);

	const distractors = $derived([
		sample.naturalEnglish,
		'Where is the station, please?',
		"That's all, thank you."
	]);
</script>

<svelte:head><title>Entry assessment</title></svelte:head>

<W.Phone>
	<W.TitleBar left="◁" center="Getting started · 2/3" />
	<W.Heading>Let's find your starting point</W.Heading>
	<W.Muted>Respond naturally — there are no wrong answers.</W.Muted>

	<W.SketchCard>
		<div class="flex items-center gap-2">
			<W.PlayButton label="Play the sample" disabled={sample.audio.pending} />
			<div class="flex flex-col gap-[3px]">
				<div class="text-[13px]">Listen, then pick what you heard</div>
				<W.Waveform bars={[{ h: 8 }, { h: 18 }, { h: 26 }, { h: 12 }, { h: 22 }, { h: 9 }]} />
			</div>
		</div>
		{#if sample.audio.pending}
			<W.Muted class="text-[11px] text-note">
				Audio pending native recording — the text is shown instead.
			</W.Muted>
			<W.Fr class="text-[13px]">{sample.targetScript}</W.Fr>
		{/if}
	</W.SketchCard>

	{#each distractors as option, i (option)}
		<W.SketchButton
			tone={heard === i ? 'primary' : 'outline'}
			onclick={() => (heard = i)}
			class="text-[14px]"
		>
			"{option}"
		</W.SketchButton>
	{/each}

	<W.SketchCard>
		<div class="text-[13px]">Now say it back:</div>
		<W.MicButton recording={spoke} onclick={() => (spoke = !spoke)} />
		<W.Muted class="text-center">{spoke ? 'listening…' : 'hold to speak'}</W.Muted>
	</W.SketchCard>

	<W.SketchButton tone="primary" onclick={() => goto('/onboarding/plan')}>
		Continue
	</W.SketchButton>
	<W.Muted class="text-center text-[11px]">
		Listening, reading and speaking samples set the entry lesson.
	</W.Muted>
</W.Phone>
