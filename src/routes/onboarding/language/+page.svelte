<script lang="ts">
	/** AC 1: "Jai can select French or Tamil and finish a full daily session." */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES, LANGUAGE_LABELS } from '$lib/content/index.js';
	import type { LanguageCode } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const LANGUAGES: LanguageCode[] = ['fr', 'ta'];

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

<W.Phone>
	<W.TitleBar center="Getting started · 1/3" />
	<W.Heading>Which language?</W.Heading>
	<W.Muted>You can add the other one later. Progress is kept separately.</W.Muted>

	{#each LANGUAGES as language (language)}
		{@const course = COURSES[language]}
		<W.SketchCard thick={profile.language === language}>
			<div class="flex items-center justify-between gap-2">
				<div class="font-semibold">{LANGUAGE_LABELS[language]}</div>
				<W.Pill>{course.lessons.length} lessons</W.Pill>
			</div>
			<W.Muted>
				{course.constructions.size} constructions ·
				{course.lessons.reduce((n, l) => n + l.lines.length, 0)} lines
			</W.Muted>
			<W.SketchButton
				tone={profile.language === language ? 'primary' : 'outline'}
				class="mt-[4px]"
				onclick={() => choose(language)}
			>
				Start {LANGUAGE_LABELS[language]}
			</W.SketchButton>
		</W.SketchCard>
	{/each}

	<W.Muted class="text-center text-[11px]">
		Tamil is taught in contemporary spoken form, with script and transliteration.
	</W.Muted>
</W.Phone>
