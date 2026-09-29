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
	import { clamp } from '@morev/utils';
	import { baseTransition } from '../../mixins/base-transition.js';
	import { scaleAxis, scaleOrigin, scaleValue } from '../../utility/defaults/defaults.js';
	import { getMatrix } from '../../utility/helpers.js';
	import { validateScaleAxis } from '../../utility/validate/validate-scale-axis.js';
	import { validateScaleOrigin } from '../../utility/validate/validate-scale-origin.js';
	import { validateScaleValue } from '../../utility/validate/validate-scale-value.js';

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
			scale: {
				validator: validateScaleValue,
				default: scaleValue,
			},
		},
		data: () => ({}),
		computed: {},
		methods: {
			onEnter(element) {
				const transition = this.getActiveTransition(element);

				this.scaleElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

				this.setupTransition(element, 'enter');
				this.$nextTick(() => {
					if (!this.isTransitionActive(element, transition)) return;

					this.restoreTemporaryStyle(element, 'opacity');
					this.restoreTemporaryStyle(element, 'transform');
				});
			},

			onLeave(element) {
				this.setupTransition(element, 'leave');
				this.scaleElement(element, 'leave');
			},

			scaleElement(element, event = 'enter') {
				const { transform } = getComputedStyle(element);

				const axis = this.axis?.[event] ?? this.axis;
				const origin = this.origin?.[event] ?? this.origin;
				const scale = clamp(0.0001, this.scale?.[event] ?? this.scale, 0.9999);

				const [matrixType, matrix] = getMatrix(transform);

				// Respect existing 3D transform
				if (transform.startsWith('matrix3d')) {
					if (axis !== 'y') matrix[0] = scale;
					if (axis !== 'x') matrix[5] = scale;
				// Respect existing 2D transform
				} else if (transform.startsWith('matrix')) {
					if (axis !== 'y') matrix[0] = scale;
					if (axis !== 'x') matrix[3] = scale;
				// Just set own transform
				} else {
					matrix[0] = axis === 'y' ? 1 : scale;
					matrix[3] = axis === 'x' ? 1 : scale;
				}

				if (!this.noOpacity) {
					this.setTemporaryStyle(element, 'opacity', 0);
				}

				this.setTemporaryStyle(element, 'transform', `${matrixType}(${matrix})`);
				this.setTemporaryStyle(element, 'transform-origin', origin);
			},
		},
	};
</script>

<style lang="scss" src="./transition-scale.scss"></style>
