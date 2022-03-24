import { isNumeric } from '@morev/helpers';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateScaleValue = (value) => validateEnterLeave(value, (val) => {
	return isNumeric(val) && val >= 0 && val <= 1;
});
