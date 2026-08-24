/**
 * The line currently under the learner's attention in a mounted spread.
 * The spread step publishes it; the notes surfaces read it to offer
 * line-scoped capture (#48). Cleared when the spread unmounts, so no other
 * step ever offers a stale line.
 */
export type ActiveLine = { lessonId: string; lineId: string; label: string };

class ActiveLineStore {
	#current = $state<ActiveLine | null>(null);

	get current(): ActiveLine | null {
		return this.#current;
	}

	set(next: ActiveLine) {
		this.#current = next;
	}

	clear() {
		this.#current = null;
	}
}

export const activeLine = new ActiveLineStore();
