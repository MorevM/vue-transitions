import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		watch: false,
		watchExclude: ['**/node_modules/**', '**/dist/**'],
		reporters: ['verbose'],
		cache: {
			dir: './tmp/vitest/cache',
		},
	},
});
