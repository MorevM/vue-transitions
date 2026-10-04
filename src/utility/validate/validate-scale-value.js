import { isNumeric } from '@morev/utils';
import { validateEnterLeave } from './_validate-enter-leave.js';

export const validateScaleValue = (value) => validateEnterLeave(value, (value_) => {
	return isNumeric(value_) && value_ >= 0 && value_ <= 1;
});
