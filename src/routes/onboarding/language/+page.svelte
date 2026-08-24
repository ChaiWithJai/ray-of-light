<script lang="ts">
	/** AC 1: "Jai can select French or Tamil and finish a full daily session." */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, LANGUAGE_LABELS } from '$lib/content/index.js';
	import type { LanguageCode } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const LANGUAGES: LanguageCode[] = ['fr', 'ta'];

	/**
	 * Each language gets a real identity: its own greeting in its own script and
	 * a tonal accent — typographic specificity, no flags, no pastiche.
	 */
	const IDENTITY: Record<
		LanguageCode,
		{ native: string; greeting: string; accent: string; wash: string; note: string }
	> = {
		fr: {
			native: 'Français',
			greeting: 'Bonjour.',
			accent: 'text-lang-fr',
			wash: 'border-lang-fr/35 hover:border-lang-fr/70',
			note: 'Contemporary spoken French, from the first line.'
		},
		ta: {
			native: 'தமிழ்',
			greeting: 'வணக்கம்.',
			accent: 'text-lang-ta',
			wash: 'border-lang-ta/35 hover:border-lang-ta/70',
			note: 'Contemporary spoken Tamil, with script and transliteration.'
		}
	};

	// Already onboarded? Don't make them do it again.
	$effect(() => {
		if (profile.loaded && profile.onboarded) goto('/today', { replaceState: true });
	});

	function choose(language: LanguageCode) {
		profile.setLanguage(language);
		goto(profile.onboarded ? '/today' : '/onboarding/assessment');
	}
</script>

<svelte:head><title>Ray of Light</title></svelte:head>

<W.Shell title="Getting started · 1/3" brand>
	{#snippet aside()}
		<div class="flex flex-col gap-3 border-l border-line pl-6">
			<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
				The method
			</div>
			<W.Muted>
				Calm focus. Audible language. Parallel text. Gradual reveal. One short session a
				day, and the language does the rest.
			</W.Muted>
			<p class="m-0 font-script text-lg leading-snug text-caution">
				→ you assimilate first; you produce later, from memory.
			</p>
		</div>
	{/snippet}

	<div class="anim-rise flex flex-col gap-2 pt-2">
		<W.Heading>Which language?</W.Heading>
		<W.Muted>You can add the other one later. Progress is kept separately.</W.Muted>
	</div>

	<div class="grid gap-4 pt-2 sm:grid-cols-2">
		{#each LANGUAGES as language, i (language)}
			{@const course = COURSES[language]}
			{@const id = IDENTITY[language]}
			{@const regular = course.lessons.filter((l) => l.kind === 'regular')}
			<W.Card
				thick={profile.language === language}
				class="anim-rise {i === 0 ? 'anim-d1' : 'anim-d2'} gap-3 p-5 transition-colors {id.wash}"
			>
				<div class="font-serif text-3xl leading-none {id.accent}" lang={language}>
					{id.greeting}
				</div>
				<div class="flex items-baseline justify-between gap-2">
					<div class="text-lg font-bold">
						{LANGUAGE_LABELS[language]}
						<span class="font-serif text-base font-normal text-text-soft" lang={language}>
							· {id.native}</span
						>
					</div>
					<W.Pill>{course.lessons.length} lessons</W.Pill>
				</div>
				<W.Muted class="text-xs">
					{course.constructions.size} constructions ·
					{course.lessons.reduce((n, l) => n + l.lines.length, 0)} lines
				</W.Muted>
				<W.Muted class="min-h-9 text-xs">{id.note}</W.Muted>
				<W.JourneyArc
					{language}
					caption={`Each lesson lives in one real situation, from ${regular[0].situation.toLowerCase()} to ${regular[regular.length - 1].situation.toLowerCase()}. Partway in, earlier lessons return for you to say from memory.`}
				/>
				<W.Button
					tone={profile.language === language ? 'primary' : 'outline'}
					class="mt-auto"
					onclick={() => choose(language)}
				>
					Start {LANGUAGE_LABELS[language]}
				</W.Button>
			</W.Card>
		{/each}
	</div>
</W.Shell>
