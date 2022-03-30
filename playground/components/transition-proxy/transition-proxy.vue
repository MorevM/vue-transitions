<template>
	<div v-bem>
		<div v-bem:container>
			<!-- Hint -->
			<transition-slide v-bem:preview-hint tag="div" group :offset="{ enter: [0, '-50%'], leave: [0, 0] }">
				<div v-if="isSinglePreview" v-bem:preview-hint-inner key="single-hint">
					Click to the element area to trigger the animation.
				</div>
				<div v-if="isGroupPreview" v-bem:preview-hint-inner key="group-hint">
					Click to a plus button to insert new item. <br />
					Click to an item itself to remove it.
				</div>
			</transition-slide>
			<!-- Preview -->
			<div
				v-bem:preview-wrapper="{ mode: previewMode }"
				@click="(previewMode === 'single') && (previewActive = !previewActive)"
			>
				<!-- Single -->
				<template v-if="isSinglePreview">
					<div v-bem:preview-single-wrapper>
						<component :is="previewTransition" appear v-bind="cOptions">
							<div v-if="previewActive" v-bem:preview-single>{{ cTransitionLabel }}</div>
						</component>
					</div>
				</template>

				<!-- Group -->
				<template v-if="isGroupPreview">
					<component
						:is="previewTransition"
						v-bem:preview-group
						v-bind="cOptions"
						tag="div"
						group
					>
						<template v-for="(item, index) in previewItems">
							<button
								v-bem:preview-group-item="{ disabled: previewItems.length === 1 }"
								:key="item.hash + '-item'"
								type="button"
								aria-label="Remove an item"
								:style="item.styles"
								@click.self="removeItem(index);"
							></button>
							<button
								v-if="(index + 1) % 5 !== 0"
								v-bem:preview-group-item-add="{ hidden: previewItems.length === 15 }"
								:key="item.hash + '-add'"
								type="button"
								aria-label="Add an item"
								@click="addItem(index + 1)"
							>
								+
							</button>
						</template>
					</component>
				</template>
			</div>

			<!-- Controls -->
			<div v-bem:controls-wrapper>
				<div v-bem:controls>
					<!-- Transition -->
					<el-select v-bem:controls-selector v-model="previewTransitionControl">
						<el-option v-for="option in $options.TRANSITIONS_LIST" :key="option.value" :value="option.value">
							{{ option.label }}
						</el-option>
					</el-select>

					<!-- Type -->
					<el-radio-group v-bem:controls-type v-model="previewModeControl">
						<el-radio-button label="single">Single</el-radio-button>
						<el-radio-button label="group">Group</el-radio-button>
					</el-radio-group>

					<!-- Separate values -->
					<el-checkbox
						v-bem:controls-checkbox
						v-model="isSeparated"
						label="Separate values for enter and leave animation"
					/>

					<!-- Disable opacity -->
					<el-checkbox
						v-if="previewTransition !== 'transition-fade'"
						v-bem:controls-checkbox
						v-model="noOpacity"
						label="Turn off the opacity transition"
					/>
				</div>
			</div>

			<el-divider />

			<!-- Controls -->
			<div v-bem:controls>
				<!-- Options -->
				<transition-slide v-bem:controls-options v-bind="{ group: true, tag: 'div' }">
					<!-- Duration -->
					<prop-control
						key="prop-duration"
						v-model="duration"
						v-bind="{ isSeparated }"
						label="Duration, ms"
					/>

					<!-- Delay -->
					<prop-control
						key="prop-delay"
						v-model="delay"
						v-bind="{ isSeparated }"
						label="Delay, ms"
					/>

					<!-- Easing -->
					<prop-control
						key="prop-easing"
						v-model="easing"
						v-bind="{ isSeparated }"
						label="Easing, CSS transition function"
						type="autocomplete"
						:options="$options.easingAutocompleteOptions"
					/>

					<!-- Axis (expand && scale) -->
					<prop-control
						v-if="['transition-expand', 'transition-scale'].includes(previewTransition)"
						key="prop-axis"
						v-model="axis"
						v-bind="{ isSeparated }"
						label="Axis"
						type="select"
						:options="previewTransition === 'transition-scale' ? $options.scaleAxisOptions : $options.axisOptions"
					/>

					<!-- Origin (scale) -->
					<prop-control
						v-if="previewTransition === 'transition-scale'"
						key="prop-origin"
						v-model="origin"
						v-bind="{ isSeparated }"
						label="Origin"
						type="text"
					/>

					<!-- Value (scale) -->
					<prop-control
						v-if="previewTransition === 'transition-scale'"
						key="prop-value"
						v-model="scale"
						v-bind="{ isSeparated }"
						label="Scale value"
						:min="0"
						:max="1"
						:step=".05"
					/>

					<!-- Offset (slide) -->
					<prop-control
						v-if="previewTransition === 'transition-slide'"
						key="prop-origin"
						v-model="offset"
						v-bind="{ isSeparated }"
						label="Offset"
						type="double-text"
					/>

					<!-- Move duration -->
					<prop-control
						v-if="previewMode === 'group'"
						key="prop-move-duration"
						v-model="moveDuration"
						label="Move duration, ms"
					/>
				</transition-slide>
			</div>
		</div>
	</div>
</template>

