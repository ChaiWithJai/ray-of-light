<script lang="ts">
	/**
	 * The notebook — every note the learner has written, in one place (#48).
	 * Reached from Settings or from a session's notes aside, never from the
	 * nav (the same rule as the wiki: a place you go on purpose, not a fifth
	 * destination). Notes here are editable in place and deletable; nothing
	 * is ever written into them but the learner's own words.
	 */
	import { X } from '@lucide/svelte';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES } from '$lib/content/index.js';
	import { recentFirst, type NoteScope } from '$lib/notes/notes.js';
	import { notes } from '$lib/stores/notes.svelte.js';

	const listed = $derived(recentFirst(notes.all));
	let draft = $state('');

	/** Where a note was written, as a human-readable label. */
	function place(scope: NoteScope): string {
		if (!scope.lessonId) return 'notebook';
		for (const course of Object.values(COURSES)) {
			const lesson = course.lessons.find((candidate) => candidate.id === scope.lessonId);
			if (!lesson) continue;
			if (scope.lineId) {
				const index = lesson.lines.findIndex((line) => line.id === scope.lineId);
				return index >= 0 ? `${lesson.title} · line ${index + 1}` : lesson.title;
			}
			return lesson.title;
		}
		return scope.lessonId;
	}

	function keep() {
		if (notes.add(draft)) draft = '';
	}
</script>

<svelte:head><title>Your notebook</title></svelte:head>

<W.Shell title="Notebook" back="/settings">
	<div class="anim-rise pt-2">
		<W.Heading>Your notebook</W.Heading>
		<W.Muted class="mt-1">
			Everything you have written, most recent first. It stays on this device.
		</W.Muted>
	</div>

	{#if notes.loaded && !notes.persisted}
		<W.Muted role="alert" class="text-caution">
			Notes are only in this tab and will be lost on refresh because local storage is
			unavailable.
		</W.Muted>
	{/if}

	<W.Card>
		<W.AnswerField
			bind:value={draft}
			data-testid="notebook-input"
			aria-label="Write a note"
			placeholder="A thought that belongs to no lesson — in your own words."
		/>
		<W.Button
			data-testid="notebook-save"
			disabled={!draft.trim()}
			class="w-auto self-start px-4 text-sm"
			onclick={keep}
		>
			Keep this note
		</W.Button>
	</W.Card>

	{#if listed.length === 0}
		<W.Muted data-testid="notebook-empty">
			Nothing here yet. During a lesson, the notes column keeps whatever you write —
			it all collects here.
		</W.Muted>
	{:else}
		<ul class="m-0 flex list-none flex-col gap-3 p-0" data-testid="notebook-list">
			{#each listed as note (note.id)}
				<li>
					<W.Card class="gap-1.5">
						<div class="flex items-center justify-between gap-2">
							<W.Pill>{place(note.scope)}</W.Pill>
							<button
								type="button"
								aria-label="Delete note"
								class="-mr-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-faint outline-none hover:bg-line/40 hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
								onclick={() => notes.remove(note.id)}
							>
								<X size={14} />
							</button>
						</div>
						<W.AnswerField
							value={note.body}
							aria-label="Edit note"
							minHeight={48}
							class="border-transparent p-2 text-sm shadow-none"
							onchange={(event) => notes.update(note.id, event.currentTarget.value)}
						/>
					</W.Card>
				</li>
			{/each}
		</ul>
		<W.Hint>edits save when you leave a note; deleting removes it for good</W.Hint>
	{/if}
</W.Shell>
