<script lang="ts">
	/**
	 * 1a · Entry assessment. Samples listening and speaking, then places the
	 * learner. Nothing is scored to the learner — "there are no wrong answers"
	 * is literal, because the point is placement, not judgement.
	 *
	 * R2 batch 1: the two samples are one composed exercise (the protagonist of
	 * the screen), with the listening sample owning its answer options and the
	 * speak-back as its second step. The live placement preview is folded into
	 * a single quiet outcome strip: arc plus starting point.
	 */
	import { goto } from '$app/navigation';
	import { LessonPlayer } from '$lib/audio/lesson-player.svelte.js';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getLessonByIndex } from '$lib/content/index.js';
	import { placeEntryLesson } from '$lib/schemas/learner.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const lesson = $derived(getLessonByIndex(profile.language, 1)!);
	const sampleIndex = $derived(lesson.lines[2] ? 2 : 0);
	const sample = $derived(lesson.lines[sampleIndex]);

	const player = $derived.by(() => new LessonPlayer(lesson));
	$effect(() => {
		const p = player;
		return () => p.destroy();
	});
	function playSample() {
		player.playLine(sampleIndex);
	}

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
		<W.Muted>Respond however feels natural. There are no wrong answers here.</W.Muted>
	</div>

	<W.ConceptIntro technique="assessment" />

	<!-- The exercise is the screen: one composed card, two steps in sequence.
	     The listening sample owns its answer options; the speak-back is step
	     two of the same exercise. -->
	<W.Card tone="accent" thick class="anim-rise anim-d1 gap-3 p-5">
		<section class="flex flex-col gap-2" aria-label="Step 1 of 2: listen">
			<div class="font-mono text-2xs text-text-faint">step 1 of 2</div>
			<div class="flex items-center gap-2.5">
				<W.PlayButton
					size="lg"
					class="mx-0"
					glyph={player.playing ? '❚❚' : '▶'}
					label={player.playing ? 'Pause the sample' : 'Play the sample'}
					disabled={!player.available}
					onclick={playSample}
				/>
				<div class="flex flex-col gap-[3px]">
					<div class="font-display text-base leading-snug font-semibold">
						Listen, then pick what you heard
					</div>
					<W.Waveform bars={[{ h: 8 }, { h: 18 }, { h: 26 }, { h: 12 }, { h: 22 }, { h: 9 }]} />
				</div>
			</div>
			{#if sample.audio.pending}
				<W.Muted class="text-2xs text-caution">
					Audio for this sample is pending a native recording, so the text is shown instead.
				</W.Muted>
				<W.Fr class="text-sm">{sample.targetScript}</W.Fr>
			{/if}
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
						? 'You recognized the meaning. Your starting point moves along the path below.'
						: 'Noted. Beginning at the first lesson gives you the full run of the method.'}
				</W.Muted>
			{/if}
		</section>

		<div class="h-px bg-line" aria-hidden="true"></div>

		<section class="flex flex-col gap-2" aria-label="Step 2 of 2: say it back">
			<div class="font-mono text-2xs text-text-faint">step 2 of 2</div>
			<div class="font-display text-base leading-snug font-semibold">
				Now try saying the line back
			</div>
			<W.Muted class="text-xs">
				Repeat what you heard, as closely as you can. Trying is what counts, and nothing you
				say is scored or saved.
			</W.Muted>
			<W.MicButton recording={spoke} onclick={() => (spoke = !spoke)} />
			<W.Muted class="text-center">{spoke ? 'listening…' : 'hold to speak'}</W.Muted>
			{#if spoke}
				<W.Muted class="anim-uncover text-center text-xs text-insight">
					Saying it back moves your starting point further along the path.
				</W.Muted>
			{/if}
		</section>
	</W.Card>

	<!-- #42, #37: the placement the learner is building, live, as one quiet
	     outcome strip — the arc is the single picture of the path. -->
	<W.Card tone="parchment" class="gap-1.5 p-4">
		<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">
			Your starting point
		</div>
		<W.JourneyArc language={profile.language} current={answered ? previewEntry : null} />
		{#key previewEntry}
			<div class="anim-uncover font-display text-lg leading-tight font-semibold">
				Lesson {previewEntry} · {previewLesson?.title}
			</div>
		{/key}
		<W.Muted class="text-xs">
			{answered
				? 'Built from your responses so far. Continue locks it in, and earlier lessons stay open to revisit.'
				: 'Respond to the samples above and this follows you. Continue locks it in.'}
		</W.Muted>
	</W.Card>

	<W.Button tone="primary" class="py-3.5 text-lg" onclick={continueToPlan}>
		Continue
	</W.Button>
</W.Shell>
