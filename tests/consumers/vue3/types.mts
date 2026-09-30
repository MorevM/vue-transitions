import { createApp } from 'vue';
import vueTransitions, {
	plugin,
	TransitionCombined,
} from '@morev/vue-transitions';
import explicitVue3 from '@morev/vue-transitions/vue3';
import type { PluginOptions } from '@morev/vue-transitions';
import '@morev/vue-transitions/styles';

const options = {
	componentDefaultProps: {
		TransitionCombined: {
			enter: { preset: 'scale', scale: 0.8 },
			leave: { preset: 'fade' },
		},
	},
	defaultProps: { duration: 175 },
} satisfies PluginOptions;
const app = createApp({});

app.use(vueTransitions, options);
app.use(explicitVue3);
app.use(plugin(options));
export { TransitionCombined };
