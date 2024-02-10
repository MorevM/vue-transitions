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
			formats: ['es', 'cjs', 'umd'],
			name: 'vueTransitions',
			fileName: (format) => `vue-transitions.${format}.js`,
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
