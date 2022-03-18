import TransitionExpand from './transitions/transition-expand/transition-expand.vue';
import TransitionFade from './transitions/transition-fade/transition-fade.vue';
import TransitionScale from './transitions/transition-scale/transition-scale.vue';
import TransitionSlide from './transitions/transition-slide/transition-slide.vue';

const components = {
	[TransitionExpand.name]: TransitionExpand,
	[TransitionFade.name]: TransitionFade,
	[TransitionScale.name]: TransitionScale,
	[TransitionSlide.name]: TransitionSlide,
};

const install = function (Vue, options) {
	if (options && options.components) {
		options.components.forEach(({ name }) => Vue.component(name, components[name]));
	} else {
		Object.keys(components).forEach((name) => Vue.component(name, components[name]));
	}
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use({ install });
}

export default {
	install,
};

export {
	TransitionExpand,
	TransitionFade,
	TransitionScale,
	TransitionSlide,
};
