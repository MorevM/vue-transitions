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
	import { expandAxis } from '../../utility/defaults/defaults.js';
	import { validateExpandAxis } from '../../utility/validate/validate-expand-axis.js';

	const elementVisuals = new WeakMap();

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
			async onEnter(element) {
				const transition = this.getActiveTransition(element);

				await this.$nextTick();
				await this.$nextTick();

				if (!this.isTransitionActive(element, transition)) return;

				this.getSizes(element);
				this.collapseElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

				this.setupTransition(element, 'enter');
				this.expandElement(element, 'enter');
			},

			onLeave(element) {
				this.getSizes(element);
				this.expandElement(element, 'leave');
				element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

				this.setupTransition(element, 'leave');
				this.collapseElement(element, 'leave');
			},

			expandElement(element, event = 'enter') {
				const axis = this.axis?.[event] ?? this.axis;
				const start = axis === 'x' ? 'left' : 'top';
				const end = axis === 'x' ? 'right' : 'bottom';

				const visual = elementVisuals.get(element);

				if (!visual) return;

				const size = visual.size[axis];
				const margin = visual.margin[axis];
				const padding = visual.padding[axis];

				if (!this.noOpacity) {
					this.setTemporaryStyle(element, 'opacity', visual.opacity);
				}
				elementVisuals.delete(element);

				this.setTemporaryStyle(
					element,
					axis === 'x' ? 'width' : 'height',
					`${parseFloat(size)}px`,
				);
				this.setTemporaryStyle(element, `padding-${start}`, `${parseFloat(padding[0])}px`);
				this.setTemporaryStyle(element, `padding-${end}`, `${parseFloat(padding[1])}px`);
				this.setTemporaryStyle(element, `margin-${start}`, `${parseFloat(margin[0])}px`);
				this.setTemporaryStyle(element, `margin-${end}`, `${parseFloat(margin[1])}px`);
			},

			collapseElement(element, event = 'enter') {
				const axis = this.axis?.[event] ?? this.axis;
				const axisProp = axis === 'x' ? 'width' : 'height';
				const start = axis === 'x' ? 'left' : 'top';
				const end = axis === 'x' ? 'right' : 'bottom';

				if (!this.noOpacity) {
					this.setTemporaryStyle(element, 'opacity', 0);
				}

				this.setTemporaryStyle(element, axisProp, '0px');
				this.setTemporaryStyle(element, `padding-${start}`, '0px');
				this.setTemporaryStyle(element, `padding-${end}`, '0px');
				this.setTemporaryStyle(element, `margin-${start}`, '0px');
				this.setTemporaryStyle(element, `margin-${end}`, '0px');
			},

			resetElement(element) {
				elementVisuals.delete(element);
			},

			getSizes(element) {
				const styles = getComputedStyle(element);
				const { opacity } = styles;
				const { width, height } = styles;
				const { paddingTop, paddingRight, paddingBottom, paddingLeft } = styles;
				const { marginTop, marginRight, marginBottom, marginLeft } = styles;

				elementVisuals.set(element, {
					opacity,
					size: { x: width, y: height },
					padding: { x: [paddingLeft, paddingRight], y: [paddingTop, paddingBottom] },
					margin: { x: [marginLeft, marginRight], y: [marginTop, marginBottom] },
				});
			},
		},
	};
</script>

<style lang="scss" src="./transition-expand.scss"></style>
