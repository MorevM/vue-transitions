import { createApp } from 'vue';
import assert from 'node:assert/strict';
import vueTransitions, { plugin, TransitionFade } from '@morev/vue-transitions';
import explicitVue3 from '@morev/vue-transitions/vue3';

assert.equal(vueTransitions, explicitVue3);

const app = createApp({});
app.use(vueTransitions);
assert.equal(app.component('TransitionFade'), TransitionFade);

const configuredApp = createApp({});
configuredApp.use(plugin({ defaultProps: { duration: 175 } }));
assert.equal(TransitionFade.props.duration.default, 175);
