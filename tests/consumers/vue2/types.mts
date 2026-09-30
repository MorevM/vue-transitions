import type { VueConstructor } from 'vue';
import vueTransitions, {
	plugin,
	TransitionCombined,
} from '@morev/vue-transitions/vue2';
import type { PluginOptions } from '@morev/vue-transitions/vue2';

declare const vueConstructor: VueConstructor;

const options = {
	componentDefaultProps: {
		TransitionCombined: {
			enter: { preset: 'fade' },
			leave: { preset: 'slide', offset: [0, 16] },
		},
	},
	defaultProps: { duration: 175 },
} satisfies PluginOptions;

vueConstructor.use(vueTransitions, options);
vueConstructor.use(plugin(options));
export { TransitionCombined };
