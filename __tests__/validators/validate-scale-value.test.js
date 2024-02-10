import { describe, it, expect } from 'vitest';
import { validateScaleValue } from '../../src/utility/validate/validate-scale-value.js';

describe('validateScaleAxis', () => {
	it('Returns `true` if a given value is a number between `0` and `1`', () => {
		expect(validateScaleValue(0)).toBe(true);
		expect(validateScaleValue(0.5)).toBe(true);
		expect(validateScaleValue(1)).toBe(true);
	});

	it('Returns `false` if a given value is a number less than `0`', () => {
		expect(validateScaleValue(-1)).toBe(false);
		expect(validateScaleValue(-Infinity)).toBe(false);
	});

	it('Returns `false` if a given value is a number greater than `1`', () => {
		expect(validateScaleValue(2)).toBe(false);
		expect(validateScaleValue(Infinity)).toBe(false);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(validateScaleValue('foo')).toBe(false);
		expect(validateScaleValue(NaN)).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `enter` and `leave` which values are valid', () => {
		expect(validateScaleValue({ enter: 0.5, leave: 0.5 })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `enter` and `leave` which values are invalid', () => {
		expect(validateScaleValue({ enter: 0.5, leave: 'foo' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateScaleValue({ enter: 0.5 })).toBe(false);
		expect(validateScaleValue({ leave: 0.5 })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateScaleValue({ enter: 0.5, leave: 0.5, foo: 'bar' })).toBe(false);
	});
});
