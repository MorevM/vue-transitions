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
				const transition = this.getActiveTransition(element);

				this.fadeElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

				this.setupTransition(element, 'enter');
				this.$nextTick(() => {
					if (!this.isTransitionActive(element, transition)) return;

					this.restoreTemporaryStyle(element, 'opacity');
				});
			},

			onLeave(element) {
				this.setupTransition(element, 'leave');
				this.fadeElement(element, 'leave');
			},

			fadeElement(element, event = 'enter') {
				this.setTemporaryStyle(element, 'opacity', 0);
			},
		},
	};
</script>

<style lang="scss" src="./transition-fade.scss"></style>
