<script lang="ts">
	/**
	 * /wiki/constructions/[id] — one phrase pattern, in full (#47 W3, #46 S2).
	 *
	 * Everything on the page is either curriculum (label, gloss, the lesson that
	 * teaches it, the lines that exercise it) or derivation (the learner's state
	 * from the evidence log). Nothing is stored, and absence is stated plainly:
	 * a pattern with no evidence reads "not yet met" and says where to meet it.
	 */
	import { page as route } from '$app/state';
	import * as W from '$lib/components/ui/index.js';
	import { LANGUAGE_LABELS } from '$lib/content/index.js';
	import { CAPABILITY_STATE_COPY } from '$lib/content/wiki/index.js';
	import {
		CONSTRUCTION_COPY,
		constructionEntry,
		stageLabel
	} from '$lib/content/wiki/constructions.js';
	import { spriteStage } from '$lib/sprites.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const entry = $derived(constructionEntry(route.params.id!));
	/** State is this learner's, in this course. Another course's pattern has none. */
	const inActiveCourse = $derived(entry?.language === profile.language);
	const state = $derived(entry && inActiveCourse ? profile.stateOf(entry.id) : null);
	const stage = $derived(spriteStage(state));
</script>

<svelte:head><title>{entry ? entry.label : CONSTRUCTION_COPY.indexTitle}</title></svelte:head>

<W.Shell title="Method guide" back="/wiki/constructions">
	{#if entry}
		<div class="anim-rise pt-2">
			<W.Heading>{entry.label}</W.Heading>
			<W.Muted class="mt-1">{entry.gloss}</W.Muted>
		</div>

		<W.Card tone="parchment" class="gap-2" data-testid="construction-state">
			<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">
				{CONSTRUCTION_COPY.stateHeading}
			</div>
			<div class="flex items-center gap-3">
				<W.Sprite constructionId={entry.id} {state} size={56} />
				<div class="min-w-0">
					<div
						class="text-sm font-bold tracking-[0.14em] uppercase {state
							? 'text-brand-deep'
							: 'text-text-faint'}"
						data-testid="construction-stage"
					>
						{stageLabel(stage)}
					</div>
					<W.Muted class="mt-0.5 text-2xs">
						{state ? CAPABILITY_STATE_COPY[state].meaning : CONSTRUCTION_COPY.unmetMeaning}
					</W.Muted>
				</div>
			</div>
			<W.Muted class="text-2xs">
				{#if state}
					{CAPABILITY_STATE_COPY[state].earns}
				{:else if inActiveCourse}
					{CONSTRUCTION_COPY.unmetNext}
				{:else}
					{CONSTRUCTION_COPY.otherCourse(LANGUAGE_LABELS[entry.language])}
				{/if}
			</W.Muted>
			<a
				href="/wiki/capability"
				data-testid="construction-ladder-link"
				class="self-start text-2xs font-bold text-brand-deep underline decoration-dotted underline-offset-2 outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
			>
				{CONSTRUCTION_COPY.ladderLink}
			</a>
		</W.Card>

		<W.Card class="gap-1.5" data-testid="construction-lesson">
			<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
				{CONSTRUCTION_COPY.introHeading}
			</div>
			<div class="text-sm">
				{entry.introducedIn.index}. {entry.introducedIn.title}
			</div>
			<W.Muted class="text-2xs">{entry.introducedIn.situation}</W.Muted>
			<a
				href="/book#lesson-{entry.introducedIn.lessonId}"
				data-testid="construction-lesson-link"
				class="self-start text-2xs font-bold text-brand-deep underline decoration-dotted underline-offset-2 outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
			>
				{CONSTRUCTION_COPY.introLink}
			</a>
		</W.Card>

		<div class="flex flex-col gap-2" data-testid="construction-lines">
			<h2 class="m-0 font-display text-lg leading-tight font-semibold">
				{CONSTRUCTION_COPY.linesHeading}
			</h2>
			<W.Muted class="text-2xs">
				{entry.lines.length > 0 ? CONSTRUCTION_COPY.linesLead : CONSTRUCTION_COPY.noLines}
			</W.Muted>
			{#if entry.lines.length === 0}
				<W.Card class="gap-1.5 p-3" data-testid="construction-exercised">
					<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
						{CONSTRUCTION_COPY.exercisedHeading}
					</div>
					{#each entry.exercisedInLessons as lesson (lesson.lessonId)}
						<W.Muted class="text-2xs">lesson {lesson.index}. {lesson.title}</W.Muted>
					{/each}
				</W.Card>
			{/if}
			{#each entry.lines as line (line.lineId)}
				<W.Card class="gap-1 p-3" data-testid="construction-line-{line.lineId}">
					<W.Fr>{line.targetScript}</W.Fr>
					{#if line.transliteration}
						<W.Muted class="text-2xs italic">{line.transliteration}</W.Muted>
					{/if}
					<W.En>{line.naturalEnglish}</W.En>
					<W.Muted class="text-2xs text-text-faint">
						lesson {line.lessonIndex}. {line.lessonTitle}{line.introducing
							? ` · ${CONSTRUCTION_COPY.introducingMark}`
							: ''}
					</W.Muted>
				</W.Card>
			{/each}
		</div>
	{:else}
		<W.Muted>{CONSTRUCTION_COPY.missing}</W.Muted>
		<W.Button href="/wiki/constructions">{CONSTRUCTION_COPY.indexLink}</W.Button>
	{/if}
</W.Shell>
