import { defineConfig } from 'vitest/config';

export default defineConfig({
	cacheDir: './tmp/vitest/cache',
	test: {
		watch: false,
		watchExclude: ['**/node_modules/**', '**/dist/**'],
		reporters: ['verbose'],
	},
});
