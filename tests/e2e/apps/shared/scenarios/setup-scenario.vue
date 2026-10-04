<template>
	<section class="setup-scenario" data-testid="harness-card">
		<p class="setup-scenario__eyebrow">Browser test harness</p>
		<h1 class="setup-scenario__title">Vue Transitions</h1>
		<transition-fade>
			<p class="setup-scenario__status" data-testid="library-content">
				Vue {{ vueMajor }} build loaded
			</p>
		</transition-fade>
	</section>
</template>

<script>
	import { TransitionFade } from '@morev/vue-transitions';

	export default {
		name: 'setup-scenario',
		components: {
			TransitionFade,
		},
		props: {
			vueMajor: {
				type: Number,
				required: true,
			},
		},
	};
</script>

<style src="./setup-scenario.css"></style>
