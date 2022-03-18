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

	export default {
		name: 'transition-fade',
		mixins: [
			baseTransition,
		],
		props: {},
		data: () => ({}),
		computed: {},
		methods: {
			onBegin(element) {
				// do nothing
			},
			onEnter(element) {
				this.setupTransition(element, 'enter');
			},
			async onLeave(element) {
				await this.initLeaving(element);
				this.setupTransition(element, 'leave');
			},
			onDone(element) {
				this.resetTransition(element);
			},
		},
	};
</script>

<style lang="scss" src="./transition-fade.scss"></style>
