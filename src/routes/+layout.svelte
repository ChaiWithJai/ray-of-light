<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="flex min-h-screen items-start justify-center bg-paper px-[44px] pt-[40px] pb-[32px]">
	{@render children()}
</main>
