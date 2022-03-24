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
	import { isNumeric } from '@morev/helpers';
	import { baseTransition } from '../../mixins/base-transition.js';
	import { validateSlideOffset } from '../../utility/validate/validate-slide-offset.js';
	import { slideOffset } from '../../utility/defaults/defaults.js';
	import { getMatrix } from '../../utility/helpers.js';

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
			onBegin(element) {
				this.reduceTransition(element);
			},

			onEnter(element) {
				this.slideElement(element, 'enter');
				element.offsetTop; // eslint-disable-line no-unused-expressions

				this.setupTransition(element, 'enter');
				this.$nextTick(() => {
					element.style.removeProperty('opacity');
					element.style.removeProperty('transform');
				});
			},

			async onLeave(element) {
				await this.initLeaving(element);

				this.setupTransition(element, 'leave');
				this.slideElement(element, 'leave');
			},

			onDone(element) {
				this.resetTransition(element);
				this.resetElement(element);
			},

			slideElement(element, event = 'enter') {
				const { width, height, transform } = getComputedStyle(element);

				const offset = (this.offset?.[event] ?? this.offset);
				let [offsetX, offsetY] = offset;

				if (!isNumeric(offsetX)) {
					const val = parseFloat(offsetX.slice(0, -1));
					offsetX = parseFloat(width) * val / 100;
				}

				if (!isNumeric(offsetY)) {
					const val = parseFloat(offsetY.slice(0, -1));
					offsetY = parseFloat(height) * val / 100;
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

				if (this.opacity) {
					element.style.setProperty('opacity', 0);
				}

				element.style.setProperty('transform', `${matrixType}(${matrix})`);
			},

			resetElement(element) {
				element.style.removeProperty('opacity');
				element.style.removeProperty('transform');
			},
		},
	};
</script>

<style lang="scss" src="./transition-slide.scss"></style>
