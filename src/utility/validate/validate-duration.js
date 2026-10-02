import { isInteger } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateDuration = (value) => validateEnterLeave(value, (value_) => {
	return isInteger(value_) && value_ >= 0;
});
