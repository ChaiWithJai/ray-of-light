import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: '.',
	timeout: 420_000,
	workers: 1,
	reporter: 'list',
	use: { baseURL: 'http://localhost:4174' },
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1200, height: 800 } } },
		{
			name: 'mobile',
			use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true }
		}
	],
	webServer: {
		command: 'npm --prefix ../../.. run preview -- --port 4174',
		port: 4174,
		reuseExistingServer: true,
		timeout: 120_000
	}
});
