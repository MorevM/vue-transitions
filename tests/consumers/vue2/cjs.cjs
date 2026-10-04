const Vue = require('vue');
const assert = require('node:assert/strict');
const vueTransitions = require('@morev/vue-transitions/vue2');

Vue.use(vueTransitions.default);
assert.equal(
	Vue.options.components.TransitionMixed.options.name,
	vueTransitions.TransitionMixed.name,
);
assert.equal(typeof vueTransitions.plugin, 'function');
