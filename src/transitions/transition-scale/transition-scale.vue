<template>
	<component
		:is="cComponent"
		name="scale"
		v-bind="cAttrs"
		v-on="cHooks"
	>
		<slot></slot>
	</component>
</template>

<script>
	import { baseTransition } from '../../mixins/base-transition.js';
	import { scalePreset } from '../../presets/index.js';
	import { scaleAxis, scaleOrigin, scaleValue } from '../../utility/defaults/defaults.js';
	import { validateScaleAxis } from '../../utility/validate/validate-scale-axis.js';
	import { validateScaleOrigin } from '../../utility/validate/validate-scale-origin.js';
	import { validateScaleValue } from '../../utility/validate/validate-scale-value.js';

	export default {
		name: 'transition-scale',
		mixins: [
			baseTransition,
		],
		props: {
			axis: {
				validator: validateScaleAxis,
				default: scaleAxis,
			},
			origin: {
				validator: validateScaleOrigin,
				default: scaleOrigin,
			},
			scale: {
				validator: validateScaleValue,
				default: scaleValue,
			},
		},
		data: () => ({}),
		computed: {},
		methods: {
			onEnter(element) {
				scalePreset.enter(this, element, {
					axis: this.axis,
					noOpacity: this.noOpacity,
					origin: this.origin,
					scale: this.scale,
				});
			},

			onLeave(element) {
				scalePreset.leave(this, element, {
					axis: this.axis,
					noOpacity: this.noOpacity,
					origin: this.origin,
					scale: this.scale,
				});
			},
		},
	};
</script>

<style lang="scss" src="./transition-scale.scss"></style>
