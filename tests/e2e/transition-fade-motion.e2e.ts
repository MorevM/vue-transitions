import { expect, test } from '@playwright/test';
import {
	FADE_ACTIVE_INLINE_STYLES,
	FADE_RESTORED_INLINE_STYLES,
} from './support/fade';
import {
	getAnimationCount,
	pauseTransitionAt,
	resumeTransitions,
	waitForAnimationFrames,
} from './support/transitions';

const getScreenshotPath = (projectName: string, name: string) => [
	'fade-motion',
	`${projectName}-${name}.png`,
];

test.describe('TransitionFade motion policy', () => {
	test('Disables enter and leave animations explicitly', async ({ page }, testInfo) => {
		await page.goto('/?scenario=fade-motion&motion=disabled');

		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await expect(target).toBeHidden();
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '01-disabled-before'),
		);

		await page.getByRole('button', { name: 'Show' }).click();
		await expect(target).toBeVisible();
		await waitForAnimationFrames(page);
		expect(await getAnimationCount(target)).toBe(0);
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');
		await expect(scenario).toHaveAttribute('data-enter-styles', FADE_RESTORED_INLINE_STYLES);
		await expect(scenario).toHaveAttribute(
			'data-after-enter-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect(target).toHaveClass('fade-scenario__target');
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.8, 2);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '02-disabled-enter-after'),
		);

		await page.getByRole('button', { name: 'Hide' }).click();
		await waitForAnimationFrames(page);
		expect(await getAnimationCount(target)).toBe(0);
		await expect(target).toBeHidden();
		await expect(scenario).toHaveAttribute('data-events', 'before-leave,leave,after-leave');
		await expect(scenario).toHaveAttribute('data-leave-styles', FADE_RESTORED_INLINE_STYLES);
		await expect(scenario).toHaveAttribute(
			'data-after-leave-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '03-disabled-leave-after'),
		);
	});

	test('Disables system animations when reduced motion is requested', async ({ page }, testInfo) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/?scenario=fade-motion&motion=system');

		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await expect(target).toBeHidden();
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '04-system-reduce-before'),
		);

		await page.getByRole('button', { name: 'Show' }).click();
		await expect(target).toBeVisible();
		await waitForAnimationFrames(page);
		expect(await getAnimationCount(target)).toBe(0);
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');
		await expect(scenario).toHaveAttribute('data-enter-styles', FADE_RESTORED_INLINE_STYLES);
		await expect(scenario).toHaveAttribute(
			'data-after-enter-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '05-system-reduce-enter-after'),
		);

		await page.getByRole('button', { name: 'Hide' }).click();
		await waitForAnimationFrames(page);
		expect(await getAnimationCount(target)).toBe(0);
		await expect(target).toBeHidden();
		await expect(scenario).toHaveAttribute('data-events', 'before-leave,leave,after-leave');
		await expect(scenario).toHaveAttribute('data-leave-styles', FADE_RESTORED_INLINE_STYLES);
		await expect(scenario).toHaveAttribute(
			'data-after-leave-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '06-system-reduce-leave-after'),
		);
	});

	test('Keeps system animations when reduced motion is not requested', async ({ page }, testInfo) => {
		await page.emulateMedia({ reducedMotion: 'no-preference' });
		await page.goto('/?scenario=fade-motion&motion=system');

		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await expect(target).toBeHidden();
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '07-system-no-preference-before'),
		);

		await page.getByRole('button', { name: 'Show' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);
		await expect(target).toHaveClass(/fade-enter-active/);
		await expect(scenario).toHaveAttribute('data-enter-styles', FADE_ACTIVE_INLINE_STYLES);
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.4, 2);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '08-system-no-preference-enter-1000ms'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');
		await expect(scenario).toHaveAttribute(
			'data-after-enter-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '09-system-no-preference-enter-after'),
		);

		await page.getByRole('button', { name: 'Hide' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);
		await expect(target).toHaveClass(/fade-leave-active/);
		await expect(scenario).toHaveAttribute('data-leave-styles', FADE_ACTIVE_INLINE_STYLES);
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.4, 2);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '10-system-no-preference-leave-1000ms'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(target).toBeHidden();
		await expect(scenario).toHaveAttribute('data-events', 'before-leave,leave,after-leave');
		await expect(scenario).toHaveAttribute(
			'data-after-leave-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '11-system-no-preference-leave-after'),
		);
	});

	test('Enables animations despite reduced motion', async ({ page }, testInfo) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/?scenario=fade-motion&motion=enabled');

		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await expect(target).toBeHidden();
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '12-enabled-reduce-before'),
		);

		await page.getByRole('button', { name: 'Show' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);
		await expect(target).toHaveClass(/fade-enter-active/);
		await expect(scenario).toHaveAttribute('data-enter-styles', FADE_ACTIVE_INLINE_STYLES);
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.4, 2);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '13-enabled-reduce-enter-1000ms'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');
		await expect(scenario).toHaveAttribute(
			'data-after-enter-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '14-enabled-reduce-enter-after'),
		);
	});

	test('Applies changed motion policy to subsequent transitions', async ({ page }, testInfo) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/?scenario=fade-motion&motion=disabled&motion-controls=true');

		const scenario = page.getByTestId('fade-scenario');
		const stage = page.getByTestId('fade-stage');
		const target = page.getByTestId('fade-target');
		const { name: projectName } = testInfo.project;

		await page.getByRole('button', { name: 'Show' }).click();
		await waitForAnimationFrames(page);
		expect(await getAnimationCount(target)).toBe(0);
		await expect(target).toBeVisible();
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');

		await page.getByRole('button', { name: 'Enable motion' }).click();
		await expect(scenario).toHaveAttribute('data-motion', 'enabled');
		await page.getByRole('button', { name: 'Hide' }).click();
		await expect.poll(() => getAnimationCount(target)).toBeGreaterThan(0);
		await pauseTransitionAt(target, 1000);
		await expect(target).toHaveClass(/fade-leave-active/);
		await expect(scenario).toHaveAttribute('data-leave-styles', FADE_ACTIVE_INLINE_STYLES);
		expect(Number(await target.evaluate((element) => getComputedStyle(element).opacity)))
			.toBeCloseTo(0.4, 2);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '15-runtime-enabled-leave-1000ms'),
			{ animations: 'allow' },
		);

		await resumeTransitions(target);
		await expect(target).toBeHidden();
		await expect(scenario).toHaveAttribute('data-events', 'before-leave,leave,after-leave');
		await expect(scenario).toHaveAttribute(
			'data-after-leave-styles',
			FADE_RESTORED_INLINE_STYLES,
		);
		await expect.poll(() => getAnimationCount(target)).toBe(0);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '16-runtime-enabled-leave-after'),
		);

		await page.getByRole('button', { name: 'Disable motion' }).click();
		await expect(scenario).toHaveAttribute('data-motion', 'disabled');
		await page.getByRole('button', { name: 'Show' }).click();
		await waitForAnimationFrames(page);
		expect(await getAnimationCount(target)).toBe(0);
		await expect(target).toBeVisible();
		await expect(scenario).toHaveAttribute('data-events', 'before-enter,enter,after-enter');
		await expect(scenario).toHaveAttribute('data-enter-styles', FADE_RESTORED_INLINE_STYLES);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '17-runtime-disabled-enter-after'),
		);
	});
});
