import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { vitePlugin } from '@morev/v-bem-transformer';

export default defineConfig({
	root: 'playground',
	plugins: [
		vitePlugin({
			directiveName: 'v-bem',
			transformInclude: (id) => true,
		}),
		createVuePlugin(),
	],
	server: {
		port: 3000,
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
		lib: {
			entry: '../src/index.js',
			formats: ['es', 'cjs', 'umd'],
			name: 'vueTransitions',
			fileName: (format) => `vue-transitions.${format}.js`,
		},
		cssCodeSplit: true,
		rollupOptions: {
			external: ['vue'],
			output: {
				dir: 'dist',
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
});
