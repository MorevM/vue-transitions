import { isArray, isObject } from '@morev/utils';
import TransitionExpand from './transitions/transition-expand/transition-expand.vue';
import TransitionFade from './transitions/transition-fade/transition-fade.vue';
import TransitionScale from './transitions/transition-scale/transition-scale.vue';
import TransitionSlide from './transitions/transition-slide/transition-slide.vue';

const components = { TransitionExpand, TransitionFade, TransitionScale, TransitionSlide };

const setProp = (component, prop, value) => {
	component.props ??= {};
	component.props[prop] = {
		default: isArray(value) || isObject(value) ? () => value : value,
	};
};

const getComponentDeclaration = (name, options) => {
	const defaultProps = options?.defaultProps ?? {};
	const componentProps = options?.componentDefaultProps?.[name] ?? {};

	Object.entries(defaultProps).forEach(([prop, propValue]) => {
		setProp(components[name], prop, propValue);
	});

	Object.entries(componentProps).forEach(([prop, propValue]) => {
		setProp(components[name], prop, propValue);
	});

	return components[name];
};

const install = function (Vue, options = {}) {
	Object.keys(components).forEach((name) => {
		Vue.component(name, getComponentDeclaration(name, options));
	});
};

export const plugin = (pluginOptions) => ({
	install(Vue, options) {
		install(Vue, pluginOptions);
	},
});

export { TransitionExpand, TransitionFade, TransitionScale, TransitionSlide };
export default { install };
