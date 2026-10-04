import { expandPreset } from './expand.js';
import { fadePreset } from './fade.js';
import { scalePreset } from './scale.js';
import { slidePreset } from './slide.js';

export { expandPreset, fadePreset, scalePreset, slidePreset };

export const transitionPresets = {
	expand: expandPreset,
	fade: fadePreset,
	scale: scalePreset,
	slide: slidePreset,
};

export const getTransitionPreset = (name) => transitionPresets[name] ?? fadePreset;
