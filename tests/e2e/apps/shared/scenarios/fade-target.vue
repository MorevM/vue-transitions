<template>
	<div
		class="fade-scenario__target"
		data-testid="fade-target"
		:style="initialStyle"
	>
		Fade target
	</div>
</template>

<script>
	export default {
		name: 'fade-target',
		data: () => ({
			initialStyle: 'opacity: 0.8 !important; transition-duration: 17ms !important;',
		}),
	};
</script>
