<template>
	<component
		:is="cComponent"
		name="slide"
		v-bind="cAttrs"
		v-on="cHooks"
	>
		<slot></slot>
	</component>
</template>

<script>
	import { baseTransition } from '../../mixins/base-transition.js';
	import { slidePreset } from '../../presets/index.js';
	import { slideOffset } from '../../utility/defaults/defaults.js';
	import { validateSlideOffset } from '../../utility/validate/validate-slide-offset.js';

	export default {
		name: 'transition-slide',
		mixins: [
			baseTransition,
		],
		props: {
			offset: {
				validator: validateSlideOffset,
				default: () => slideOffset,
			},
		},
		data: () => ({}),
		computed: {},
		methods: {
			onEnter(element) {
				slidePreset.enter(this, element, {
					noOpacity: this.noOpacity,
					offset: this.offset,
				});
			},

			onLeave(element) {
				slidePreset.leave(this, element, {
					noOpacity: this.noOpacity,
					offset: this.offset,
				});
			},
		},
	};
</script>

<style lang="scss" src="./transition-slide.scss"></style>
