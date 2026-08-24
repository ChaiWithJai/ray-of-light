import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	],

	test: {
		// Playwright owns e2e/; vitest owns the unit suites next to their sources,
		// plus the node-side pipeline suites in scripts/ (which need node builtins
		// the app tsconfig deliberately excludes). Without this, vitest tries to
		// run the Playwright spec and fails on its fixtures rather than on
		// anything real.
		include: ['src/**/*.{test,spec}.{js,ts}', 'scripts/**/*.{test,spec}.{mts,ts}'],
		exclude: ['e2e/**', 'node_modules/**']
	}
});
