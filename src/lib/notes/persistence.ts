/**
 * Notes persistence — the storage decision from the aside-harness spec §3:
 * notes are personal data, kept in IndexedDB on this device, in nothing
 * telemetric, behind an adapter so the store (and its tests) never depend on
 * a browser database being present.
 */
import type { NoteEntry } from './notes.js';

export interface NotesPersistence {
	/** Every stored row, unvalidated — the store validates and drops bad rows. */
	load(): Promise<unknown[]>;
	save(note: NoteEntry): Promise<void>;
	remove(id: string): Promise<void>;
}

/**
 * In-memory adapter: the unit-test double, and the graceful floor when
 * IndexedDB is unavailable — the notebook keeps working for the session, it
 * just cannot promise tomorrow.
 */
export function memoryPersistence(
	initial: readonly NoteEntry[] = []
): NotesPersistence & { dump(): NoteEntry[] } {
	const rows = new Map(initial.map((note) => [note.id, note]));
	return {
		async load() {
			return [...rows.values()];
		},
		async save(note) {
			rows.set(note.id, note);
		},
		async remove(id) {
			rows.delete(id);
		},
		dump() {
			return [...rows.values()];
		}
	};
}

const DB_NAME = 'ray-of-light.notes.v1';
const STORE = 'notes';

function settle<T>(request: IDBRequest<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
	});
}

/**
 * IndexedDB adapter. Rejects when the database cannot be opened (unsupported
 * browser, blocked storage) — the caller degrades to memory rather than
 * crashing, mirroring how the profile store survives a blocked localStorage.
 */
export function indexedDbPersistence(): Promise<NotesPersistence> {
	return new Promise((resolve, reject) => {
		if (typeof indexedDB === 'undefined') {
			reject(new Error('IndexedDB unavailable'));
			return;
		}
		let request: IDBOpenDBRequest;
		try {
			request = indexedDB.open(DB_NAME, 1);
		} catch (error) {
			reject(error);
			return;
		}
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(STORE)) {
				db.createObjectStore(STORE, { keyPath: 'id' });
			}
		};
		request.onerror = () => reject(request.error ?? new Error('IndexedDB open failed'));
		request.onsuccess = () => {
			const db = request.result;
			const store = (mode: IDBTransactionMode) => db.transaction(STORE, mode).objectStore(STORE);
			resolve({
				load: () => settle(store('readonly').getAll()) as Promise<unknown[]>,
				save: (note) => settle(store('readwrite').put(note)).then(() => undefined),
				remove: (id) => settle(store('readwrite').delete(id)).then(() => undefined)
			});
		};
	});
}
