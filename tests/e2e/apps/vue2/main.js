import Vue from 'vue';
import E2eHarness from '@e2e/e2e-harness.vue';
import '@morev/vue-transitions/styles';

Vue.config.productionTip = false;

new Vue({
	render: (createElement) => createElement(E2eHarness, {
		props: { vueMajor: 2 },
	}),
}).$mount('#app');
