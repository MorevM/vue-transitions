import { describe, expect, it } from 'vitest';
import { validateMotion } from '../../src/utility/validate/validate-motion.js';

describe(validateMotion, () => {
	it('Returns `true` for supported motion policies', () => {
		expect(validateMotion('system')).toBe(true);
		expect(validateMotion('enabled')).toBe(true);
		expect(validateMotion('disabled')).toBe(true);
	});

	it('Returns `false` for unsupported string values', () => {
		expect(validateMotion('auto')).toBe(false);
		expect(validateMotion('')).toBe(false);
	});

	it('Returns `false` for non-string values', () => {
		expect(validateMotion(false)).toBe(false);
		expect(validateMotion(undefined)).toBe(false);
		expect(validateMotion(null)).toBe(false);
	});
});
