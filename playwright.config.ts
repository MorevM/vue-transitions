import { defineConfig } from '@playwright/test';

const VUE_2_URL = 'http://127.0.0.1:4172';
const VUE_3_URL = 'http://127.0.0.1:4173';

export default defineConfig({
	testDir: './tests/e2e',
	testMatch: '**/*.e2e.ts',
	outputDir: './tmp/playwright/test-results',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: 0,
	reporter: process.env.CI
		? [
			['list'],
			['html', { open: 'never', outputFolder: './tmp/playwright/report' }],
		]
		: 'list',
	use: {
		browserName: 'chromium',
		colorScheme: 'light',
		deviceScaleFactor: 1,
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
		video: 'off',
		viewport: { width: 800, height: 600 },
	},
	projects: [
		{
			name: 'vue2-chromium',
			metadata: { vueMajor: 2 },
			use: { baseURL: VUE_2_URL },
		},
		{
			name: 'vue3-chromium',
			metadata: { vueMajor: 3 },
			use: { baseURL: VUE_3_URL },
		},
	],
	webServer: [
		{
			name: 'Vue 2 harness',
			command:
				'pnpm run build:vue2 && ./node_modules/.bin/vite --config builders/vue2-builder/vite-e2e.config.js',
			wait: { stdout: /Local:/ },
			timeout: 120_000,
		},
		{
			name: 'Vue 3 harness',
			command:
				'pnpm run build:vue3 && ./node_modules/.bin/vite --config builders/vue3-builder/vite-e2e.config.js',
			wait: { stdout: /Local:/ },
			timeout: 120_000,
		},
	],
});
