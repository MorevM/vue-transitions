<template>
	<main
		class="e2e-harness"
		data-testid="harness"
		:data-vue-major="vueMajor"
	>
		<fade-scenario v-if="scenario === 'fade'" key="fade" />
		<fade-scenario
			v-else-if="scenario === 'fade-reversal'"
			key="fade-reversal"
			preserve-events
			use-v-show
			:initially-visible="isInitiallyVisible"
		/>
		<setup-scenario v-else :vue-major="vueMajor" />
	</main>
</template>

<script>
	import FadeScenario from './scenarios/fade-scenario.vue';
	import SetupScenario from './scenarios/setup-scenario.vue';

	export default {
		name: 'e2e-harness',
		components: {
			FadeScenario,
			SetupScenario,
		},
		props: {
			vueMajor: {
				type: Number,
				required: true,
			},
		},
		data: () => {
			const searchParams = new URLSearchParams(window.location.search);
			return {
				isInitiallyVisible: searchParams.get('visible') === 'true',
				scenario: searchParams.get('scenario'),
			};
		},
	};
</script>

<style src="./e2e-harness.css"></style>
