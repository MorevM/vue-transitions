const Vue = require('vue');
const assert = require('node:assert/strict');
const vueTransitions = require('@morev/vue-transitions/vue2');

Vue.use(vueTransitions.default);
assert.equal(
	Vue.options.components.TransitionCombined.options.name,
	vueTransitions.TransitionCombined.name,
);
assert.equal(typeof vueTransitions.plugin, 'function');
