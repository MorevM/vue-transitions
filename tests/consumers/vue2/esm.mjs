import Vue from 'vue';
import assert from 'node:assert/strict';
import vueTransitions, { plugin, TransitionFade } from '@morev/vue-transitions/vue2';

Vue.use(vueTransitions);
assert.equal(Vue.options.components.TransitionFade.options.name, TransitionFade.name);

Vue.use(plugin({ defaultProps: { duration: 175 } }));
assert.equal(TransitionFade.props.duration.default, 175);
