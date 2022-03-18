const { validateDuration } = require('../../src/utility/validate/validate-duration.js');

describe('validateDuration', () => {
	it('Returns `true` if a given value is a positive integer number', () => {
		expect(validateDuration(100)).toBe(true);
	});

	it('Returns `true` if a given value is a zero', () => {
		expect(validateDuration(0)).toBe(true);
	});

	it('Returns `false` if a given value is a negative integer number', () => {
		expect(validateDuration(-100)).toBe(false);
	});

	it('Returns `false` if a given value is a number that is a fractional number', () => {
		expect(validateDuration(123.45)).toBe(false);
		expect(validateDuration(-123.45)).toBe(false);
	});

	it('Returns `false` if a given value is a number that is `Infinity`', () => {
		expect(validateDuration(Infinity)).toBe(false);
		expect(validateDuration(-Infinity)).toBe(false);
	});

	it('Returns `false` if a given value is a number that is `NaN`', () => {
		expect(validateDuration(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is a string representation of an integer number`', () => {
		expect(validateDuration('100')).toBe(false);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(validateDuration('foo')).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `in` and `out` which values are valid', () => {
		expect(validateDuration({ enter: 100, leave: 200 })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `in` and `out` which values are invalid', () => {
		expect(validateDuration({ enter: 100, leave: 'foo' })).toBe(false);
		expect(validateDuration({ enter: 'foo', leave: 200 })).toBe(false);
		expect(validateDuration({ enter: 'foo', leave: 'bar' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateDuration({ enter: 100 })).toBe(false);
		expect(validateDuration({ leave: 200 })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateDuration({ enter: 100, leave: 200, foo: 300 })).toBe(false);
	});
});
