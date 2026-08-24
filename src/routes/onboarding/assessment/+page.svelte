<script lang="ts">
	/**
	 * 1a · Entry assessment. Samples listening, reading and speaking, then places
	 * the learner. Nothing is scored to the learner — "there are no wrong answers"
	 * is literal, because the point is placement, not judgement.
	 */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getLessonByIndex } from '$lib/content/index.js';
	import { placeEntryLesson } from '$lib/schemas/learner.js';
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

	function continueToPlan() {
		// Placement, not judgement: the samples set the entry lesson and nothing
		// else. The plan page persists it into the profile.
		const entry = placeEntryLesson(
			{ heardCorrectly: heard === 0, spokeBack: spoke },
			COURSES[profile.language].lessons.length
		);
		goto(`/onboarding/plan?entry=${entry}`);
	}
</script>

<svelte:head><title>Entry assessment</title></svelte:head>

<W.Shell title="Getting started · 2/3" back="/onboarding/language">
	<div class="anim-rise flex flex-col gap-2 pt-2">
		<W.Heading>Let's find your starting point</W.Heading>
		<W.Muted>
			Respond naturally. There are no wrong answers here; your responses simply choose the
			lesson where your course begins.
		</W.Muted>
	</div>

	<W.ConceptIntro technique="assessment" />

	<W.Card>
		<div class="flex items-center gap-2">
			<W.PlayButton label="Play the sample" disabled={sample.audio.pending} />
			<div class="flex flex-col gap-[3px]">
				<div class="text-sm">Listen, then pick what you heard</div>
				<W.Waveform bars={[{ h: 8 }, { h: 18 }, { h: 26 }, { h: 12 }, { h: 22 }, { h: 9 }]} />
			</div>
		</div>
		{#if sample.audio.pending}
			<W.Muted class="text-2xs text-caution">
				Audio for this sample is pending a native recording, so the text is shown instead.
			</W.Muted>
			<W.Fr class="text-sm">{sample.targetScript}</W.Fr>
		{/if}
	</W.Card>

	{#each distractors as option, i (option)}
		<W.Button
			tone={heard === i ? 'primary' : 'outline'}
			onclick={() => (heard = i)}
			class="text-sm"
		>
			"{option}"
		</W.Button>
	{/each}

	<W.Card>
		<div class="text-sm">Now try saying the line back</div>
		<W.Muted class="text-xs">
			Repeat what you heard, as closely as you can. An imperfect attempt is exactly as
			useful as a polished one: whether you tried is what places your starting point.
			Nothing you say is scored or saved.
		</W.Muted>
		<W.MicButton recording={spoke} onclick={() => (spoke = !spoke)} />
		<W.Muted class="text-center">{spoke ? 'listening…' : 'hold to speak'}</W.Muted>
	</W.Card>

	<W.Button tone="primary" onclick={continueToPlan}>
		Continue
	</W.Button>
	<W.Muted class="text-center text-2xs">
		Listening, reading and speaking samples set the entry lesson.
	</W.Muted>
</W.Shell>
