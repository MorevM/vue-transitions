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
			onEnter(element) {
				this.fadeElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions

				this.setupTransition(element, 'enter');
				this.$nextTick(() => element.style.removeProperty('opacity'));
			},

			onLeave(element) {
				this.setupTransition(element, 'leave');
				this.fadeElement(element, 'leave');
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
