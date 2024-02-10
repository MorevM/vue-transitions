import Vue from 'vue';
import { vuePlugin } from '@morev/v-bem-transformer/vue';
import ElementUI from 'element-ui';
import MoreVueTransitions from '../src/index.js';
import App from './app.vue';

Vue.use(MoreVueTransitions);
Vue.use(ElementUI);
Vue.use(vuePlugin({
	directiveName: 'v-bem',
	bemOptions: {
		delimiters: {
			element: '__',
			modifier: '--',
			modifierValue: '-',
		},
		hyphenate: true,
		namespace: '',
	},
	methodName: 'b',
	blockName: 'name',
	priorityBlockName: 'block',
	fallbackBlockName: 'unknown',
}));

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
