<script lang="ts">
	/**
	 * 1v · Settings. Everything here reduces irrelevant load; nothing here teaches.
	 */
	import * as W from '$lib/components/ui/index.js';
	import audioProvenance from '$lib/content/audio-provenance.json';
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

<W.Shell title="Settings" back="/today">
	<div class="anim-rise pt-2">
		<W.Heading>Settings</W.Heading>
		<W.Muted class="mt-1">Adjust the experience so it fits the way you learn.</W.Muted>
	</div>

	<W.Card>
		<div class="text-sm">Language</div>
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
	</W.Card>

	<W.Card>
		<div class="text-sm">Audio speed</div>
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
	</W.Card>

	<W.Card>
		<div class="text-sm">Text size</div>
		<W.Slider bind:value={textScale} label="Text size" />
	</W.Card>

	<W.Card>
		<div class="flex items-center justify-between gap-2">
			<div class="text-sm">Transliteration (Tamil)</div>
			<W.Pill active={s.transliteration}>{s.transliteration ? 'on' : 'off'}</W.Pill>
		</div>
		<W.Chip onclick={() => profile.updateSettings({ transliteration: !s.transliteration })}>
			turn {s.transliteration ? 'off' : 'on'}
		</W.Chip>
		<W.Muted>a temporary scaffold; the course nudges you to turn it off around lesson 30</W.Muted>
	</W.Card>

	<W.Card>
		<div class="flex items-center justify-between gap-2">
			<div class="text-sm">Tracking</div>
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
	</W.Card>

	{#if audioProvenance.synthesized}
		<W.Card>
			<div class="text-sm">About the audio</div>
			<W.Muted>
				Lesson audio is a draft synthesized voice ({audioProvenance.voices[profile.language]},
				{audioProvenance.engine}); native recordings are pending. Treat its pronunciation as
				a scaffold rather than a model.
			</W.Muted>
		</W.Card>
	{/if}

	<W.Card>
		<div class="text-sm">Your notebook</div>
		<W.Muted>
			Every note you have written — during lessons and on your own. Notes stay on this
			device.
		</W.Muted>
		<W.Button href="/notebook" class="w-auto self-start px-4 text-sm">Open your notebook</W.Button>
	</W.Card>

	<W.Card>
		<div class="text-sm">About the method</div>
		<W.Muted>
			How the course works: the two waves, each technique, the capability ladder and the
			terms the lessons use.
		</W.Muted>
		<W.Button href="/wiki" class="self-start w-auto px-4 text-sm">Read the method guide</W.Button>
	</W.Card>

	<W.Card>
		<div class="text-sm">About your evidence</div>
		<W.Muted>
			Matched constructions record recognition evidence only; situation matching is feedback,
			not progress. Incorrect attempts are kept to guide later repair. No check in this app
			judges full grammar or native naturalness.
		</W.Muted>
	</W.Card>

	<W.Card tone="warn">
		<div class="text-sm">Reset everything</div>
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
	</W.Card>

</W.Shell>
