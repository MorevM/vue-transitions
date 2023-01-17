import { isInteger } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateDelay = (value) => validateEnterLeave(value, (val) => {
	return isInteger(val) && val >= 0;
});
