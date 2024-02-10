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
			formats: ['es', 'cjs', 'umd'],
			name: 'vueTransitions',
			fileName: (format) => `vue-transitions.${format}.js`,
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
