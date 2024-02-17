import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const transformPlugin = ({
	name: 'vue2-to-vue3-transformer',
	transform: (context) => {
		return context
			.replace(
				'...this.$listeners,',
				'',
			)
			.replace(
				'// BUILD-TIME: TRANSITIONS IMPORT FOR VUE 3',
				`import { Transition, TransitionGroup } from 'vue';`,
			)
			.replace(
				`'transition-group' : 'transition'`,
				`TransitionGroup : Transition`,
			);
	},
});

export default defineConfig({
	plugins: [
		transformPlugin,
		vue(),
	],
	build: {
		emptyOutDir: true,
		minify: 'terser',
		assetsDir: '',
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
				dir: '../../dist/vue3',
				assetFileNames: '[name].[ext]',
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
});
