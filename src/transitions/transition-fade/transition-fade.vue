<template>
	<component
		:is="cComponent"
		name="fade"
		v-bind="cAttrs"
		v-on="cHooks"
	>
		<slot></slot>
	</component>
</template>

<script>
	import { baseTransition } from '../../mixins/base-transition.js';
	import { fadePreset } from '../../presets/index.js';

	export default {
		name: 'transition-fade',
		mixins: [
			baseTransition,
		],
		props: {},
		data: () => ({}),
		computed: {},
		methods: {
			onEnter(element) {
				fadePreset.enter(this, element);
			},

			onLeave(element) {
				fadePreset.leave(this, element);
			},
		},
	};
</script>

<style lang="scss" src="./transition-fade.scss"></style>
