import { expect, test } from '@playwright/test';
import {
	FADE_RESTORED_INLINE_STYLES,
	getFadeActiveInlineStyles,
} from './support/fade';
import {
	getAnimationCount,
	pauseTransitionAt,
	pauseTransitionAtProgress,
	readInlineStyle,
	resumeTransitions,
} from './support/transitions';

const REVERSED_ACTIVE_INLINE_STYLES = getFadeActiveInlineStyles(0);

const getScreenshotPath = (projectName: string, name: string) => [
	'fade-reversal',
	`${projectName}-${name}.png`,
];

test.describe('TransitionFade reversal', () => {
	test('Reverses enter into leave without another delay', async ({ page }, testInfo) => {
		await page.goto('/?scenario=fade-reversal');

		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await page.getByRole('button', { name: 'Show' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '01-enter-midpoint'),
			{ animations: 'allow' },
		);

		await page.getByRole('button', { name: 'Hide' }).click();
		await expect(scenario).toHaveAttribute(
			'data-events',
			'before-enter,enter,enter-cancelled,before-leave,leave',
		);
		await expect(scenario).toHaveAttribute(
			'data-enter-cancelled-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect(scenario).toHaveAttribute(
			'data-leave-styles',
			REVERSED_ACTIVE_INLINE_STYLES,
		);
		expect(await readInlineStyle(target, 'transition-delay')).toStrictEqual({
			priority: 'important',
			value: '0ms',
		});
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAtProgress(target, 0.5);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '02-reversed-leave-midpoint'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(target).toBeHidden();
		await expect(scenario).toHaveAttribute(
			'data-events',
			'before-enter,enter,enter-cancelled,before-leave,leave,after-leave',
		);
		await expect(scenario).toHaveAttribute(
			'data-after-leave-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '03-reversed-leave-after'),
		);
	});

	test('Reverses leave into enter without another delay', async ({ page }, testInfo) => {
		await page.goto('/?scenario=fade-reversal&visible=true');

		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await page.getByRole('button', { name: 'Hide' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '04-leave-midpoint'),
			{ animations: 'allow' },
		);

		await page.getByRole('button', { name: 'Show' }).click();
		await expect(scenario).toHaveAttribute(
			'data-events',
			'before-leave,leave,leave-cancelled,before-enter,enter',
		);
		await expect(scenario).toHaveAttribute(
			'data-leave-cancelled-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect(scenario).toHaveAttribute(
			'data-enter-styles',
			REVERSED_ACTIVE_INLINE_STYLES,
		);
		expect(await readInlineStyle(target, 'transition-delay')).toStrictEqual({
			priority: 'important',
			value: '0ms',
		});
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAtProgress(target, 0.5);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '05-reversed-enter-midpoint'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(scenario).toHaveAttribute(
			'data-events',
			'before-leave,leave,leave-cancelled,before-enter,enter,after-enter',
		);
		await expect(scenario).toHaveAttribute(
			'data-after-enter-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(target).toHaveClass('fade-scenario__target');
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '06-reversed-enter-after'),
		);
	});
});
