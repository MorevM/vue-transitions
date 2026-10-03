import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { createVuePlugin } from 'vite-plugin-vue2';

const fromConfig = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	root: fromConfig('../../tests/e2e/apps/vue2'),
	cacheDir: fromConfig('../../tmp/vite-e2e/vue2'),
	plugins: [createVuePlugin()],
	resolve: {
		alias: [
			{
				find: '@morev/vue-transitions/styles',
				replacement: fromConfig('../../dist/vue2/index.css'),
			},
			{
				find: '@morev/vue-transitions',
				replacement: fromConfig('../../dist/vue2/vue-transitions.js'),
			},
			{
				find: '@e2e',
				replacement: fromConfig('../../tests/e2e/apps/shared'),
			},
			{
				find: 'vue',
				replacement: fromConfig('./node_modules/vue/dist/vue.runtime.esm.js'),
			},
		],
	},
	server: {
		host: '127.0.0.1',
		port: 4172,
		strictPort: true,
	},
});
