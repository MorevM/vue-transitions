import { isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateExpandAxis = (value) => validateEnterLeave(value, (value_) => {
	return isString(value_) && ['x', 'y'].includes(value_);
});
