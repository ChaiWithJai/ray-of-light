import { defineConfig, devices } from '@playwright/test';

/**
 * Let Playwright resolve its managed Chromium by default. Constrained runners
 * may opt into a system-provided browser without baking a platform-specific
 * path into the repository.
 */
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?.trim();

/**
 * `reuseExistingServer` means whatever already listens on the port wins, so
 * parallel checkouts (worktrees, agents) silently test each other's stale
 * builds when they share 4173. Overriding the port isolates a run.
 */
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4173);

export default defineConfig({
	testDir: 'e2e',
	timeout: 30_000,
	fullyParallel: true,
	reporter: process.env.CI ? 'line' : 'list',
	use: {
		baseURL: `http://localhost:${port}`
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: chromiumExecutablePath
					? { executablePath: chromiumExecutablePath }
					: undefined
			}
		}
	],
	webServer: {
		command: `npm run build && npm run preview -- --port ${port} --strictPort`,
		port,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
