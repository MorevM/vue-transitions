const { createApp } = require('vue');
const assert = require('node:assert/strict');
const vueTransitions = require('@morev/vue-transitions');
const explicitVue3 = require('@morev/vue-transitions/vue3');

assert.equal(vueTransitions.default, explicitVue3.default);

const app = createApp({});
app.use(vueTransitions.default);
assert.equal(app.component('TransitionCombined'), vueTransitions.TransitionCombined);
assert.equal(typeof vueTransitions.plugin, 'function');
