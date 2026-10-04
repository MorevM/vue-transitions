<template>
	<component
		:is="cComponent"
		name="expand"
		v-bind="cAttrs"
		v-on="cHooks"
	>
		<slot></slot>
	</component>
</template>

<script>
	import { baseTransition } from '../../mixins/base-transition.js';
	import { expandPreset } from '../../presets/index.js';
	import { expandAxis } from '../../utility/defaults/defaults.js';
	import { validateExpandAxis } from '../../utility/validate/validate-expand-axis.js';

	export default {
		name: 'transition-expand',
		mixins: [
			baseTransition,
		],
		props: {
			axis: {
				validator: validateExpandAxis,
				default: expandAxis,
			},
		},
		data: () => ({}),
		computed: {},
		methods: {
			onEnter(element) {
				expandPreset.enter(this, element, {
					axis: this.axis,
					noOpacity: this.noOpacity,
				});
			},

			onLeave(element) {
				expandPreset.leave(this, element, {
					axis: this.axis,
					noOpacity: this.noOpacity,
				});
			},

			resetElement(element) {
				expandPreset.reset(element);
			},
		},
	};
</script>

<style lang="scss" src="./transition-expand.scss"></style>
