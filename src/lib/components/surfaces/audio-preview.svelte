<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1d · 4 · Audio preview -->
<W.Phone class="justify-center gap-[18px]">
	<W.TitleBar left="✕" center="Lesson 51 · step 1" />

	<div class="flex-1"></div>

	<W.PlayButton size="lg" />
	<div class="text-center text-[16px]">Just listen.</div>
	<W.Muted class="text-center">No text yet — let your ears go first.</W.Muted>

	<div class="flex items-center justify-center gap-2">
		<div class="size-[8px] rounded-full bg-accent-blue"></div>
		<div class="size-[8px] rounded-full border-[1.5px] border-ink-faint"></div>
	</div>
	<W.Muted class="text-center">listen 1 of 2</W.Muted>

	<div class="flex-1"></div>

	<W.RationaleNote>unbiased sound perception before any spelling bias</W.RationaleNote>

	<W.SketchButton>I've listened twice →</W.SketchButton>
</W.Phone>
