import type { PluginObject } from 'vue';

// Helpers
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

// All components
type TransitionComponents = 'TransitionFade' | 'TransitionSlide' | 'TransitionExpand' | 'TransitionScale';

// Common props
type CommonProps = {
	tag: string;
	group: boolean;
	appear: boolean | undefined;
	mode: 'in-out' | 'out-in' | undefined;
	duration: number | { enter: number; leave: number };
	delay: number | { enter: number; leave: number };
	easing: string | { enter: string; leave: string };
	moveDuration: number;
	noOpacity: boolean;
	noMove: boolean;
};

// Unique props
type PropExpandAxisValue = 'x' | 'y';
type PropSlideOffsetValue = [number | string, number | string];
type PropScaleAxisValue = 'x' | 'y' | 'both';

type UniqueProps = {
	TransitionFade: never;
	TransitionSlide: {
		offset: PropSlideOffsetValue | { enter: PropSlideOffsetValue; leave: PropSlideOffsetValue };
	};
	TransitionExpand: {
		axis: PropExpandAxisValue | { enter: PropExpandAxisValue; leave: PropExpandAxisValue };
	};
	TransitionScale: {
		axis: PropScaleAxisValue | { enter: PropScaleAxisValue; leave: PropScaleAxisValue };
		origin: string | { enter: string; leave: string };
		scale: number | { enter: number; leave: number };
	};
};

type ComponentProps = {
	TransitionFade: CommonProps;
	TransitionExpand: CommonProps & UniqueProps['TransitionExpand'];
	TransitionSlide: CommonProps & UniqueProps['TransitionSlide'];
	TransitionScale: CommonProps & UniqueProps['TransitionScale'];
};

type PluginOptions = Partial<{
	/**
	 * Components for global registration. \
	 * Key is an original transition name written in PascalCase like `TransitionExpand`. \
	 * Value is transition name you want to use in your code. It's recommended to not override those names.
	 */
	components: Partial<{ [key in TransitionComponents]: string }>;
	/**
	 * An object allows to change plugin default prop values. \
	 * Key is the prop name, value is desired prop value. \
	 * IMPORTANT: Those props are not validated, so make sure you are using the right values.
	 */
	defaultProps: Partial<CommonProps>;
	/**
	 * An object allows to change default prop values per-component. \
	 * Key is the original transition name written in PascalCase, value is object same as `defaultProps`.
	 */
	componentDefaultProps: DeepPartial<ComponentProps>;
}>;


declare const vueTransitions: () => PluginObject<PluginOptions>;

export const plugin: (options: PluginOptions) => PluginObject<PluginOptions>;
export default vueTransitions;
