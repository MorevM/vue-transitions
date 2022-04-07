const { validateScaleOrigin } = require('../../src/utility/validate/validate-scale-origin.js');

describe('validateScaleOrigin', () => {
	it('Returns `true` if a given value is a not empty string', () => {
		expect(validateScaleOrigin('25% 75%')).toBe(true);
	});

	it('Returns `false` if a given value is an empty string', () => {
		expect(validateScaleOrigin('')).toBe(false);
	});

	it('Returns `false` if a given value is a string consist of spaces', () => {
		expect(validateScaleOrigin('  ')).toBe(false);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(validateScaleOrigin(123)).toBe(false);
	});

	it('Returns `true` if a given value is the object with keys `enter` and `leave` which values are valid', () => {
		expect(validateScaleOrigin({ enter: '25% 75%', leave: '75% 25%' })).toBe(true);
	});

	it('Returns `false` if a given value is the object with keys `enter` and `leave` which values are invalid', () => {
		expect(validateScaleOrigin({ enter: '25% 75%', leave: 123 })).toBe(false);
		expect(validateScaleOrigin({ enter: 123, leave: '75% 25%' })).toBe(false);
		expect(validateScaleOrigin({ enter: 123, leave: 456 })).toBe(false);
	});

	it('Returns `false` if a given value is the object that does not have some required keys', () => {
		expect(validateScaleOrigin({ enter: '25% 75%' })).toBe(false);
		expect(validateScaleOrigin({ leave: '75% 25%' })).toBe(false);
	});

	it('Returns `false` if a given value is the object that have some invalid keys', () => {
		expect(validateScaleOrigin({ enter: '25% 75%', leave: '75% 25%', foo: '50% 50%' })).toBe(false);
	});
});
