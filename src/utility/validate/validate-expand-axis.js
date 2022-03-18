import { isString } from '@morev/helpers';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateExpandAxis = (value) => validateEnterLeave(value, (val) => {
	return isString(val) && ['x', 'y'].includes(val);
});
