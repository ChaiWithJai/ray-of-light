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

<!-- Composition belongs to each route's Shell (or, for the /surfaces wireframe
     gallery, to its own layout) — the root stays a bare themed ground. -->
{@render children()}
