import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
	plugins: [createVuePlugin()],
	build: {
		minify: 'terser',
		assetsDir: '',
		emptyOutDir: true,
		lib: {
			entry: '../../src/index.js',
			formats: ['es', 'cjs'],
			name: 'vueTransitions',
			fileName: (format) => {
				const extension = format === 'cjs' ? 'cjs' : 'js';
				return `vue-transitions.${extension}`;
			},
		},
		cssCodeSplit: true,
		rollupOptions: {
			external: ['vue', '@morev/utils'],
			output: {
				dir: '../../dist/vue2',
				globals: {
					vue: 'Vue',
				},
				assetFileNames: '[name].[ext]',
			},
		},
	},
});
