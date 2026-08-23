<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { profile } from '$lib/stores/profile.svelte.js';

	let { children } = $props();

	// SSR renders the empty profile; the real one arrives on the client. Doing
	// this in the root layout means every route can read `profile` synchronously.
	$effect.pre(() => profile.hydrate());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="flex min-h-screen items-start justify-center bg-paper px-4 pt-[40px] pb-[32px] sm:px-[44px]">
	{#if profile.loaded && !profile.persisted}
		<div
			role="alert"
			class="fixed top-2 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded border border-note bg-paper px-3 py-2 text-center text-sm text-note shadow"
		>
			Changes are only in this tab and will be lost on refresh because local storage is unavailable.
		</div>
	{/if}
	{@render children()}
</main>
