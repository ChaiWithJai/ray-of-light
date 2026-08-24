/**
 * The notes store — local-first, beside the profile store, same posture:
 * writes land in memory synchronously so the UI never waits on a database,
 * persistence follows, and a persistence failure degrades to an honest
 * cannot-keep-this state instead of a crash (spec §3, §5 T0).
 */
import { browser } from '$app/environment';
import { NoteEntry, recentFirst, type NoteScope } from '$lib/notes/notes.js';
import {
	indexedDbPersistence,
	memoryPersistence,
	type NotesPersistence
} from '$lib/notes/persistence.js';

function noteId(): string {
	return typeof crypto !== 'undefined' && 'randomUUID' in crypto
		? crypto.randomUUID()
		: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export class NotesStore {
	#notes = $state<NoteEntry[]>([]);
	#loaded = $state(false);
	#persisted = $state(true);
	#persistence: NotesPersistence | null = null;
	#hydrating: Promise<void> | null = null;

	/**
	 * Load once. Without an injected adapter (production) it opens IndexedDB;
	 * when that fails it falls back to memory and marks the store unpersisted.
	 * Tests inject an adapter directly.
	 */
	hydrate(persistence?: NotesPersistence): Promise<void> {
		if (this.#hydrating) return this.#hydrating;
		if (!persistence && !browser) return Promise.resolve();
		this.#hydrating = this.#hydrate(persistence);
		return this.#hydrating;
	}

	async #hydrate(persistence?: NotesPersistence): Promise<void> {
		let backing = persistence ?? null;
		if (!backing) {
			try {
				backing = await indexedDbPersistence();
			} catch {
				backing = null;
			}
		}
		if (!backing) {
			this.#persistence = memoryPersistence();
			this.#persisted = false;
			this.#loaded = true;
			return;
		}
		this.#persistence = backing;
		try {
			const raw = await backing.load();
			const valid: NoteEntry[] = [];
			for (const row of raw) {
				// A malformed row is a row from an older/broken build. Dropping it
				// loses one note; failing the whole notebook would lose them all.
				const parsed = NoteEntry.safeParse(row);
				if (parsed.success) valid.push(parsed.data);
			}
			this.#notes = recentFirst(valid);
		} catch {
			this.#persisted = false;
		}
		this.#loaded = true;
	}

	get loaded(): boolean {
		return this.#loaded;
	}

	/** False when writes are not reaching storage — surfaced honestly in the UI. */
	get persisted(): boolean {
		return this.#persisted;
	}

	get all(): NoteEntry[] {
		return this.#notes;
	}

	add(body: string, scope: NoteScope = {}): NoteEntry | null {
		const trimmed = body.trim();
		if (!trimmed) return null;
		const now = Date.now();
		const note: NoteEntry = { id: noteId(), scope, body: trimmed, createdAt: now, updatedAt: now };
		this.#notes = [note, ...this.#notes];
		this.#write((p) => p.save(note));
		return note;
	}

	/** Rewrite a note's body in place. An emptied note is removed. */
	update(id: string, body: string) {
		const trimmed = body.trim();
		if (!trimmed) {
			this.remove(id);
			return;
		}
		const existing = this.#notes.find((note) => note.id === id);
		if (!existing || existing.body === trimmed) return;
		const updated: NoteEntry = { ...existing, body: trimmed, updatedAt: Date.now() };
		this.#notes = this.#notes.map((note) => (note.id === id ? updated : note));
		this.#write((p) => p.save(updated));
	}

	remove(id: string) {
		if (!this.#notes.some((note) => note.id === id)) return;
		this.#notes = this.#notes.filter((note) => note.id !== id);
		this.#write((p) => p.remove(id));
	}

	#write(op: (p: NotesPersistence) => Promise<void>) {
		const persistence = this.#persistence;
		if (!persistence) return;
		op(persistence)
			.then(() => {
				this.#persisted = true;
			})
			.catch(() => {
				// Storage failed mid-session: keep the note in memory, tell the truth.
				this.#persisted = false;
			});
	}
}

export const notes = new NotesStore();
