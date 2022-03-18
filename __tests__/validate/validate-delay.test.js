const { validateDelay } = require('../../src/utility/validate/validate-delay.js');

describe('validateDelay', () => {
	it('Returns `true` if a given value is a positive integer number', () => {
		expect(validateDelay(100)).toBe(true);
	});

	it('Returns `true` if a given value is a zero', () => {
		expect(validateDelay(0)).toBe(true);
	});

	it('Returns `false` if a given value is a negative integer number', () => {
		expect(validateDelay(-100)).toBe(false);
	});

	it('Returns `false` if a given value is a number that is a fractional number', () => {
		expect(validateDelay(123.45)).toBe(false);
		expect(validateDelay(-123.45)).toBe(false);
	});

	it('Returns `false` if a given value is a number that is `Infinity`', () => {
		expect(validateDelay(Infinity)).toBe(false);
		expect(validateDelay(-Infinity)).toBe(false);
	});

	it('Returns `false` if a given value is a number that is `NaN`', () => {
		expect(validateDelay(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is a string representation of an integer number`', () => {
		expect(validateDelay('100')).toBe(false);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(validateDelay('foo')).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `in` and `out` which values are valid', () => {
		expect(validateDelay({ enter: 100, leave: 200 })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `in` and `out` which values are invalid', () => {
		expect(validateDelay({ enter: 100, leave: 'foo' })).toBe(false);
		expect(validateDelay({ enter: 'foo', leave: 200 })).toBe(false);
		expect(validateDelay({ enter: 'foo', leave: 'bar' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateDelay({ enter: 100 })).toBe(false);
		expect(validateDelay({ leave: 200 })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateDelay({ enter: 100, leave: 200, foo: 300 })).toBe(false);
	});
});
