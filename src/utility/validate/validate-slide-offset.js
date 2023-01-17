import { isArray, isInteger, isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateSlideOffset = (value) => validateEnterLeave(value, (val) => {
	if (!isArray(val)) return false;
	if (val.length !== 2) return false;

	return !val.some(v => {
		if (isInteger(v)) return false;

		if (isString(v)) {
			return isNaN(Number(v.endsWith('%') ? v.slice(0, -1) : v));
		}

		return true;
	});
});
