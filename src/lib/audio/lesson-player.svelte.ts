/**
 * Sentence-sliced lesson audio player.
 *
 * One recording exists per lesson (see scripts/generate-audio.mts); every line
 * carries measured `startMs`/`endMs` into that recording. This class wraps a
 * single HTMLAudioElement and exposes:
 *
 *   playAll()      the whole dialogue, `activeLine` tracking the current line
 *   playLine(i)    just one sentence — the slice AC 3 needs for line-follow
 *   rate           playbackRate; issue #1 permits time-stretch for slow mode,
 *                  so there is no second recording (schema `slowUrl` optional)
 *
 * `activeLine` / `playing` are runes, so components can render straight off
 * them. Construct per lesson; call destroy() on teardown.
 */
import type { Lesson } from '$lib/schemas/content.js';

export class LessonPlayer {
	playing = $state(false);
	/** Index into lesson.lines currently sounding, -1 when none. */
	activeLine = $state(-1);
	rate = $state(1);
	/**
	 * The recording failed to load. Audio is generated locally and untracked
	 * (issue #19), so offsets can exist while the file does not — a fresh clone
	 * before `npx tsx scripts/generate-audio.mts`. Surfaces the honest
	 * "no recording on this machine" state instead of a dead play button.
	 */
	failed = $state(false);

	#lesson: Lesson;
	#audio: HTMLAudioElement | null = null;
	#stopAtMs: number | null = null;
	#onEnded: (() => void) | null = null;

	constructor(lesson: Lesson) {
		this.#lesson = lesson;
	}

	/** False while the lesson's recording is pending (L1) or failed to load. */
	get available(): boolean {
		return !this.failed && !(this.#lesson.lines[0]?.audio.pending ?? true);
	}

	/**
	 * True only while there is something to resume. A finished recording reports
	 * `ended`, and resuming at EOF plays nothing — the second listen would be
	 * unreachable from the main button — so `ended` counts as not-started and
	 * toggle() restarts from the top instead.
	 */
	get started(): boolean {
		const a = this.#audio;
		return a !== null && a.currentTime > 0 && !a.ended;
	}

	#ensure(): HTMLAudioElement | null {
		if (!this.available) return null;
		if (!this.#audio) {
			const a = new Audio(this.#lesson.lines[0].audio.normalUrl);
			a.preload = 'auto';
			a.addEventListener('timeupdate', () => this.#tick(a));
			a.addEventListener('ended', () => this.#finish());
			a.addEventListener('pause', () => (this.playing = false));
			a.addEventListener('play', () => (this.playing = true));
			a.addEventListener('error', () => {
				this.failed = true;
				this.playing = false;
				this.activeLine = -1;
			});
			this.#audio = a;
		}
		this.#audio.playbackRate = this.rate;
		return this.#audio;
	}

	#tick(a: HTMLAudioElement) {
		const ms = a.currentTime * 1000;
		if (this.#stopAtMs !== null && ms >= this.#stopAtMs) {
			a.pause();
			this.#finish();
			return;
		}
		this.activeLine = this.#lesson.lines.findIndex(
			(l) =>
				l.audio.startMs !== undefined &&
				l.audio.endMs !== undefined &&
				ms >= l.audio.startMs &&
				ms < l.audio.endMs
		);
	}

	#finish() {
		const done = this.#onEnded;
		this.#stopAtMs = null;
		this.#onEnded = null;
		this.activeLine = -1;
		this.playing = false;
		done?.();
	}

	/** Play the whole dialogue from the top. */
	playAll(onEnded?: () => void) {
		const a = this.#ensure();
		if (!a) return;
		this.#stopAtMs = null;
		this.#onEnded = onEnded ?? null;
		a.currentTime = 0;
		void a.play();
	}

	/** Play a single line's slice (AC 3: audio can follow the active line). */
	playLine(i: number, onEnded?: () => void) {
		const a = this.#ensure();
		const line = this.#lesson.lines[i];
		if (!a || line?.audio.startMs === undefined || line.audio.endMs === undefined) return;
		this.#stopAtMs = line.audio.endMs;
		this.#onEnded = onEnded ?? null;
		a.currentTime = line.audio.startMs / 1000;
		void a.play();
	}

	pause() {
		this.#audio?.pause();
	}

	resume() {
		void this.#audio?.play();
	}

	/** Play/pause from one button: pause if sounding, resume if mid-way, else start over. */
	toggle(onEnded?: () => void) {
		if (this.playing) this.pause();
		else if (this.started) this.resume();
		else this.playAll(onEnded);
	}

	setRate(rate: number) {
		this.rate = rate;
		if (this.#audio) this.#audio.playbackRate = rate;
	}

	destroy() {
		this.#audio?.pause();
		this.#audio = null;
	}
}
