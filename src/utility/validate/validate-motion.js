import { isString } from '@morev/utils';

export const validateMotion = (value) => {
	return isString(value) && ['system', 'enabled', 'disabled'].includes(value);
};
