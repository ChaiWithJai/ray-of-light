<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
	import { surfaces } from '$lib/surfaces.js';
</script>

<svelte:head><title>Book</title></svelte:head>

<W.Phone class="min-h-[420px]">
	<W.TitleBar left="☰" center="Book" />
	<W.Muted>
		The canonical course. Lesson browsing arrives with the content pipeline; for now this
		lists the 22 designed surfaces.
	</W.Muted>

	<div class="flex flex-col gap-[6px]">
		{#each surfaces as surface (surface.id)}
			<a href="/surfaces/{surface.slug}" class="no-underline">
				<W.SketchCard class="p-[8px] hover:border-accent-blue">
					<div class="flex items-center justify-between gap-2">
						<div class="text-[13.5px] text-ink">{surface.n}. {surface.title}</div>
						<W.Pill>{surface.id}</W.Pill>
					</div>
				</W.SketchCard>
			</a>
		{/each}
	</div>

	<W.TabBar />
</W.Phone>
