<script lang="ts">
	/**
	 * The day sprite — Today's day counter given a time-shape (issue #46, S1).
	 *
	 * A sun travelling the course's arc. Position and form derive entirely from
	 * `daySpriteForm` over real schedule state (worked lessons, lesson count,
	 * course completion) — the sprite is the derived journey, drawn, and can
	 * never disagree with the JourneyArc under it. Phases (spec §3.4 — "the day
	 * sprite ages through the plan"):
	 *
	 *   sprout   early: the sun is low and young, a sprout on the path ahead
	 *   stride   mid: the sun is underway, stride marks trailing it
	 *   lantern  late: the descending sun is carried as a lantern
	 *   rest     course complete: the lantern set down at the path's end
	 *
	 * Calm-first: still, no animation, decorative only (the literal "day N"
	 * text always sits beside it), hence aria-hidden.
	 */
	import { daySpriteForm, DAY_ARC, type JourneyInput } from '$lib/time-sprites.js';
	import { cn } from '$lib/utils.js';

	let {
		dayNumber,
		workedLessons,
		lessonCount,
		courseComplete = false,
		size = 34,
		class: className
	}: JourneyInput & { size?: number; class?: string } = $props();

	const form = $derived(daySpriteForm({ dayNumber, workedLessons, lessonCount, courseComplete }));

	// One warm accent for all time sprites — a different, fixed hue family from
	// the construction cast so time never reads as a character to collect.
	const accent = 'hsl(36 42% 44%)';
	const wash = 'hsl(40 48% 86%)';
	const ink = 'var(--color-text-soft)';
	const faint = 'var(--color-text-faint)';

	const G = DAY_ARC.groundY;
	const left = DAY_ARC.cx - DAY_ARC.radius;
	const right = DAY_ARC.cx + DAY_ARC.radius;
</script>

<svg
	viewBox="0 0 48 40"
	width={size}
	height={size * (40 / 48)}
	class={cn('shrink-0', className)}
	data-day-sprite
	data-phase={form.phase}
	data-day={form.dayNumber}
	aria-hidden="true"
>
	<g stroke-linecap="round" stroke-linejoin="round" fill="none">
		<!-- the path of the plan: horizon plus the day's arc -->
		<path d="M {left - 3} {G} H {right + 3}" stroke={ink} stroke-width="1.4" />
		<path
			d="M {left} {G} A {DAY_ARC.radius} {DAY_ARC.radius} 0 0 1 {right} {G}"
			stroke={faint}
			stroke-width="1.2"
			stroke-dasharray="2.5 3.5"
		/>

		{#if form.phase === 'sprout'}
			<!-- young sun, low on the arc; a sprout on the path ahead -->
			<circle cx={form.sunX} cy={form.sunY} r="3.4" fill={wash} stroke={accent} stroke-width="1.5" />
			<path
				d="M {DAY_ARC.cx + 4} {G} q 0.4 -3 0 -4.4 M {DAY_ARC.cx + 4} {G - 3} q -2.4 -0.4 -3.2 -2.4 q 2.6 -0.6 3.2 2.4"
				stroke={accent}
				stroke-width="1.3"
			/>
		{:else if form.phase === 'stride'}
			<!-- the sun underway: fuller, with stride marks trailing it -->
			<circle cx={form.sunX} cy={form.sunY} r="4" fill={wash} stroke={accent} stroke-width="1.5" />
			<path
				d="M {form.sunX} {form.sunY - 6.5} v -2 M {form.sunX + 5.6} {form.sunY - 3.2} l 1.7 -1"
				stroke={accent}
				stroke-width="1.3"
			/>
			<path
				d="M {form.sunX - 8} {form.sunY + 1} h -4 M {form.sunX - 7} {form.sunY + 4.5} h -5.5"
				stroke={accent}
				stroke-width="1.3"
				opacity="0.7"
			/>
		{:else if form.phase === 'lantern'}
			<!-- late: the descending sun carried as a lantern -->
			<path d="M {form.sunX} {form.sunY - 7} q 3 -2.4 5 -1" stroke={ink} stroke-width="1.3" />
			<rect
				x={form.sunX - 3.2}
				y={form.sunY - 4.4}
				width="6.4"
				height="8.2"
				rx="2.4"
				fill={wash}
				stroke={ink}
				stroke-width="1.4"
			/>
			<circle cx={form.sunX} cy={form.sunY - 0.3} r="1.3" fill={accent} />
		{:else}
			<!-- rest: the lantern set down at the path's end -->
			<rect
				x={right - 6.4}
				y={G - 8.4}
				width="6.4"
				height="8.2"
				rx="2.4"
				fill={wash}
				stroke={ink}
				stroke-width="1.4"
			/>
			<circle cx={right - 3.2} cy={G - 4.2} r="1.3" fill={accent} />
			<path d="M {right - 6.2} {G - 8.6} q 3 -2.6 6 0" stroke={ink} stroke-width="1.3" />
		{/if}
	</g>
</svg>
