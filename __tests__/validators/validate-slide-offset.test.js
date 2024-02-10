import { describe, it, expect } from 'vitest';
import { validateSlideOffset } from '../../src/utility/validate/validate-slide-offset.js';

describe('validateSlideOffset', () => {
	it('Returns `true` if a given value is the array of two integer numbers', () => {
		expect(validateSlideOffset([0, -30])).toBe(true);
	});

	it('Returns `true` if a given value is the array of two strings represents the integer numbers', () => {
		expect(validateSlideOffset(['0', '-30'])).toBe(true);
	});

	it('Returns `true` if a given value is the array of two strings represents the percentage value', () => {
		expect(validateSlideOffset(['0%', '-100%'])).toBe(true);
	});

	it('Returns `true` if a given value is the array including both number and percentage', () => {
		expect(validateSlideOffset([50, '100%'])).toBe(true);
	});

	it('Returns `false` if a given value is the array of integer numbers, but not of two', () => {
		expect(validateSlideOffset([10])).toBe(false);
		expect(validateSlideOffset([10, 20, 30])).toBe(false);
	});

	it('Returns `false` if a given value is the array of percentage strings, but not of two', () => {
		expect(validateSlideOffset(['100%'])).toBe(false);
		expect(validateSlideOffset(['0%', '50%', '100%'])).toBe(false);
	});

	it('Returns `false` if a given value is the array of two numbers, but at least one of them is not an integer', () => {
		expect(validateSlideOffset([10, 123.45])).toBe(false);
		expect(validateSlideOffset([10, Infinity])).toBe(false);
		expect(validateSlideOffset([10, NaN])).toBe(false);
	});

	it('Returns `false` if a given value is the array of two strings, but at least one of them is not a percentage value', () => {
		expect(validateSlideOffset(['0px', '-100%'])).toBe(false);
	});

	it('Returns `false` if a given value is the empty array', () => {
		expect(validateSlideOffset([])).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `enter` and `leave` which values are valid', () => {
		expect(validateSlideOffset({ enter: [0, -30], leave: [0, 30] })).toBe(true);
		expect(validateSlideOffset({ enter: ['0%', '-100%'], leave: ['0%', '100%'] })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `enter` and `leave` which values are invalid', () => {
		expect(validateSlideOffset({ enter: [0, -30], leave: 'foo' })).toBe(false);
		expect(validateSlideOffset({ enter: 'foo', leave: [0, 30] })).toBe(false);
		expect(validateSlideOffset({ enter: 'foo', leave: 'bar' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateSlideOffset({ enter: [0, -30] })).toBe(false);
		expect(validateSlideOffset({ leave: [0, 30] })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateSlideOffset({ enter: [0, -30], leave: [0, 30], foo: [30, -30] })).toBe(false);
	});
});
