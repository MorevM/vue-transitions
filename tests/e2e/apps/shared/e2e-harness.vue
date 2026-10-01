<template>
	<main
		class="e2e-harness"
		data-testid="harness"
		:data-vue-major="vueMajor"
	>
		<fade-scenario v-if="scenario === 'fade'" />
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
		data: () => ({
			scenario: new URLSearchParams(window.location.search).get('scenario'),
		}),
	};
</script>

<style src="./e2e-harness.css"></style>
