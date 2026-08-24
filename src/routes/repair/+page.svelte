<script lang="ts">
	/**
	 * 1p · Error repair. One recurring error, drilled across several contexts —
	 * never a mixed "mistakes review" pile. The error is found by clustering the
	 * evidence log, so this surface has nothing to show until mistakes exist.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getConstruction, getLesson } from '$lib/content/index.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);

	/** The construction with the most incorrect attempts — one, not a pile. */
	const worst = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const e of profile.current.evidence) {
			if (e.language !== profile.language) continue;
			if (e.kind !== 'attempt-incorrect' && !e.hinted) continue;
			counts.set(e.constructionId, (counts.get(e.constructionId) ?? 0) + 1);
		}
		let best: { id: string; count: number } | null = null;
		for (const [id, count] of counts) {
			if (!best || count > best.count) best = { id, count };
		}
		return best;
	});

	const construction = $derived(worst ? getConstruction(profile.language, worst.id) : undefined);

	/** The same confusion in several different contexts. */
	const contexts = $derived(
		worst
			? course.lessons
					.flatMap((l) => l.lines)
					.filter((line) => line.constructions.includes(worst.id))
					.slice(0, 3)
			: []
	);
</script>

<svelte:head><title>Your pattern</title></svelte:head>

<W.Shell title="Your pattern" back="/today" backKind="close">
	<div class="anim-rise pt-2">
		<W.Heading>Your pattern</W.Heading>
	</div>

	{#if !worst || !construction}
		<W.Card>
			<W.Muted>
				Nothing to repair right now. When the same pattern trips you up more than once,
				this page brings it back so you can settle it in a few different contexts.
			</W.Muted>
		</W.Card>
		<W.Button class="mt-auto" href="/today">Back to Today</W.Button>
	{:else}
		<W.Card tone="warn">
			<div class="text-sm font-semibold">You keep missing {construction.label}</div>
			<W.Muted>
				missed {worst.count} times. Let's settle just this one.
			</W.Muted>
			<W.Muted class="text-2xs">{construction.gloss}</W.Muted>
		</W.Card>

		<div class="flex flex-col gap-2">
			{#each contexts as line (line.id)}
				{@const lesson = getLesson(profile.language, line.lessonId)}
				<W.Card>
					<W.Fr class="text-sm">{line.targetScript}</W.Fr>
					{#if line.transliteration}
						<W.Muted class="text-2xs italic">{line.transliteration}</W.Muted>
					{/if}
					<W.Muted class="text-2xs">{line.naturalEnglish} · L{lesson?.index}</W.Muted>
				</W.Card>
			{/each}
		</div>

		<W.Muted class="text-center">then say each full sentence aloud</W.Muted>
		<W.MicButton />
		<W.Button class="mt-auto" href="/today">Done</W.Button>
	{/if}
</W.Shell>
