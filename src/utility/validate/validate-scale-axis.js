import { isString } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateScaleAxis = (value) => validateEnterLeave(value, (val) => {
	return isString(val) && ['x', 'y', 'both'].includes(val);
});
