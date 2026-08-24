import { describe, expect, it } from 'vitest';
import {
	lessonStepOrder,
	NoteEntry,
	notesForLesson,
	notesForLine,
	recentFirst,
	unscopedNotes
} from './notes.js';
import { memoryPersistence, type NotesPersistence } from './persistence.js';
import { NotesStore } from '$lib/stores/notes.svelte.js';

const note = (
	id: string,
	scope: { lessonId?: string; lineId?: string },
	updatedAt: number
): NoteEntry => ({ id, scope, body: `body of ${id}`, createdAt: updatedAt, updatedAt });

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('NoteEntry schema', () => {
	it('accepts line, lesson and unscoped notes', () => {
		expect(NoteEntry.safeParse(note('a', {}, 1)).success).toBe(true);
		expect(NoteEntry.safeParse(note('b', { lessonId: 'fr-01' }, 1)).success).toBe(true);
		expect(
			NoteEntry.safeParse(note('c', { lessonId: 'fr-01', lineId: 'fr-01-l1' }, 1)).success
		).toBe(true);
	});

	it('rejects a line-scoped note without its lesson, and empty bodies', () => {
		expect(NoteEntry.safeParse(note('a', { lineId: 'fr-01-l1' }, 1)).success).toBe(false);
		expect(NoteEntry.safeParse({ ...note('b', {}, 1), body: '' }).success).toBe(false);
	});
});

describe('scoping', () => {
	const corpus = [
		note('old-line', { lessonId: 'fr-01', lineId: 'fr-01-l1' }, 10),
		note('new-line', { lessonId: 'fr-01', lineId: 'fr-01-l1' }, 40),
		note('other-line', { lessonId: 'fr-01', lineId: 'fr-01-l2' }, 90),
		note('lesson', { lessonId: 'fr-01' }, 50),
		note('other-lesson', { lessonId: 'fr-02' }, 60),
		note('notebook', {}, 100)
	];

	it('filters by line, lesson and notebook scope', () => {
		expect(notesForLine(corpus, 'fr-01', 'fr-01-l1').map((n) => n.id)).toEqual([
			'new-line',
			'old-line'
		]);
		expect(notesForLesson(corpus, 'fr-01').map((n) => n.id)).toEqual(['lesson']);
		expect(unscopedNotes(corpus).map((n) => n.id)).toEqual(['notebook']);
	});

	it('orders a lesson step: active line first, then the rest of the lesson', () => {
		expect(lessonStepOrder(corpus, 'fr-01', 'fr-01-l1').map((n) => n.id)).toEqual([
			'new-line',
			'old-line',
			'other-line',
			'lesson'
		]);
		// No active line: everything belonging to the lesson, recent-first.
		expect(lessonStepOrder(corpus, 'fr-01').map((n) => n.id)).toEqual([
			'other-line',
			'lesson',
			'new-line',
			'old-line'
		]);
	});

	it('sorts the notebook most recently touched first', () => {
		expect(recentFirst(corpus)[0].id).toBe('notebook');
	});
});

describe('NotesStore', () => {
	it('hydrates from the adapter, dropping malformed rows instead of failing', async () => {
		const backing = memoryPersistence([note('kept', { lessonId: 'fr-01' }, 5)]);
		await backing.save({ ...note('bad', {}, 6), body: '' } as NoteEntry);
		const store = new NotesStore();
		await store.hydrate(backing);
		expect(store.loaded).toBe(true);
		expect(store.persisted).toBe(true);
		expect(store.all.map((n) => n.id)).toEqual(['kept']);
	});

	it('adds, updates and removes through the adapter', async () => {
		const backing = memoryPersistence();
		const store = new NotesStore();
		await store.hydrate(backing);

		const added = store.add('  first thought  ', { lessonId: 'fr-01', lineId: 'fr-01-l1' });
		expect(added?.body).toBe('first thought');
		expect(store.add('   ')).toBeNull();
		await flush();
		expect(backing.dump().map((n) => n.body)).toEqual(['first thought']);

		store.update(added!.id, 'second thought');
		await flush();
		expect(backing.dump()[0].body).toBe('second thought');
		expect(backing.dump()[0].scope).toEqual({ lessonId: 'fr-01', lineId: 'fr-01-l1' });

		// Emptying a note removes it; so does remove().
		store.update(added!.id, '   ');
		await flush();
		expect(store.all).toEqual([]);
		expect(backing.dump()).toEqual([]);
	});

	it('a reload from the same adapter still has the note', async () => {
		const backing = memoryPersistence();
		const first = new NotesStore();
		await first.hydrate(backing);
		first.add('keep me', { lessonId: 'fr-01' });
		await flush();

		const second = new NotesStore();
		await second.hydrate(backing);
		expect(second.all.map((n) => n.body)).toEqual(['keep me']);
	});

	it('degrades to memory, honestly unpersisted, when storage fails', async () => {
		const failing: NotesPersistence = {
			load: async () => [],
			save: async () => {
				throw new Error('blocked');
			},
			remove: async () => {
				throw new Error('blocked');
			}
		};
		const store = new NotesStore();
		await store.hydrate(failing);
		store.add('still here for the session');
		await flush();
		// The note survives in memory; the store stops claiming persistence.
		expect(store.all.map((n) => n.body)).toEqual(['still here for the session']);
		expect(store.persisted).toBe(false);
	});
});
