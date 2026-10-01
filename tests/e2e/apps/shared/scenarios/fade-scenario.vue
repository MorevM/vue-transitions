<template>
	<section
		ref="scenario"
		class="fade-scenario"
		data-testid="fade-scenario"
		data-events=""
	>
		<header class="fade-scenario__header">
			<p class="fade-scenario__eyebrow">TransitionFade</p>
			<h1 class="fade-scenario__title">Opacity lifecycle</h1>
		</header>

		<div class="fade-scenario__controls">
			<button type="button" :disabled="isVisible" @click="showTarget">Show</button>
			<button type="button" :disabled="!isVisible" @click="hideTarget">Hide</button>
		</div>

		<div class="fade-scenario__stage" data-testid="fade-stage">
			<div class="fade-scenario__target-container">
				<transition-fade
					easing="linear"
					:duration="2000"
					:delay="200"
					@before-enter="recordEvent('before-enter', $event)"
					@enter="recordEvent('enter', $event)"
					@after-enter="recordEvent('after-enter', $event)"
					@enter-cancelled="recordEvent('enter-cancelled', $event)"
					@before-leave="recordEvent('before-leave', $event)"
					@leave="recordEvent('leave', $event)"
					@after-leave="recordEvent('after-leave', $event)"
					@leave-cancelled="recordEvent('leave-cancelled', $event)"
				>
					<fade-target v-if="useVShow" v-show="isVisible" key="v-show" />
					<fade-target v-else-if="isVisible" key="v-if" />
				</transition-fade>
			</div>
		</div>
	</section>
</template>

<script>
	import { TransitionFade } from '@morev/vue-transitions';
	import FadeTarget from './fade-target.vue';

	const TRACKED_STYLE_PROPERTIES = [
		'opacity',
		'transition-duration',
		'transition-timing-function',
		'transition-delay',
	];

	const serializeInlineStyles = (element) => TRACKED_STYLE_PROPERTIES
		.filter((property) => element.style.getPropertyValue(property))
		.map((property) => {
			const value = element.style.getPropertyValue(property);
			const priority = element.style.getPropertyPriority(property);
			const prioritySuffix = priority ? ` !${priority}` : '';
			return `${property}:${value}${prioritySuffix}`;
		})
		.join(';');

	export default {
		name: 'fade-scenario',
		components: {
			FadeTarget,
			TransitionFade,
		},
		props: {
			initiallyVisible: {
				type: Boolean,
				default: false,
			},
			preserveEvents: {
				type: Boolean,
				default: false,
			},
			useVShow: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				isVisible: this.initiallyVisible,
			};
		},
		methods: {
			hideTarget() {
				if (!this.preserveEvents) this.resetEventLog();
				this.isVisible = false;
			},

			recordEvent(event, element) {
				const { scenario } = this.$refs;
				scenario.dataset.events = [scenario.dataset.events, event].filter(Boolean).join(',');

				if (event === 'enter') scenario.dataset.enterStyles = serializeInlineStyles(element);
				if (event === 'leave') scenario.dataset.leaveStyles = serializeInlineStyles(element);
				if (event === 'enter-cancelled') {
					scenario.dataset.enterCancelledStyles = serializeInlineStyles(element);
				}
				if (event === 'leave-cancelled') {
					scenario.dataset.leaveCancelledStyles = serializeInlineStyles(element);
				}
				if (event === 'after-enter') {
					scenario.dataset.afterEnterStyles = serializeInlineStyles(element);
				}
				if (event === 'after-leave') {
					scenario.dataset.afterLeaveStyles = serializeInlineStyles(element);
				}
			},

			resetEventLog() {
				const { dataset } = this.$refs.scenario;
				dataset.events = '';
				delete dataset.enterStyles;
				delete dataset.leaveStyles;
				delete dataset.enterCancelledStyles;
				delete dataset.leaveCancelledStyles;
				delete dataset.afterEnterStyles;
				delete dataset.afterLeaveStyles;
			},

			showTarget() {
				if (!this.preserveEvents) this.resetEventLog();
				this.isVisible = true;
			},
		},
	};
</script>

<style src="./fade-scenario.css"></style>
