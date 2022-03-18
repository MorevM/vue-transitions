<template>
	<component
		:is="cComponent"
		name="scale"
		v-bind="cAttrs"
		v-on="cHooks"
	>
		<slot></slot>
	</component>
</template>

<script>
	import { baseTransition } from '../../mixins/base-transition.js';
	import { validateScaleAxis } from '../../utility/validate/validate-scale-axis.js';
	import { validateScaleOrigin } from '../../utility/validate/validate-scale-origin.js';
	import { scaleAxis, scaleOrigin } from '../../utility/defaults/defaults.js';
	import { getMatrix } from '../../utility/helpers.js';

	export default {
		name: 'transition-scale',
		mixins: [
			baseTransition,
		],
		props: {
			axis: {
				validator: validateScaleAxis,
				default: scaleAxis,
			},
			origin: {
				validator: validateScaleOrigin,
				default: scaleOrigin,
			},
		},
		data: () => ({}),
		computed: {},
		methods: {
			onBegin(element) {
				this.reduceTransition(element);
			},

			onEnter(element) {
				this.scaleElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions

				this.setupTransition(element, 'enter');
				element.style.removeProperty('transform');
			},

			async onLeave(element) {
				await this.initLeaving(element);

				this.setupTransition(element, 'leave');
				this.scaleElement(element, 'leave');
			},

			onDone(element) {
				this.resetTransition(element);
				this.resetElement(element);
			},

			scaleElement(element, event = 'enter') {
				const { transform } = getComputedStyle(element);

				const axis = this.axis?.[event] ?? this.axis;
				const origin = this.origin?.[event] ?? this.origin;

				const [matrixType, matrix] = getMatrix(transform);

				// Respect existing 3D transform
				if (transform.startsWith('matrix3d')) {
					if (axis !== 'y') matrix[0] = 0.0001;
					if (axis !== 'x') matrix[5] = 0.0001;
				// Respect existing 2D transform
				} else if (transform.startsWith('matrix')) {
					if (axis !== 'y') matrix[0] = 0.0001;
					if (axis !== 'x') matrix[3] = 0.0001;
				// Just set own transform
				} else {
					matrix[0] = axis === 'y' ? 1 : 0.0001;
					matrix[3] = axis === 'x' ? 1 : 0.0001;
				}

				element.style.setProperty('transform', `${matrixType}(${matrix})`);
				element.style.setProperty('transform-origin', `${origin}`);
			},

			resetElement(element) {
				element.style.removeProperty('transform');
				element.style.removeProperty('transform-origin');
			},
		},
	};
</script>

<style lang="scss" src="./transition-scale.scss"></style>
