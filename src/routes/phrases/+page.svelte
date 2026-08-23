<script lang="ts">
	/**
	 * 1t · Phrase library. Only constructions the learner has actually met, each
	 * keeping its source lesson and original context. Not a flashcard deck.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getLesson } from '$lib/content/index.js';
	import { normalise } from '$lib/answers.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);
	const states = $derived(profile.states);

	let query = $state('');
	let selected = $state<Set<string>>(new Set());

	/** Only what has been met — the library cannot leak unmet material. */
	const met = $derived(
		[...course.constructions.values()].filter((c) => states.has(c.id))
	);

	const results = $derived.by(() => {
		const q = normalise(query);
		if (!q) return met;
		return met.filter((c) => {
			const lesson = getLesson(profile.language, c.introducedIn);
			const haystack = [
				c.label,
				c.gloss,
				lesson?.title ?? '',
				lesson?.situation ?? '',
				...(lesson?.lines.flatMap((l) => [l.targetScript, l.naturalEnglish]) ?? [])
			].join(' ');
			return normalise(haystack).includes(q);
		});
	});

	function exampleFor(constructionId: string, lessonId: string) {
		const lesson = getLesson(profile.language, lessonId);
		return lesson?.lines.find((l) => l.constructions.includes(constructionId)) ?? lesson?.lines[0];
	}

	function toggle(id: string) {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}
</script>

<svelte:head><title>Phrases</title></svelte:head>

<W.Shell brand title="Phrases" nav settingsLink>
	<div class="anim-rise pt-2">
		<W.Heading>Phrases</W.Heading>
		<W.Muted class="mt-1">Your own material — everything here, you have met.</W.Muted>
	</div>

	<W.SearchField bind:value={query} placeholder={'🔍 "how do I ask for…"'} aria-label="Search phrases" />

	{#if met.length === 0}
		<W.Card>
			<W.Muted>
				Empty until you've met something. Constructions land here as you work through
				lessons — this is your own material, not a word list.
			</W.Muted>
		</W.Card>
	{:else}
		<div class="flex flex-col gap-2">
			{#each results as construction (construction.id)}
				{@const example = exampleFor(construction.id, construction.introducedIn)}
				{@const lesson = getLesson(profile.language, construction.introducedIn)}
				<W.Card
					tone={selected.has(construction.id) ? 'accent' : 'default'}
					class="cursor-pointer"
					onclick={() => toggle(construction.id)}
				>
					<div class="flex items-center justify-between gap-2">
						<W.Fr class="text-sm">{example?.targetScript ?? construction.label}</W.Fr>
						<W.PlayButton size="sm" label="Play phrase" />
					</div>
					{#if example?.transliteration}
						<W.Muted class="text-2xs italic">{example.transliteration}</W.Muted>
					{/if}
					<W.Muted>
						{example?.naturalEnglish ?? construction.gloss} · from L{lesson?.index}, {lesson?.title}
					</W.Muted>
				</W.Card>
			{:else}
				<W.Muted>Nothing matches "{query}".</W.Muted>
			{/each}
		</div>

		{#if selected.size > 0}
			<W.Button>Rehearse these {selected.size} 🎙</W.Button>
		{/if}
	{/if}

</W.Shell>
