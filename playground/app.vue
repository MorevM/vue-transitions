<template>
	<div v-bem id="app">
		<transition-proxy />
	</div>
</template>

<script>
	import TransitionProxy from './components/transition-proxy/transition-proxy.vue';

	export default {
		name: 'app',
		components: {
			TransitionProxy,
		},
		data: () => ({}),
		computed: {},
		watch: {},
		methods: {},
	};
</script>

<style lang="scss" src="./main.scss"></style>
