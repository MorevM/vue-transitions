import { isArray, isObject, isString } from '@morev/utils';
import { validateExpandAxis } from './validate-expand-axis.js';
import { validateScaleAxis } from './validate-scale-axis.js';
import { validateScaleOrigin } from './validate-scale-origin.js';
import { validateScaleValue } from './validate-scale-value.js';
import { validateSlideOffset } from './validate-slide-offset.js';

const presetValidators = {
	expand: {
		axis: (value) => isString(value) && validateExpandAxis(value),
	},
	fade: {},
	scale: {
		axis: (value) => isString(value) && validateScaleAxis(value),
		origin: (value) => isString(value) && validateScaleOrigin(value),
		scale: (value) => !isObject(value) && validateScaleValue(value),
	},
	slide: {
		offset: (value) => isArray(value) && validateSlideOffset(value),
	},
};

export const validateTransitionPreset = (value) => {
	if (!isObject(value) || isArray(value)) return false;
	if (!Object.hasOwn(value, 'preset')) return false;

	const validators = presetValidators[value.preset];

	if (!validators) return false;

	return Object.entries(value).every(([key, option]) => {
		if (key === 'preset') return true;

		return validators[key]?.(option) ?? false;
	});
};
