import { isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateScaleOrigin = (value) => validateEnterLeave(value, (value_) => {
	return isString(value_) && value_.trim() !== '';
});
