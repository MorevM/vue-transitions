<template>
	<the-transition v-bind="<%= options.propsDeclaration %>">
		<slot></slot>
	</the-transition>
</template>

<script>
	import { <%= options.componentName %> as TheTransition } from '@morev/vue-transitions';

	export default {
		name: '<%= options.componentName %>',
		inheritAttrs: false,
		components: { TheTransition },
	};
</script>
