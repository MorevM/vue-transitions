<template>
	<main
		class="e2e-harness"
		data-testid="harness"
		:data-vue-major="vueMajor"
	>
		<setup-scenario :vue-major="vueMajor" />
	</main>
</template>

<script>
	import SetupScenario from './scenarios/setup-scenario.vue';

	export default {
		name: 'e2e-harness',
		components: {
			SetupScenario,
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
