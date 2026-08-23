<script lang="ts">
	/**
	 * 1v · Settings. Everything here reduces irrelevant load; nothing here teaches.
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import { LANGUAGE_LABELS } from '$lib/content/index.js';
	import type { LanguageCode } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const s = $derived(profile.settings);
	let confirmingReset = $state(false);

	let textScale = $state(55);
	$effect(() => {
		textScale = profile.settings.textScale;
	});
	$effect(() => {
		if (textScale !== profile.settings.textScale) profile.updateSettings({ textScale });
	});
</script>

<svelte:head><title>Settings</title></svelte:head>

<W.Phone>
	<W.TitleBar left="◁" center="Settings" />

	<W.SketchCard>
		<div class="text-[13.5px]">Language</div>
		<div class="flex items-center gap-2">
			{#each ['fr', 'ta'] as const as code (code)}
					{@const blocked = Boolean(profile.activeSession) && profile.language !== code}
					<W.Chip
						active={profile.language === code}
						aria-disabled={blocked}
						disabled={blocked}
						class={blocked ? 'opacity-45' : ''}
						onclick={() => {
							if (!blocked) profile.setLanguage(code as LanguageCode);
						}}
				>
					{LANGUAGE_LABELS[code]}
				</W.Chip>
			{/each}
		</div>
			<W.Muted>Progress is kept separately per language.</W.Muted>
			{#if profile.activeSession}
				<W.Muted>Finish or resume the active session before switching languages.</W.Muted>
			{/if}
	</W.SketchCard>

	<W.SketchCard>
		<div class="text-[13.5px]">Audio speed</div>
		<div class="flex items-center gap-2">
			<W.Chip active={s.audioSpeed === 0.75} onclick={() => profile.updateSettings({ audioSpeed: 0.75 })}>
				0.75×
			</W.Chip>
			<W.Chip active={s.audioSpeed === 1} onclick={() => profile.updateSettings({ audioSpeed: 1 })}>
				1×
			</W.Chip>
			<W.Chip
				active={s.slowFirstListen}
				onclick={() => profile.updateSettings({ slowFirstListen: !s.slowFirstListen })}
			>
				slow first listen
			</W.Chip>
		</div>
	</W.SketchCard>

	<W.SketchCard>
		<div class="text-[13.5px]">Text size</div>
		<W.SketchSlider bind:value={textScale} label="Text size" />
	</W.SketchCard>

	<W.SketchCard>
		<div class="flex items-center justify-between gap-2">
			<div class="text-[13.5px]">Transliteration (Tamil)</div>
			<W.Pill active={s.transliteration}>{s.transliteration ? 'on' : 'off'}</W.Pill>
		</div>
		<W.Chip onclick={() => profile.updateSettings({ transliteration: !s.transliteration })}>
			turn {s.transliteration ? 'off' : 'on'}
		</W.Chip>
		<W.Muted>a temporary scaffold — nudges you to turn it off around L30</W.Muted>
	</W.SketchCard>

	<W.SketchCard>
		<div class="flex items-center justify-between gap-2">
			<div class="text-[13.5px]">Tracking</div>
			<W.Pill>{s.trackingMode}</W.Pill>
		</div>
		<W.Chip
			onclick={() =>
				profile.updateSettings({
					trackingMode: s.trackingMode === 'two-finger' ? 'single-guide' : 'two-finger'
				})}
		>
			use {s.trackingMode === 'two-finger' ? 'single guide' : 'two fingers'}
		</W.Chip>
		<W.Muted>
			accessibility: one linked reading guide instead. Arrow keys always work either way.
		</W.Muted>
	</W.SketchCard>

	<W.SketchCard tone="warn">
		<div class="text-[13.5px]">Reset everything</div>
		<W.Muted>Erases your plan, evidence and progress on this device. Irreversible.</W.Muted>
		{#if confirmingReset}
			<div class="flex items-center gap-2">
				<W.Chip
					onclick={() => {
						profile.reset();
						confirmingReset = false;
					}}
				>
					yes, erase
				</W.Chip>
				<W.Chip active onclick={() => (confirmingReset = false)}>cancel</W.Chip>
			</div>
		{:else}
			<W.Chip onclick={() => (confirmingReset = true)}>reset…</W.Chip>
		{/if}
	</W.SketchCard>

	<W.TabBar />
</W.Phone>
