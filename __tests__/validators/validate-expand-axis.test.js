import { describe, it, expect } from 'vitest';
import { validateExpandAxis } from '../../src/utility/validate/validate-expand-axis.js';

describe('validateExpandAxis', () => {
	it('Returns `true` if a given value is `x` or `y`', () => {
		expect(validateExpandAxis('x')).toBe(true);
		expect(validateExpandAxis('y')).toBe(true);
	});

	it('Returns `false` if a given value is an invalid string', () => {
		expect(validateExpandAxis('foo')).toBe(false);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(validateExpandAxis(123)).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `enter` and `leave` which values are valid', () => {
		expect(validateExpandAxis({ enter: 'x', leave: 'y' })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `enter` and `leave` which values are invalid', () => {
		expect(validateExpandAxis({ enter: 'x', leave: 'foo' })).toBe(false);
		expect(validateExpandAxis({ enter: 'foo', leave: 'y' })).toBe(false);
		expect(validateExpandAxis({ enter: 'foo', leave: 'bar' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateExpandAxis({ enter: 'x' })).toBe(false);
		expect(validateExpandAxis({ leave: 'y' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateExpandAxis({ enter: 'x', leave: 'y', foo: 'x' })).toBe(false);
	});
});
