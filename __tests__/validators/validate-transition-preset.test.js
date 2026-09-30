import { describe, expect, it } from 'vitest';
import { validateTransitionPreset } from '../../src/utility/validate/validate-transition-preset.js';

describe(validateTransitionPreset, () => {
	it('Returns `true` for every preset without optional properties', () => {
		expect(validateTransitionPreset({ preset: 'fade' })).toBe(true);
		expect(validateTransitionPreset({ preset: 'expand' })).toBe(true);
		expect(validateTransitionPreset({ preset: 'scale' })).toBe(true);
		expect(validateTransitionPreset({ preset: 'slide' })).toBe(true);
	});

	it('Returns `true` for valid preset-specific properties', () => {
		expect(validateTransitionPreset({ preset: 'expand', axis: 'x' })).toBe(true);
		expect(validateTransitionPreset({ preset: 'scale', axis: 'y', origin: '50% 0', scale: 0.8 }))
			.toBe(true);
		expect(validateTransitionPreset({ preset: 'slide', offset: [0, '100%'] })).toBe(true);
	});

	it('Returns `false` for unsupported presets', () => {
		expect(validateTransitionPreset({ preset: 'rotate' })).toBe(false);
		expect(validateTransitionPreset({ preset: '' })).toBe(false);
	});

	it('Returns `false` for invalid descriptor values', () => {
		expect(validateTransitionPreset(null)).toBe(false);
		expect(validateTransitionPreset(undefined)).toBe(false);
		expect(validateTransitionPreset('scale')).toBe(false);
		expect(validateTransitionPreset([])).toBe(false);
		expect(validateTransitionPreset({})).toBe(false);
	});

	it('Returns `false` for properties that belong to another preset', () => {
		expect(validateTransitionPreset({ preset: 'fade', offset: [0, 16] })).toBe(false);
		expect(validateTransitionPreset({ preset: 'expand', scale: 0.8 })).toBe(false);
		expect(validateTransitionPreset({ preset: 'scale', offset: [0, 16] })).toBe(false);
		expect(validateTransitionPreset({ preset: 'slide', origin: '50% 50%' })).toBe(false);
	});

	it('Returns `false` for invalid preset-specific properties', () => {
		expect(validateTransitionPreset({ preset: 'expand', axis: 'both' })).toBe(false);
		expect(validateTransitionPreset({ preset: 'scale', axis: 'diagonal' })).toBe(false);
		expect(validateTransitionPreset({ preset: 'scale', origin: '' })).toBe(false);
		expect(validateTransitionPreset({ preset: 'scale', scale: 2 })).toBe(false);
		expect(validateTransitionPreset({ preset: 'slide', offset: [0] })).toBe(false);
	});

	it('Returns `false` for nested enter and leave values', () => {
		expect(validateTransitionPreset({
			preset: 'scale',
			axis: { enter: 'x', leave: 'y' },
		})).toBe(false);
		expect(validateTransitionPreset({
			preset: 'slide',
			offset: { enter: [0, -16], leave: [0, 16] },
		})).toBe(false);
	});
});
