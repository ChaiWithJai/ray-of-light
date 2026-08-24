<script lang="ts">
	/**
	 * The plan-duration sprite (issue #46, S1) — a daily-minutes choice drawn
	 * as a candle. Height and wax notches are the minutes themselves
	 * (`durationShape`: one notch per five minutes), so 15 / 25 / 40 are three
	 * legibly different shapes of the same object: how much of the day burns
	 * for this. Deterministic from the minutes; still; decorative beside the
	 * copy that states the number, hence aria-hidden.
	 */
	import { durationShape } from '$lib/time-sprites.js';
	import { cn } from '$lib/utils.js';

	let {
		minutes,
		size = 44,
		class: className
	}: { minutes: number; size?: number; class?: string } = $props();

	const shape = $derived(durationShape(minutes));

	// Same fixed warm family as the day sprite — time, not a cast member.
	const accent = 'hsl(36 42% 44%)';
	const wash = 'hsl(40 48% 86%)';
	const ink = 'var(--color-text-soft)';

	const BASE = 44;
	const top = $derived(BASE - shape.height);
	/** Wax notch y-positions: a tick per five minutes, skipping the rim. */
	const notchYs = $derived(
		Array.from({ length: shape.notches - 1 }, (_, i) => BASE - ((i + 1) * shape.height) / shape.notches)
	);
</script>

<svg
	viewBox="0 0 48 48"
	width={size}
	height={size}
	class={cn('shrink-0', className)}
	data-duration-sprite
	data-minutes={shape.minutes}
	aria-hidden="true"
>
	<g stroke-linecap="round" stroke-linejoin="round" fill="none">
		<!-- ground -->
		<path d="M 12 {BASE} H 36" stroke={ink} stroke-width="1.4" />
		<!-- candle body: height = the commitment -->
		<rect
			x="19"
			y={top}
			width="10"
			height={shape.height}
			rx="2"
			fill={wash}
			stroke={ink}
			stroke-width="1.5"
		/>
		<!-- one wax notch per five minutes -->
		{#each notchYs as y (y)}
			<path d="M 19.8 {y} h 2.6" stroke={ink} stroke-width="1.1" opacity="0.55" />
		{/each}
		<!-- wick and flame -->
		<path d="M 24 {top} v -2.2" stroke={ink} stroke-width="1.3" />
		<path
			d="M 24 {top - 8} q 2.6 3 0 5.6 q -2.6 -2.6 0 -5.6"
			fill={wash}
			stroke={accent}
			stroke-width="1.4"
		/>
		<circle cx="24" cy={top - 4} r="0.9" fill={accent} />
	</g>
</svg>
