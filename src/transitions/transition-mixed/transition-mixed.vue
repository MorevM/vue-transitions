<template>
	<component
		:is="cComponent"
		name="mixed"
		v-bind="cAttrs"
		v-on="cHooks"
	>
		<slot></slot>
	</component>
</template>

<script>
	import { baseTransition } from '../../mixins/base-transition.js';
	import { getTransitionPreset } from '../../presets/index.js';
	import { validateTransitionPreset } from '../../utility/validate/validate-transition-preset.js';

	export default {
		name: 'transition-mixed',
		mixins: [
			baseTransition,
		],
		props: {
			enter: {
				validator: validateTransitionPreset,
				required: true,
			},
			leave: {
				validator: validateTransitionPreset,
				required: true,
			},
		},
		data: () => ({}),
		computed: {
			cTransitionClasses() {
				const enterPreset = this.enter?.preset ?? 'fade';
				const leavePreset = this.leave?.preset ?? 'fade';

				return {
					enterActiveClass: `${enterPreset}-enter-active`,
					appearActiveClass: `${enterPreset}-enter-active`,
					leaveActiveClass: `${leavePreset}-leave-active`,
					...(this.group && { moveClass: 'mixed-move' }),
				};
			},
		},
		methods: {
			getPresetOptions(event) {
				return {
					...this[event],
					noOpacity: this.noOpacity,
				};
			},

			onEnter(element) {
				const options = this.getPresetOptions('enter');

				getTransitionPreset(options.preset).enter(this, element, options);
			},

			onLeave(element) {
				const options = this.getPresetOptions('leave');

				getTransitionPreset(options.preset).leave(this, element, options);
			},

			resetElement(element, event) {
				getTransitionPreset(this[event].preset).reset?.(element);
			},
		},
	};
</script>

<style lang="scss" src="./transition-mixed.scss"></style>
