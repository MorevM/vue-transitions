<template>
	<component
		:is="cComponent"
		name="slide"
		v-bind="cAttrs"
		v-on="cHooks"
	>
		<slot></slot>
	</component>
</template>

<script>
	import { isNumeric } from '@morev/utils';
	import { baseTransition } from '../../mixins/base-transition.js';
	import { slideOffset } from '../../utility/defaults/defaults.js';
	import { getMatrix } from '../../utility/helpers.js';
	import { validateSlideOffset } from '../../utility/validate/validate-slide-offset.js';

	export default {
		name: 'transition-slide',
		mixins: [
			baseTransition,
		],
		props: {
			offset: {
				validator: validateSlideOffset,
				default: () => slideOffset,
			},
		},
		data: () => ({}),
		computed: {},
		methods: {
			onEnter(element) {
				this.slideElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

				this.setupTransition(element, 'enter');
				this.restoreTemporaryStyle(element, 'opacity');
				this.restoreTemporaryStyle(element, 'transform');
			},

			onLeave(element) {
				this.setupTransition(element, 'leave');
				this.slideElement(element, 'leave');
			},

			slideElement(element, event = 'enter') {
				const { width, height, transform } = getComputedStyle(element);

				const offset = (this.offset?.[event] ?? this.offset);
				let [offsetX, offsetY] = offset;

				if (!isNumeric(offsetX)) {
					const value = offsetX.endsWith('%')
						? parseFloat(width) * (parseFloat(offsetX.slice(0, -1)) || 0) / 100
						: parseFloat(offsetX);
					offsetX = value;
				}

				if (!isNumeric(offsetY)) {
					const value = offsetY.endsWith('%')
						? parseFloat(height) * (parseFloat(offsetY.slice(0, -1)) || 0) / 100
						: parseFloat(offsetY);
					offsetY = value;
				}

				const [matrixType, matrix] = getMatrix(transform);

				// Respect existing 3D transform
				if (transform.startsWith('matrix3d')) {
					matrix[12] += offsetX;
					matrix[13] += offsetY;
				// Respect existing 2D transform
				} else if (transform.startsWith('matrix')) {
					matrix[4] += offsetX;
					matrix[5] += offsetY;
				// Just apply the transition
				} else {
					matrix[4] = offsetX;
					matrix[5] = offsetY;
				}

				if (!this.noOpacity) {
					this.setTemporaryStyle(element, 'opacity', 0);
				}

				this.setTemporaryStyle(element, 'transform', `${matrixType}(${matrix})`);
			},
		},
	};
</script>

<style lang="scss" src="./transition-slide.scss"></style>
