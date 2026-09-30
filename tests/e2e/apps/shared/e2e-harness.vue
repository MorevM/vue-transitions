<template>
	<main
		class="e2e-harness"
		data-testid="harness"
		:data-vue-major="vueMajor"
	>
		<section class="e2e-harness__card" data-testid="harness-card">
			<p class="e2e-harness__eyebrow">Browser test harness</p>
			<h1 class="e2e-harness__title">Vue Transitions</h1>
			<transition-fade>
				<p class="e2e-harness__status" data-testid="library-content">
					Vue {{ vueMajor }} build loaded
				</p>
			</transition-fade>
		</section>
	</main>
</template>

<script>
	import { TransitionFade } from '@morev/vue-transitions';

	export default {
		name: 'e2e-harness',
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

<style src="./e2e-harness.css"></style>
