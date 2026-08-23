<script lang="ts" module>
	/** One bar of `.wv`: height in px, plus the `.wb` / `.wbB` ink colour. */
	export type WaveBar = { h: number; tone?: 'ink' | 'blue'; dim?: boolean };
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		bars,
		tone = 'ink',
		class: className
	}: { bars: WaveBar[]; tone?: 'ink' | 'blue'; class?: string } = $props();
</script>

<div data-slot="waveform" class={cn('flex h-[34px] items-end gap-[2px]', className)}>
	{#each bars as bar, i (i)}
		<div
			style:height="{bar.h}px"
			style:opacity={bar.dim ? 0.3 : undefined}
			class={cn(
				'w-[4px] rounded-[2px]',
				(bar.tone ?? tone) === 'blue' ? 'bg-accent-blue' : 'bg-ink'
			)}
		></div>
	{/each}
</div>
