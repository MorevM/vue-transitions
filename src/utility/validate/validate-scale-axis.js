import { isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateScaleAxis = (value) => validateEnterLeave(value, (value_) => {
	return isString(value_) && ['x', 'y', 'both'].includes(value_);
});
