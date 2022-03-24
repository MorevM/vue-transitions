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
	import { validateExpandAxis } from '../../utility/validate/validate-expand-axis.js';

	const elementVisual = {
		size: { x: 0, y: 0 },
		padding: { x: [0, 0], y: [0, 0] },
		margin: { x: [0, 0], y: [0, 0] },
	};

	export default {
		name: 'transition-expand',
		mixins: [
			baseTransition,
		],
		props: {
			axis: {
				validator: validateExpandAxis,
				default: 'y',
			},
		},
		data: () => ({}),
		computed: {},
		methods: {
			onBegin(element) {
				this.reduceTransition(element);
			},

			onEnter(element) {
				this.getSizes(element);
				this.collapseElement(element, 'enter');

				element.offsetTop; // eslint-disable-line no-unused-expressions -- Intentionally

				this.setupTransition(element, 'enter');
				this.$nextTick(() => this.expandElement(element, 'enter'));
			},

			async onLeave(element) {
				this.getSizes(element);
				this.expandElement(element, 'leave');

				element.offsetTop; // eslint-disable-line no-unused-expressions
				await this.initLeaving(element);

				this.setupTransition(element, 'leave');
				this.collapseElement(element, 'leave');
			},

			onDone(element) {
				this.resetTransition(element);
				this.resetElement(element);
			},

			expandElement(element, event = 'enter') {
				const axis = this.axis?.[event] ?? this.axis;
				const start = axis === 'x' ? 'left' : 'top';
				const end = axis === 'x' ? 'right' : 'bottom';

				const size = elementVisual.size[axis];
				const margin = elementVisual.margin[axis];
				const padding = elementVisual.padding[axis];

				if (this.opacity) {
					element.style.setProperty('opacity', 1);
				}

				element.style.setProperty(axis === 'x' ? 'width' : 'height', `${parseFloat(size)}px`);
				element.style.setProperty(`padding-${start}`, `${parseFloat(padding[0])}px`);
				element.style.setProperty(`padding-${end}`, `${parseFloat(padding[1])}px`);
				element.style.setProperty(`margin-${start}`, `${parseFloat(margin[0])}px`);
				element.style.setProperty(`margin-${end}`, `${parseFloat(margin[1])}px`);
			},

			collapseElement(element, event = 'enter') {
				const axis = this.axis?.[event] ?? this.axis;
				const axisProp = axis === 'x' ? 'width' : 'height';
				const start = axis === 'x' ? 'left' : 'top';
				const end = axis === 'x' ? 'right' : 'bottom';

				if (this.opacity) {
					element.style.setProperty('opacity', 0);
				}

				element.style.setProperty(axisProp, '0px');
				element.style.setProperty(`padding-${start}`, '0px');
				element.style.setProperty(`padding-${end}`, '0px');
				element.style.setProperty(`margin-${start}`, '0px');
				element.style.setProperty(`margin-${end}`, '0px');
			},

			resetElement(element) {
				element.style.removeProperty('opacity');
				element.style.removeProperty('width');
				element.style.removeProperty('height');
				element.style.removeProperty('padding-top');
				element.style.removeProperty('padding-right');
				element.style.removeProperty('padding-bottom');
				element.style.removeProperty('padding-left');
				element.style.removeProperty('margin-top');
				element.style.removeProperty('margin-right');
				element.style.removeProperty('margin-bottom');
				element.style.removeProperty('margin-left');
			},

			getSizes(element) {
				const styles = getComputedStyle(element);

				const { width, height } = styles;
				const { paddingTop, paddingRight, paddingBottom, paddingLeft } = styles;
				const { marginTop, marginRight, marginBottom, marginLeft } = styles;

				elementVisual.size.x = width;
				elementVisual.size.y = height;
				elementVisual.padding.x = [paddingLeft, paddingRight];
				elementVisual.padding.y = [paddingTop, paddingBottom];
				elementVisual.margin.x = [marginLeft, marginRight];
				elementVisual.margin.y = [marginTop, marginBottom];
			},
		},
	};
</script>

<style lang="scss" src="./transition-expand.scss"></style>
