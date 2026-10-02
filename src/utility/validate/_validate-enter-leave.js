import { isObject } from '@morev/utils';

export const validateEnterLeave = (value, validator) => {
	if (validator(value)) return true;
	if (!isObject(value)) return false;
	if (Object.keys(value).length !== 2) return false;

	return !Object.entries(value).some(([key, value_]) => {
		const isWrongKey = !['enter', 'leave'].includes(key);
		const isWrongValue = !validator(value_);

		return isWrongKey || isWrongValue;
	});
};
