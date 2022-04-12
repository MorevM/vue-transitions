import { kebabCase, isArray, isObject, pascalCase } from '@morev/helpers';
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

const setProp = (component, prop, value) => {
	component.props ??= {};
	component.props[prop] = {
		default: isArray(value) || isObject(value) ? () => value : value,
	};
};

const getComponentDeclaration = (name, options) => {
	const kebabName = kebabCase(name);
	const pascalName = pascalCase(name);
	const defaultProps = options?.defaultProps ?? {};
	const componentProps = options?.componentDefaultProps?.[pascalName] ?? {};

	Object.entries(defaultProps).forEach(([prop, propValue]) => {
		setProp(components[kebabName], prop, propValue);
	});

	Object.entries(componentProps).forEach(([prop, propValue]) => {
		setProp(components[kebabName], prop, propValue);
	});

	return components[kebabName];
};

const install = function (Vue, options = {}) {
	if (options?.components) {
		Object.entries(options.components).forEach(([originalName, neededName]) => {
			Vue.component(neededName, getComponentDeclaration(originalName, options));
		});
	} else {
		Object.keys(components).forEach((name) => {
			Vue.component(name, getComponentDeclaration(name, options));
		});
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
