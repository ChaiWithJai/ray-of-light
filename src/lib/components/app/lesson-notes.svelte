<script lang="ts">
	/**
	 * LessonNotes — the aside's one consistent job during a session (#48,
	 * Phase H0): capture and surface the learner's own notes, scoped to the
	 * active line when the spread has one, otherwise to the lesson. Renders in
	 * the desktop aside and inside the mobile notes sheet; both are the same
	 * notebook, so a note taken anywhere shows up everywhere.
	 */
	import { X } from '@lucide/svelte';
	import * as W from '$lib/components/ui/index.js';
	import { getLesson } from '$lib/content/index.js';
	import { lessonStepOrder } from '$lib/notes/notes.js';
	import { activeLine } from '$lib/stores/active-line.svelte.js';
	import { notes } from '$lib/stores/notes.svelte.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let { lessonId }: { lessonId: string } = $props();

	const lesson = $derived(getLesson(profile.language, lessonId));
	const line = $derived(
		activeLine.current?.lessonId === lessonId ? activeLine.current : null
	);
	/** The learner's explicit choice to file the note under the lesson instead. */
	let wholeLesson = $state(false);
	const lineScoped = $derived(Boolean(line) && !wholeLesson);
	const listed = $derived(lessonStepOrder(notes.all, lessonId, line?.lineId));

	let draft = $state('');

	function lineLabel(lineId: string): string {
		const index = lesson?.lines.findIndex((candidate) => candidate.id === lineId) ?? -1;
		return index >= 0 ? `line ${index + 1}` : 'line';
	}

	function keep() {
		const scope =
			lineScoped && line ? { lessonId, lineId: line.lineId } : { lessonId };
		if (notes.add(draft, scope)) draft = '';
	}
</script>

<div class="flex flex-col gap-3" data-testid="lesson-notes">
	<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">Your notes</div>

	{#if notes.loaded && !notes.persisted}
		<W.Muted role="alert" class="text-xs text-caution">
			Notes are only in this tab and will be lost on refresh because local storage is
			unavailable.
		</W.Muted>
	{/if}

	{#if line}
		<div class="flex items-center gap-2" role="group" aria-label="Note scope">
			<W.Chip active={lineScoped} onclick={() => (wholeLesson = false)}>
				this line
			</W.Chip>
			<W.Chip active={!lineScoped} onclick={() => (wholeLesson = true)}>
				whole lesson
			</W.Chip>
		</div>
	{/if}

	<W.AnswerField
		bind:value={draft}
		data-testid="note-input"
		aria-label="Write a note"
		minHeight={56}
		class="p-2.5 text-sm"
		placeholder={lineScoped && line
			? `A note on ${lineLabel(line.lineId)} — in your own words.`
			: 'A note on this lesson — in your own words.'}
	/>
	<W.Button
		data-testid="note-save"
		disabled={!draft.trim()}
		class="w-auto self-start px-4 text-sm"
		onclick={keep}
	>
		Keep this note
	</W.Button>

	{#if listed.length === 0}
		<W.Muted class="text-xs">Nothing here yet. What you write stays on this device.</W.Muted>
	{:else}
		<ul class="m-0 flex list-none flex-col gap-2 p-0" data-testid="note-list">
			{#each listed as note (note.id)}
				<li
					class="flex flex-col gap-1.5 rounded-lg border border-line bg-surface-raised/70 px-3 py-2"
				>
					<div class="flex items-center justify-between gap-2">
						<W.Pill active={Boolean(note.scope.lineId) && note.scope.lineId === line?.lineId}>
							{note.scope.lineId ? lineLabel(note.scope.lineId) : 'lesson'}
						</W.Pill>
						<button
							type="button"
							aria-label="Delete note"
							class="-mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-faint outline-none hover:bg-line/40 hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
							onclick={() => notes.remove(note.id)}
						>
							<X size={12} />
						</button>
					</div>
					<p class="m-0 text-sm leading-relaxed whitespace-pre-wrap">{note.body}</p>
				</li>
			{/each}
		</ul>
	{/if}

	<a
		href="/notebook"
		data-testid="open-notebook"
		class="self-start text-2xs text-text-faint underline decoration-dotted underline-offset-2 outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand"
	>
		Open your notebook
	</a>
</div>
