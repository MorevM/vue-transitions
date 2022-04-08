import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { vitePlugin } from '@morev/v-bem-transformer';

export default defineConfig({
	root: '../../playground',
	base: '/vue-transitions/',
	plugins: [
		vitePlugin({
			directiveName: 'v-bem',
			transformInclude: (id) => true,
		}),
		createVuePlugin(),
	],
	server: {
		port: 3000,
		open: true,
	},
	define: {},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use 'more-sass' as *;`,
			},
		},
	},
	build: {
		minify: 'terser',
		rollupOptions: {
			output: {
				dir: '../../playground-bundle',
			},
			input: '../../playground/index.html',
		},
	},
});
