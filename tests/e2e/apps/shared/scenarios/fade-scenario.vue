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
					@before-leave="recordEvent('before-leave', $event)"
					@leave="recordEvent('leave', $event)"
					@after-leave="recordEvent('after-leave', $event)"
				>
					<!-- eslint-disable vue/no-static-inline-styles -- Inline style restoration is under test. -->
					<div
						v-if="isVisible"
						class="fade-scenario__target"
						data-testid="fade-target"
						style="opacity: 0.8 !important; transition-duration: 17ms !important;"
					>
						Fade target
					</div>
					<!-- eslint-enable vue/no-static-inline-styles -->
				</transition-fade>
			</div>
		</div>
	</section>
</template>

<script>
	import { TransitionFade } from '@morev/vue-transitions';

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
			TransitionFade,
		},
		data: () => ({
			isVisible: false,
		}),
		methods: {
			hideTarget() {
				this.resetEventLog();
				this.isVisible = false;
			},

			recordEvent(event, element) {
				const { scenario } = this.$refs;
				scenario.dataset.events = [scenario.dataset.events, event].filter(Boolean).join(',');

				if (event === 'enter') scenario.dataset.enterStyles = serializeInlineStyles(element);
				if (event === 'leave') scenario.dataset.leaveStyles = serializeInlineStyles(element);
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
				delete dataset.afterEnterStyles;
				delete dataset.afterLeaveStyles;
			},

			showTarget() {
				this.resetEventLog();
				this.isVisible = true;
			},
		},
	};
</script>

<style src="./fade-scenario.css"></style>
