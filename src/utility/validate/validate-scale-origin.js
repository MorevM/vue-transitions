import { isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateScaleOrigin = (value) => validateEnterLeave(value, (val) => {
	return isString(val) && val.trim() !== '';
});
