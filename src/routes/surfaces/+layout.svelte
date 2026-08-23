<script lang="ts">
	/**
	 * The wireframe gallery keeps the original artboard presentation: these 22
	 * screens document the design source and are deliberately still drawn as the
	 * handoff's floating sketch phones. Production routes use the Shell instead.
	 */
	let { children } = $props();
</script>

<main
	class="flex min-h-screen items-start justify-center bg-paper px-4 pt-[40px] pb-[32px] font-hand text-ink sm:px-[44px]"
>
	{@render children()}
</main>
