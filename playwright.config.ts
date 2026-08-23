import { defineConfig, devices } from '@playwright/test';

/**
 * Chromium is preinstalled in this environment (build 1194) but @playwright/test
 * pins a newer build, so point it at the binary that exists rather than
 * downloading another one.
 */
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

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
				launchOptions: { executablePath: CHROMIUM }
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