<script>
	import { randomString, randomInteger, isArray } from '@morev/helpers';
	import { TransitionFade, TransitionExpand, TransitionSlide, TransitionScale } from '../../../src/index.js';
	import * as defaults from '../../../src/utility/defaults/defaults.js';
	import OptionsGroup from '../options-group/options-group.vue';
	import PropControl from '../prop-control/prop-control.vue';

	const TRANSITIONS_LIST = [
		{ value: 'transition-fade', label: '<transition-fade />' },
		{ value: 'transition-expand', label: '<transition-expand />' },
		{ value: 'transition-slide', label: '<transition-slide />' },
		{ value: 'transition-scale', label: '<transition-scale />' },
	];

	const easingAutocompleteOptions = ['ease', 'ease-in', 'ease-in-out', 'ease-out', 'linear'];
	const axisOptions = ['x', 'y'];
	const scaleAxisOptions = ['both', 'x', 'y'];

	const withEnterLeave = (v) => (isArray(v) ? { enter: v[0], leave: v[1] } : v);
	const formatOffsetValue = (values) => values.map(v => (['-', ' '].includes(v.toString().trim()) ? 0 : v));

	export default {
		TRANSITIONS_LIST,
		easingAutocompleteOptions,
		axisOptions,
		scaleAxisOptions,
		name: 'transition-proxy',
		components: {
			OptionsGroup,
			TransitionFade,
			TransitionExpand,
			TransitionSlide,
			TransitionScale,
			PropControl,
		},
		data: () => ({
			previewTransition: 'transition-slide',
			previewTransitionControl: 'transition-slide',

			previewMode: 'single',
			previewModeControl: 'single',
			previewActive: true,
			previewItems: [],
			isSeparated: true,

			duration: defaults.transitionDuration,
			delay: defaults.transitionDelay,
			easing: defaults.transitionEasing,
			axis: defaults.expandAxis,
			origin: defaults.scaleOrigin,
			scale: defaults.scaleValue,
			offset: defaults.slideOffset,
			moveDuration: defaults.moveDuration,
			noOpacity: defaults.noOpacity,
			noMove: defaults.noMove,
		}),
		computed: {
			isSinglePreview() {
				return this.previewMode === 'single';
			},
			isGroupPreview() {
				return this.previewMode === 'group';
			},
			cTransitionLabel() {
				return TRANSITIONS_LIST.find(t => t.value === this.previewTransition).label;
			},
			cOptions() {
				const duration = withEnterLeave(this.duration);
				const easing = withEnterLeave(this.easing);
				const delay = withEnterLeave(this.delay);
				const axis = withEnterLeave(this.axis);
				const origin = withEnterLeave(this.origin);
				const scale = withEnterLeave(this.scale);
				const offset = Array.isArray(this.offset[0])
					? {
						enter: formatOffsetValue(this.offset[0]),
						leave: formatOffsetValue(this.offset[1]),
					}
					: formatOffsetValue(this.offset);

				const { moveDuration, noMove, noOpacity } = this;

				return {
					duration,
					easing,
					delay,
					offset,
					axis,
					origin,
					scale,
					moveDuration,
					noMove,
					noOpacity,
				};
			},
		},
		watch: {
			previewTransition() {
				this.setData();
			},
			previewTransitionControl(to) {
				if (this.previewMode === 'group') {
					return (this.previewTransition = to);
				}
				const delay = this.previewActive ? (isArray(this.duration) ? this.duration[0] : this.duration) : -100;
				this.previewActive = false;
				setTimeout(() => {
					this.previewTransition = to;
					this.previewActive = true;
				}, delay + 100);
			},
			previewModeControl(to) {
				let delay = isArray(this.duration) ? this.duration[0] : this.duration;
				if (this.previewMode === 'single') {
					if (!this.previewActive) delay = -100;
					this.previewActive = false;
				} else {
					this.previewItems = [];
					this.previewActive = true;
				}
				setTimeout(() => {
					this.previewMode = to;
					if (to === 'group') {
						this.addItem();
					}
				}, delay + 100);
			},
		},
		methods: {
			setData() {
				const propsToSet = [
					'duration',
					'delay',
					'easing',
					'axis',
					'origin',
					'scale',
					'offset',
				];

				propsToSet.forEach(prop => {
					const [toCheck, toSet] = prop === 'offset'
						? [this.offset[0], this.isSeparated ? this.offset : this.offset[0]]
						: [this[prop], this[prop]];
					if (this.isSeparated && !isArray(toCheck)) {
						this[prop] = [toSet, toSet];
					}
					if (!this.isSeparated && isArray(toCheck)) {
						this[prop] = toSet;
					}
				});
			},

			switchPreview() {
				const delay = (this.previewActive ? this.optionDurationOut : 0) + 20;
				this.previewActive = false;

				setTimeout(() => {
					this.previewMode = this.previewMode === 'single' ? 'group' : 'single';
					this.previewActive = true;
				}, delay);
			},

			addItem(index = 0) {
				this.previewItems.splice(index, 0, {
					hash: randomString(),
					styles: {
						backgroundColor: `rgba(${[
							randomInteger(0, 255),
							randomInteger(0, 255),
							randomInteger(0, 255),
						]})`,
					},
				});
			},

			removeItem(index) {
				this.previewItems.splice(index, 1);
			},
		},
		mounted() {
			this.setData();
		},
	};
</script>

<style lang="scss" src="./transition-proxy.scss"></style>
