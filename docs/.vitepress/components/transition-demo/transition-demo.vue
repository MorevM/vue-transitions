<template>
	<section class="transition-demo">
		<div class="transition-demo__tabs" role="tablist" aria-label="Preview mode">
			<button
				v-for="previewMode in previewModes"
				:key="previewMode"
				class="transition-demo__tab"
				type="button"
				role="tab"
				:class="{ 'transition-demo__tab--active': mode === previewMode }"
				:aria-selected="mode === previewMode"
				@click="setMode(previewMode)"
			>
				{{ previewMode === 'single' ? 'Single' : 'Group' }}
			</button>
		</div>

		<div
			class="transition-demo__stage"
			:class="{
				'transition-demo__stage--group': isGroup,
				'transition-demo__stage--interactive': !isGroup,
			}"
			:role="isGroup ? undefined : 'button'"
			:tabindex="isGroup ? undefined : 0"
			@pointerdown="toggleSinglePreview"
			@keydown="onStageKeydown"
		>
			<component
				:is="activeTransition"
				v-bind="transitionOptions"
				:class="{ 'transition-demo__group': isGroup }"
			>
				<article
					v-if="!isGroup && isVisible"
					key="single-preview"
					class="transition-demo__card"
					:class="{ 'transition-demo__card--transformed': transition === 'slide' }"
				>
					<span class="transition-demo__mark">M</span>
					<span>
						<strong class="transition-demo__title">{{ transitionLabel }}</strong>
						<span class="transition-demo__copy">Click this area to replay the transition.</span>
					</span>
				</article>

				<li
					v-for="item in isGroup ? items : []"
					:key="item"
					class="transition-demo__item"
				>
					<button
						class="transition-demo__item-button"
						type="button"
						:aria-label="`Remove item ${item}`"
						@click.stop="removeItem(item)"
					>
						{{ item }}
					</button>
				</li>
			</component>

			<div v-if="isGroup" class="transition-demo__group-actions">
				<button class="transition-demo__action" type="button" @click.stop="addItem">Add item</button>
				<button class="transition-demo__action" type="button" @click.stop="reverseItems">Reverse</button>
				<button
					v-if="hasControl('stagger')"
					class="transition-demo__action"
					type="button"
					@click.stop="clearItems"
				>
					Clear
				</button>
				<button
					v-if="hasControl('stagger')"
					class="transition-demo__action"
					type="button"
					@click.stop="resetItems"
				>
					Reset
				</button>
			</div>
		</div>

		<div v-if="controls.length > 0" class="transition-demo__controls">
			<label v-if="hasControl('axis')" class="transition-demo__field">
				<span>Axis</span>
				<select v-model="axis" class="transition-demo__input">
					<option v-for="option in axisOptions" :key="option" :value="option">
						{{ option }}
					</option>
				</select>
			</label>

			<label v-if="hasControl('offset')" class="transition-demo__field">
				<span>Offset</span>
				<select v-model="offset" class="transition-demo__input">
					<option value="up">From top</option>
					<option value="right">From right</option>
					<option value="down">From bottom</option>
					<option value="left">From left</option>
					<option value="opposite">Top in, bottom out</option>
				</select>
			</label>

			<label v-if="hasControl('scale')" class="transition-demo__field">
				<span>Initial scale: {{ scale }}</span>
				<input
					v-model.number="scale"
					class="transition-demo__range"
					type="range"
					min="0"
					max="0.9"
					step="0.1"
				/>
			</label>

			<label v-if="hasControl('origin')" class="transition-demo__field">
				<span>Origin</span>
				<select v-model="origin" class="transition-demo__input">
					<option value="50% 50%">Center</option>
					<option value="0% 0%">Top left</option>
					<option value="100% 0%">Top right</option>
				</select>
			</label>

			<label v-if="hasControl('enterPreset')" class="transition-demo__field">
				<span>Enter preset</span>
				<select v-model="enterPreset" class="transition-demo__input">
					<option v-for="preset in presetOptions" :key="preset" :value="preset">{{ preset }}</option>
				</select>
			</label>

			<label v-if="hasControl('leavePreset')" class="transition-demo__field">
				<span>Leave preset</span>
				<select v-model="leavePreset" class="transition-demo__input">
					<option v-for="preset in presetOptions" :key="preset" :value="preset">{{ preset }}</option>
				</select>
			</label>

			<label v-if="hasControl('motion')" class="transition-demo__field">
				<span>Motion</span>
				<select v-model="motion" class="transition-demo__input">
					<option value="system">system</option>
					<option value="enabled">enabled</option>
					<option value="disabled">disabled</option>
				</select>
			</label>

			<label v-if="hasControl('duration')" class="transition-demo__field">
				<span>Duration: {{ duration }}ms</span>
				<input
					v-model.number="duration"
					class="transition-demo__range"
					type="range"
					min="100"
					max="1200"
					step="100"
				/>
			</label>

			<label v-if="hasControl('delay')" class="transition-demo__field">
				<span>Delay</span>
				<select v-model.number="delay" class="transition-demo__input">
					<option :value="0">0ms</option>
					<option :value="200">200ms</option>
					<option :value="500">500ms</option>
				</select>
			</label>

			<label v-if="hasControl('stagger')" class="transition-demo__field">
				<span>Stagger</span>
				<select v-model.number="stagger" class="transition-demo__input">
					<option :value="0">0ms</option>
					<option :value="50">50ms</option>
					<option :value="100">100ms</option>
					<option :value="200">200ms</option>
				</select>
			</label>

			<label v-if="hasControl('easing')" class="transition-demo__field">
				<span>Easing</span>
				<select v-model="easing" class="transition-demo__input">
					<option value="ease">ease</option>
					<option value="ease-in">ease-in</option>
					<option value="ease-out">ease-out</option>
					<option value="cubic-bezier(.6, 0, .4, 2)">bounce</option>
				</select>
			</label>

			<label v-if="hasControl('moveDuration')" class="transition-demo__field">
				<span>Move duration: {{ moveDuration }}ms</span>
				<input
					v-model.number="moveDuration"
					class="transition-demo__range"
					type="range"
					min="100"
					max="1200"
					step="100"
				/>
			</label>

			<label v-if="hasControl('noOpacity')" class="transition-demo__checkbox">
				<input v-model="noOpacity" type="checkbox" />
				Keep opacity unchanged
			</label>

			<label v-if="hasControl('noMove')" class="transition-demo__checkbox">
				<input v-model="noMove" type="checkbox" />
				Keep leaving items in flow
			</label>
		</div>

		<div class="transition-demo__code">
			<div class="transition-demo__code-label">Simplified code</div>
			<pre class="transition-demo__code-block"><code
				class="transition-demo__code-content"
			><template v-if="highlightedLines.length > 0"><span
					v-for="(line, lineIndex) in highlightedLines"
					:key="lineIndex"
					class="transition-demo__code-line"
				><span
					v-for="(token, tokenIndex) in line"
					:key="tokenIndex"
					class="transition-demo__code-token"
					:style="token.htmlStyle"
			>{{ token.content }}</span></span></template><template v-else>{{ codeSnippet }}</template></code></pre>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed, ref, shallowRef, watch } from 'vue';
	import {
		TransitionExpand,
		TransitionFade,
		TransitionMixed,
		TransitionScale,
		TransitionSlide,
	} from '../../../../src/index.js';
	import { highlightCode } from './highlight-code.js';
	import type { HighlightedToken } from './highlight-code.js';

	type Control =
		'axis'
		| 'delay'
		| 'duration'
		| 'easing'
		| 'enterPreset'
		| 'leavePreset'
		| 'motion'
		| 'moveDuration'
		| 'noMove'
		| 'noOpacity'
		| 'offset'
		| 'origin'
		| 'scale'
		| 'stagger';
	type Preset = 'expand' | 'fade' | 'scale' | 'slide';
	type PreviewMode = 'group' | 'single';
	type TransitionName = 'expand' | 'fade' | 'mixed' | 'scale' | 'slide';

	const $props = withDefaults(defineProps<{
		controls?: Control[];
		defaultMode?: PreviewMode;
		defaultNoMove?: boolean;
		transition: TransitionName;
	}>(), {
		controls: () => [],
		defaultMode: 'single',
		defaultNoMove: false,
	});

	const transitionComponents = {
		expand: TransitionExpand,
		fade: TransitionFade,
		mixed: TransitionMixed,
		scale: TransitionScale,
		slide: TransitionSlide,
	};
	const transitionLabels = {
		expand: 'TransitionExpand',
		fade: 'TransitionFade',
		mixed: 'TransitionMixed',
		scale: 'TransitionScale',
		slide: 'TransitionSlide',
	};
	const transitionTags = {
		expand: 'transition-expand',
		fade: 'transition-fade',
		mixed: 'transition-mixed',
		scale: 'transition-scale',
		slide: 'transition-slide',
	};
	const offsetOptions = {
		down: [0, 32],
		left: [-48, 0],
		opposite: { enter: [0, -32], leave: [0, 32] },
		right: [48, 0],
		up: [0, -32],
	};
	const previewModes: PreviewMode[] = ['single', 'group'];
	const presetOptions: Preset[] = ['fade', 'expand', 'slide', 'scale'];

	const mode = ref<PreviewMode>($props.defaultMode);
	const isVisible = ref(true);
	const items = ref([1, 2, 3, 4]);
	const nextItem = ref(5);
	const axis = ref($props.transition === 'scale' ? 'both' : 'y');
	const offset = ref<keyof typeof offsetOptions>('up');
	const scale = ref(0.6);
	const origin = ref('50% 50%');
	const enterPreset = ref<Preset>('scale');
	const leavePreset = ref<Preset>('slide');
	const motion = ref('system');
	const duration = ref(400);
	const delay = ref(0);
	const stagger = ref(100);
	const easing = ref('cubic-bezier(.25, .8, .5, 1)');
	const moveDuration = ref(400);
	const noMove = ref($props.defaultNoMove);
	const noOpacity = ref(false);

	const activeTransition = computed(() => transitionComponents[$props.transition]);
	const axisOptions = computed(() => $props.transition === 'scale' ? ['both', 'x', 'y'] : ['x', 'y']);
	const isGroup = computed(() => mode.value === 'group');
	const transitionLabel = computed(() => transitionLabels[$props.transition]);
	const hasControl = (control: Control) => $props.controls.includes(control);
	const getPreset = (preset: Preset) => {
		if (preset === 'expand') return { preset, axis: 'y' };
		if (preset === 'scale') return { preset, scale: 0.6 };
		if (preset === 'slide') return { preset, offset: [0, 32] };

		return { preset };
	};
	const setMode = (previewMode: PreviewMode) => {
		mode.value = previewMode;
		isVisible.value = true;
	};
	const toggleSinglePreview = () => {
		if (isGroup.value) return;

		isVisible.value = !isVisible.value;
	};
	const onStageKeydown = (event: KeyboardEvent) => {
		if (isGroup.value || ![' ', 'Enter'].includes(event.key)) return;

		event.preventDefault();
		toggleSinglePreview();
	};
	const addItem = () => {
		items.value.push(nextItem.value);
		nextItem.value += 1;
	};
	const removeItem = (item: number) => {
		if (items.value.length === 1) return;

		items.value = items.value.filter((candidate) => candidate !== item);
	};
	const reverseItems = () => {
		items.value.reverse();
	};
	const clearItems = () => {
		items.value = [];
	};
	const resetItems = () => {
		items.value = [1, 2, 3, 4];
		nextItem.value = 5;
	};
	const transitionOptions = computed(() => {
		const commonOptions = {
			delay: delay.value,
			duration: duration.value,
			easing: easing.value,
			group: isGroup.value,
			motion: motion.value,
			moveDuration: moveDuration.value,
			noMove: noMove.value,
			noOpacity: noOpacity.value,
			stagger: hasControl('stagger') ? stagger.value : 0,
			tag: 'ul',
		};

		if ($props.transition === 'mixed') {
			return {
				...commonOptions,
				enter: getPreset(enterPreset.value),
				leave: getPreset(leavePreset.value),
			};
		}

		if ($props.transition === 'expand') return { ...commonOptions, axis: axis.value };
		if ($props.transition === 'scale') {
			return { ...commonOptions, axis: axis.value, origin: origin.value, scale: scale.value };
		}
		if ($props.transition === 'slide') {
			return { ...commonOptions, offset: offsetOptions[offset.value] };
		}

		return commonOptions;
	});
	const codeSnippet = computed(() => {
		const attributes: string[] = [];

		if (isGroup.value) attributes.push('group', 'tag="ul"');
		if (hasControl('motion')) attributes.push(`motion="${motion.value}"`);
		if (hasControl('duration')) attributes.push(`:duration="${duration.value}"`);
		if (hasControl('delay')) attributes.push(`:delay="${delay.value}"`);
		if (hasControl('stagger') && isGroup.value) attributes.push(`:stagger="${stagger.value}"`);
		if (hasControl('easing')) attributes.push(`easing="${easing.value}"`);
		if (hasControl('moveDuration') && isGroup.value) {
			attributes.push(`:move-duration="${moveDuration.value}"`);
		}
		if (hasControl('noMove') && isGroup.value && noMove.value) attributes.push('no-move');
		if (hasControl('noOpacity') && noOpacity.value) attributes.push('no-opacity');

		if ($props.transition === 'mixed') {
			attributes.push(
				`:enter="{ preset: '${enterPreset.value}' }"`,
				`:leave="{ preset: '${leavePreset.value}' }"`,
			);
		}
		if ($props.transition === 'expand') attributes.push(`axis="${axis.value}"`);
		if ($props.transition === 'scale') {
			attributes.push(`axis="${axis.value}"`, `:scale="${scale.value}"`, `origin="${origin.value}"`);
		}
		if ($props.transition === 'slide') {
			const offsetValue = offset.value === 'opposite'
				? `{ enter: [0, -32], leave: [0, 32] }`
				: JSON.stringify(offsetOptions[offset.value]);

			attributes.push(`:offset="${offsetValue}"`);
		}

		const tag = transitionTags[$props.transition];
		const attributesCode = attributes.map((attribute) => `\t${attribute}`).join('\n');
		const openingTag = attributes.length === 0
			? `<${tag}>`
			: `<${tag}\n${attributesCode}\n>`;
		const content = isGroup.value
			? '\t<li v-for="item in items" :key="item.id">{{ item.label }}</li>'
			: '\t<div v-if="isVisible">Content</div>';

		return `${openingTag}\n${content}\n</${tag}>`;
	});
	const highlightedLines = shallowRef<HighlightedToken[][]>([]);

	watch(codeSnippet, async (snippet) => {
		const lines = await highlightCode(snippet);

		if (snippet !== codeSnippet.value) return;

		highlightedLines.value = lines;
	}, { immediate: true });
</script>

<style lang="scss" src="./transition-demo.scss"></style>
