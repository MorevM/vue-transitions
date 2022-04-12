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
	import { expandAxis } from '../../utility/defaults/defaults.js';

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
			onEnter(element) {
				this.getSizes(element);
				this.collapseElement(element, 'enter');

				element.offsetTop; // eslint-disable-line no-unused-expressions -- Intentionally

				this.setupTransition(element, 'enter');
				this.$nextTick(() => this.expandElement(element, 'enter'));
			},

			onLeave(element) {
				this.getSizes(element);
				this.expandElement(element, 'leave');
				element.offsetTop; // eslint-disable-line no-unused-expressions

				this.setupTransition(element, 'leave');
				this.collapseElement(element, 'leave');
			},

			expandElement(element, event = 'enter') {
				const axis = this.axis?.[event] ?? this.axis;
				const start = axis === 'x' ? 'left' : 'top';
				const end = axis === 'x' ? 'right' : 'bottom';

				const size = element.visual.size[axis];
				const margin = element.visual.margin[axis];
				const padding = element.visual.padding[axis];

				if (!this.noOpacity) {
					element.style.setProperty('opacity', element.visual.opacity);
				}
				delete element.visual;

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

				if (!this.noOpacity) {
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
				const { opacity } = styles;
				const { width, height } = styles;
				const { paddingTop, paddingRight, paddingBottom, paddingLeft } = styles;
				const { marginTop, marginRight, marginBottom, marginLeft } = styles;

				element.visual = {
					opacity,
					size: { x: width, y: height },
					padding: { x: [paddingLeft, paddingRight], y: [paddingTop, paddingBottom] },
					margin: { x: [marginLeft, marginRight], y: [marginTop, marginBottom] },
				};
			},
		},
	};
</script>

<style lang="scss" src="./transition-expand.scss"></style>
