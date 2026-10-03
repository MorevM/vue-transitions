import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';

const fromConfig = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	root: fromConfig('../../tests/e2e/apps/vue3'),
	cacheDir: fromConfig('../../tmp/vite-e2e/vue3'),
	plugins: [vue()],
	resolve: {
		alias: [
			{
				find: '@morev/vue-transitions/styles',
				replacement: fromConfig('../../dist/vue3/index.css'),
			},
			{
				find: '@morev/vue-transitions',
				replacement: fromConfig('../../dist/vue3/vue-transitions.js'),
			},
			{
				find: '@e2e',
				replacement: fromConfig('../../tests/e2e/apps/shared'),
			},
			{
				find: 'vue',
				replacement: fromConfig('./node_modules/vue/dist/vue.runtime.esm-bundler.js'),
			},
		],
	},
	server: {
		host: '127.0.0.1',
		port: 4173,
		strictPort: true,
	},
});
