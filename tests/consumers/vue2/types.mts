import type { VueConstructor } from 'vue';
import vueTransitions, {
	plugin,
	TransitionMixed,
} from '@morev/vue-transitions/vue2';
import type { PluginOptions } from '@morev/vue-transitions/vue2';

declare const vueConstructor: VueConstructor;

const options = {
	componentDefaultProps: {
		TransitionMixed: {
			enter: { preset: 'fade' },
			leave: { preset: 'slide', offset: [0, 16] },
		},
	},
	defaultProps: {
		duration: 175,
		stagger: { enter: 50, leave: 25 },
	},
} satisfies PluginOptions;

vueConstructor.use(vueTransitions, options);
vueConstructor.use(plugin(options));
export { TransitionMixed };
