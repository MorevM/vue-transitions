export default defineNuxtConfig({
	modules: ['@morev/vue-transitions/nuxt'],
	vueTransitions: {
		componentDefaultProps: {
			TransitionFade: { easing: 'linear' },
		},
		defaultProps: { duration: 175 },
	},
});
