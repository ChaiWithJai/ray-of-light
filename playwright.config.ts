import { defineConfig, devices } from '@playwright/test';

/**
 * Let Playwright resolve its managed Chromium by default. Constrained runners
 * may opt into a system-provided browser without baking a platform-specific
 * path into the repository.
 */
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?.trim();

export default defineConfig({
	testDir: 'e2e',
	timeout: 30_000,
	fullyParallel: true,
	reporter: process.env.CI ? 'line' : 'list',
	use: {
		baseURL: 'http://localhost:4173'
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					args: ['--autoplay-policy=no-user-gesture-required'],
					...(chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : {})
				}
			}
		}
	],
	webServer: {
		command: 'npm run build && npm run preview -- --port 4173',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
