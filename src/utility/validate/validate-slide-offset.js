import { isArray, isInteger, isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateSlideOffset = (value) => validateEnterLeave(value, (value_) => {
	if (!isArray(value_)) return false;
	if (value_.length !== 2) return false;

	return !value_.some((offsetPart) => {
		if (isInteger(offsetPart)) return false;

		if (isString(offsetPart)) {
			return isNaN(Number(offsetPart.endsWith('%') ? offsetPart.slice(0, -1) : offsetPart));
		}

		return true;
	});
});
