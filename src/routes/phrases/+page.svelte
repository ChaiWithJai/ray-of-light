<script lang="ts">
	/**
	 * 1t · Phrase library. Only constructions the learner has actually met, each
	 * keeping its source lesson and original context. Not a flashcard deck.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { LessonPlayer } from '$lib/audio/lesson-player.svelte.js';
	import { COURSES, getLesson } from '$lib/content/index.js';
	import { normalise } from '$lib/answers.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import type { Lesson } from '$lib/schemas/content.js';

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
		const index = lesson?.lines.findIndex((l) => l.constructions.includes(constructionId)) ?? -1;
		return { line: index >= 0 ? lesson?.lines[index] : lesson?.lines[0], index: Math.max(index, 0) };
	}

	function toggle(id: string) {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}

	// One player per source lesson so cards sharing a lesson share playback;
	// only one card sounds at a time.
	const players = new Map<string, LessonPlayer>();
	function playerFor(lesson: Lesson) {
		let p = players.get(lesson.id);
		if (!p) {
			p = new LessonPlayer(lesson);
			players.set(lesson.id, p);
		}
		return p;
	}
	function playPhrase(lesson: Lesson, lineIndex: number) {
		const target = playerFor(lesson);
		for (const p of players.values()) if (p !== target) p.pause();
		target.playLine(lineIndex);
	}
	$effect(() => () => {
		for (const p of players.values()) p.destroy();
		players.clear();
	});
</script>

<svelte:head><title>Phrases</title></svelte:head>

<W.Shell brand title="Phrases" nav settingsLink>
	<div class="anim-rise pt-2">
		<W.Heading>Phrases</W.Heading>
		<W.Muted class="mt-1">Your own material: everything here, you have met.</W.Muted>
	</div>

	<W.SearchField bind:value={query} placeholder={'🔍 "how do I ask for…"'} aria-label="Search phrases" />

	{#if met.length === 0}
		<W.Card>
			<W.Muted>
				Empty for now. As you work through lessons, every phrase pattern you meet lands
				here, kept with the situation it came from.
			</W.Muted>
		</W.Card>
	{:else}
		<div class="flex flex-col gap-2">
			{#each results as construction (construction.id)}
				{@const lesson = getLesson(profile.language, construction.introducedIn)}
				{@const { line: example, index: exampleIndex } = exampleFor(construction.id, construction.introducedIn)}
				{@const player = lesson ? playerFor(lesson) : null}
				<W.Card
					tone={selected.has(construction.id) ? 'accent' : 'default'}
					class="cursor-pointer"
					onclick={() => toggle(construction.id)}
				>
					<div class="flex items-center justify-between gap-2">
						<W.Fr class="text-sm">{example?.targetScript ?? construction.label}</W.Fr>
						<W.PlayButton
							size="sm"
							glyph={player?.playing && player.activeLine === exampleIndex ? '❚❚' : '▶'}
							label={player?.playing && player.activeLine === exampleIndex
								? 'Pause phrase'
								: 'Play phrase'}
							disabled={!player?.available}
							onclick={(e: MouseEvent) => {
								e.stopPropagation();
								if (lesson) playPhrase(lesson, exampleIndex);
							}}
						/>
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
