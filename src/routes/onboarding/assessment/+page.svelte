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

	// #42: every response pays back instantly — the placement preview builds
	// live from the same placement rule the Continue button will commit.
	const answered = $derived(heard !== null || spoke);
	const previewEntry = $derived(
		placeEntryLesson(
			{ heardCorrectly: heard === 0, spokeBack: spoke },
			COURSES[profile.language].lessons.length
		)
	);
	const previewLesson = $derived(getLessonByIndex(profile.language, previewEntry));

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

	<W.JourneyArc
		language={profile.language}
		current={answered ? previewEntry : null}
		caption={answered
			? `Right now your responses point at lesson ${previewEntry} · ${previewLesson?.title}. Each sample below can move the ring.`
			: 'This is the path your starting point sits on. The samples below choose the lesson where you begin.'}
	/>

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
	{#if heard !== null}
		<W.Muted class="anim-uncover text-center text-xs">
			{heard === 0
				? 'You recognized the meaning — your starting point moves along the path above.'
				: 'Noted. Beginning at the first lesson gives you the full run of the method.'}
		</W.Muted>
	{/if}

	<W.Card>
		<div class="text-sm">Now try saying the line back</div>
		<W.Muted class="text-xs">
			Repeat what you heard, as closely as you can. An imperfect attempt is exactly as
			useful as a polished one: whether you tried is what places your starting point.
			Nothing you say is scored or saved.
		</W.Muted>
		<W.MicButton recording={spoke} onclick={() => (spoke = !spoke)} />
		<W.Muted class="text-center">{spoke ? 'listening…' : 'hold to speak'}</W.Muted>
		{#if spoke}
			<W.Muted class="anim-uncover text-center text-xs text-insight">
				Saying it back moves your starting point further along the path.
			</W.Muted>
		{/if}
	</W.Card>

	<!-- #42: the placement the learner is building, always visible and live. -->
	<W.Card tone="parchment" class="gap-1 p-4">
		<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">
			Your starting point
		</div>
		{#key previewEntry}
			<div class="anim-uncover font-display text-lg leading-tight font-semibold">
				Lesson {previewEntry} · {previewLesson?.title}
			</div>
		{/key}
		<W.Muted class="text-xs">
			{answered
				? 'Built from your responses so far. Continue locks it in — you can always revisit earlier lessons.'
				: 'Respond to the samples above and this follows you; Continue locks it in.'}
		</W.Muted>
	</W.Card>

	<W.Button tone="primary" class="py-3.5 text-lg" onclick={continueToPlan}>
		Continue
	</W.Button>
	<W.Muted class="text-center text-2xs">
		Listening, reading and speaking samples set the entry lesson.
	</W.Muted>
</W.Shell>
