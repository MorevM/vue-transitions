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
				this.reduceTransition(element);
			},

			onEnter(element) {
				this.fadeElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions

				this.setupTransition(element, 'enter');
				this.$nextTick(() => element.style.removeProperty('opacity'));
			},

			async onLeave(element) {
				await this.initLeaving(element);

				this.setupTransition(element, 'leave');
				this.fadeElement(element, 'leave');
			},

			onDone(element) {
				this.resetTransition(element);
				this.resetElement(element);
			},

			fadeElement(element, event = 'enter') {
				element.style.setProperty('opacity', 0);
			},

			resetElement(element) {
				element.style.removeProperty('opacity');
			},
		},
	};
</script>

<style lang="scss" src="./transition-fade.scss"></style>
