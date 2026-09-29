import type { DefineComponent, PluginObject } from 'vue';
import type { ComponentPropsAndEmits, PluginOptions } from './index.js';

/* eslint-disable @typescript-eslint/naming-convention -- Vue component names use PascalCase. */
declare const TransitionExpand: DefineComponent<ComponentPropsAndEmits['TransitionExpand']>;
declare const TransitionFade: DefineComponent<ComponentPropsAndEmits['TransitionFade']>;
declare const TransitionScale: DefineComponent<ComponentPropsAndEmits['TransitionScale']>;
declare const TransitionSlide: DefineComponent<ComponentPropsAndEmits['TransitionSlide']>;
/* eslint-enable @typescript-eslint/naming-convention */

declare const plugin: (options?: PluginOptions) => PluginObject<PluginOptions>;
declare const vueTransitions: PluginObject<PluginOptions>;

declare module 'vue' {
	export interface GlobalComponents {
		TransitionFade: typeof TransitionFade;
		TransitionExpand: typeof TransitionExpand;
		TransitionScale: typeof TransitionScale;
		TransitionSlide: typeof TransitionSlide;
	}
}

export { plugin, TransitionExpand, TransitionFade, TransitionScale, TransitionSlide };
export type { ComponentProps, ComponentPropsAndEmits, Emits, PluginOptions } from './index.js';
export default vueTransitions;
