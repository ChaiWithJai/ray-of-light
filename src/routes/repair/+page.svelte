<script lang="ts">
	/**
	 * 1p · Error repair. One recurring error, drilled across several contexts —
	 * never a mixed "mistakes review" pile. The error is found by clustering the
	 * evidence log, so this surface has nothing to show until mistakes exist.
	 */
	import * as W from '$lib/components/wireframe/index.js';
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

<W.Phone>
	<W.TitleBar left="✕" center="Your pattern" />

	{#if !worst || !construction}
		<W.SketchCard>
			<W.Muted>
				Nothing to repair. This surface only appears once the same construction has gone
				wrong more than once — it is not a list of every mistake you've made.
			</W.Muted>
		</W.SketchCard>
		<W.SketchButton class="mt-auto" href="/today">Back to Today</W.SketchButton>
	{:else}
		<W.SketchCard tone="warn">
			<div class="text-[14px] font-semibold">You keep missing {construction.label}</div>
			<W.Muted>
				seen {worst.count}× — let's fix just this one
			</W.Muted>
			<W.Muted class="text-[11.5px]">{construction.gloss}</W.Muted>
		</W.SketchCard>

		<div class="flex flex-col gap-[6px]">
			{#each contexts as line (line.id)}
				{@const lesson = getLesson(profile.language, line.lessonId)}
				<W.SketchCard>
					<W.Fr class="text-[14px]">{line.targetScript}</W.Fr>
					{#if line.transliteration}
						<W.Muted class="text-[11px] italic">{line.transliteration}</W.Muted>
					{/if}
					<W.Muted class="text-[11px]">{line.naturalEnglish} · L{lesson?.index}</W.Muted>
				</W.SketchCard>
			{/each}
		</div>

		<W.Muted class="text-center">then say each full sentence aloud</W.Muted>
		<W.MicButton />
		<W.SketchButton class="mt-auto" href="/today">Done</W.SketchButton>
	{/if}
</W.Phone>
