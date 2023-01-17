import { isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateEasing = (value) => validateEnterLeave(value, (val) => {
	return isString(val) && val.trim() !== '';
});
