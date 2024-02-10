import { describe, it, expect } from 'vitest';
import { validateScaleAxis } from '../../src/utility/validate/validate-scale-axis.js';

describe('validateScaleAxis', () => {
	it('Returns `true` if a given value is one of the strings: `x`, `y` or `both`', () => {
		expect(validateScaleAxis('x')).toBe(true);
		expect(validateScaleAxis('y')).toBe(true);
		expect(validateScaleAxis('both')).toBe(true);
	});

	it('Returns `false` if a given value is an invalid string', () => {
		expect(validateScaleAxis('foo')).toBe(false);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(validateScaleAxis(123)).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `enter` and `leave` which values are valid', () => {
		expect(validateScaleAxis({ enter: 'x', leave: 'y' })).toBe(true);
		expect(validateScaleAxis({ enter: 'x', leave: 'both' })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `enter` and `leave` which values are invalid', () => {
		expect(validateScaleAxis({ enter: 'x', leave: 'foo' })).toBe(false);
		expect(validateScaleAxis({ enter: 'foo', leave: 'y' })).toBe(false);
		expect(validateScaleAxis({ enter: 'foo', leave: 'bar' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateScaleAxis({ enter: 'x' })).toBe(false);
		expect(validateScaleAxis({ leave: 'y' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateScaleAxis({ enter: 'x', leave: 'y', foo: 'both' })).toBe(false);
	});
});
