import { expect, test } from '@playwright/test';
import {
	FADE_ACTIVE_INLINE_STYLES,
	FADE_RESTORED_INLINE_STYLES,
} from './support/fade';
import {
	getAnimationCount,
	pauseTransitionAt,
	readInlineStyle,
	resumeTransitions,
} from './support/transitions';

const getScreenshotPath = (projectName: string, name: string) => [
	'fade',
	`${projectName}-${name}.png`,
];

test.describe('TransitionFade', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/?scenario=fade');
	});

	test('Completes enter and restores inline styles', async ({ page }, testInfo) => {
		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await expect(target).toHaveCount(0);
		await expect(stage).toHaveScreenshot(getScreenshotPath(projectName, '01-enter-before'));

		await page.getByRole('button', { name: 'Show' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);

		await expect(target).toHaveClass(/fade-enter-active/);
		await expect(scenario).toHaveAttribute('data-enter-styles', FADE_ACTIVE_INLINE_STYLES);
		expect(await readInlineStyle(target, 'transition-duration')).toStrictEqual({
			priority: 'important',
			value: '2000ms',
		});
		expect(await readInlineStyle(target, 'transition-delay')).toStrictEqual({
			priority: 'important',
			value: '200ms',
		});
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.4, 2);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '02-enter-1000ms'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');
		await expect(scenario).toHaveAttribute(
			'data-after-enter-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(target).toHaveClass('fade-scenario__target');
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.8, 2);
		await expect(stage).toHaveScreenshot(getScreenshotPath(projectName, '03-enter-after'));
	});

	test('Completes leave and restores inline styles', async ({ page }, testInfo) => {
		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await page.getByRole('button', { name: 'Show' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await resumeTransitions(target);
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(stage).toHaveScreenshot(getScreenshotPath(projectName, '04-leave-before'));

		await page.getByRole('button', { name: 'Hide' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);

		await expect(target).toHaveClass(/fade-leave-active/);
		await expect(scenario).toHaveAttribute('data-leave-styles', FADE_ACTIVE_INLINE_STYLES);
		expect(await readInlineStyle(target, 'opacity')).toStrictEqual({
			priority: '',
			value: '0',
		});
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.4, 2);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '05-leave-1000ms'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(target).toHaveCount(0);
		await expect(scenario).toHaveAttribute('data-events', 'before-leave,leave,after-leave');
		await expect(scenario).toHaveAttribute(
			'data-after-leave-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect(stage).toHaveScreenshot(getScreenshotPath(projectName, '06-leave-after'));
	});
});
