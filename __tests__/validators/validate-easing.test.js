import { describe, it, expect } from 'vitest';
import { validateEasing } from '../../src/utility/validate/validate-easing.js';

describe('validateEasing', () => {
	it('Returns `true` if a given value is a not empty string', () => {
		expect(validateEasing('ease-in-out')).toBe(true);
	});

	it('Returns `false` if a given value is an empty string', () => {
		expect(validateEasing('')).toBe(false);
	});

	it('Returns `false` if a given value is a string consist of spaces', () => {
		expect(validateEasing('  ')).toBe(false);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(validateEasing(123)).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `enter` and `leave` which values are valid', () => {
		expect(validateEasing({ enter: 'ease-in', leave: 'ease-out' })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `enter` and `leave` which values are invalid', () => {
		expect(validateEasing({ enter: 'ease-in', leave: 123 })).toBe(false);
		expect(validateEasing({ enter: 123, leave: 'ease-out' })).toBe(false);
		expect(validateEasing({ enter: 123, leave: 456 })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateEasing({ enter: 'ease-in' })).toBe(false);
		expect(validateEasing({ leave: 'ease-out' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateEasing({ enter: 'ease-in', leave: 'ease-out', foo: 'ease-in-out' })).toBe(false);
	});
});
