import { isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateEasing = (value) => validateEnterLeave(value, (value_) => {
	return isString(value_) && value_.trim() !== '';
});
