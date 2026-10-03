import { expect, test } from '@playwright/test';
import {
	getAnimationCount,
	readInlineStyle,
	resumeTransitions,
	waitForAnimationFrames,
} from './support/transitions';
import type { Locator } from '@playwright/test';

const ENTER_DELAYS = ['100ms', '200ms', '300ms', '400ms', '500ms', '600ms'];
const LEAVE_DELAYS = ['150ms', '250ms', '350ms', '450ms', '550ms', '650ms'];
const STAGGERED_ITEMS = [10, 11, 12, 13, 14, 15];

const getScreenshotPath = (projectName: string, name: string) => [
	'stagger',
	`${projectName}-${name}.png`,
];

const expectDelays = async (items: Locator[], delays: string[]) => {
	const actualDelays = await Promise.all(items.map((item) => {
		return readInlineStyle(item, 'transition-delay');
	}));
	const expectedDelays = delays.map((delay) => {
		return {
			priority: delay ? 'important' : '',
			value: delay,
		};
	});

	expect(actualDelays).toStrictEqual(expectedDelays);
};

const resumeAllTransitions = (items: Locator[]) => Promise.all(items.map((item) => {
	return resumeTransitions(item);
}));

const pauseAllTransitionsAt = (items: Locator[], elapsedMs: number) => Promise.all(items.map((item) => {
	return item.evaluate((element, timelineTime) => {
		element.getAnimations().forEach((animation) => {
			animation.pause();
			animation.currentTime = timelineTime;
		});
	}, elapsedMs);
}));

test.describe('Transition group stagger', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/?scenario=stagger');
	});

	test('Staggers only the children entering and leaving in the current update', async ({ page }, testInfo) => {
		const items = page.getByRole('listitem');
		const stage = page.getByTestId('stagger-stage');
		const itemLocators = STAGGERED_ITEMS.map((item) => {
			return page.getByTestId(`stagger-item-${item}`);
		});
		const [, , , , , lastItem] = itemLocators;
		const { name: projectName } = testInfo.project;

		await expect(stage).toHaveScreenshot(getScreenshotPath(projectName, '01-before'));

		await page.getByRole('button', { name: 'Remove items 10–15' }).click();
		await expect.poll(() => getAnimationCount(lastItem)).toBeGreaterThan(0);
		await expectDelays(itemLocators, LEAVE_DELAYS);
		await pauseAllTransitionsAt(itemLocators, 500);
		await waitForAnimationFrames(page);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '02-leave-stagger'),
			{ animations: 'allow' },
		);

		await resumeAllTransitions(itemLocators);
		await expect(items).toHaveCount(9);
		await expect(stage).toHaveScreenshot(getScreenshotPath(projectName, '03-leave-after'));

		await page.getByRole('button', { name: 'Restore items 10–15' }).click();
		await expect.poll(() => getAnimationCount(lastItem)).toBeGreaterThan(0);
		await expectDelays(itemLocators, ENTER_DELAYS);
		await pauseAllTransitionsAt(itemLocators, 450);
		await waitForAnimationFrames(page);
		await expect(stage).toHaveScreenshot(
			getScreenshotPath(projectName, '04-enter-stagger'),
			{ animations: 'allow' },
		);

		await resumeAllTransitions(itemLocators);
		await expect.poll(() => getAnimationCount(lastItem)).toBe(0);
		await expectDelays(itemLocators, ['', '', '', '', '', '']);
		await expect(stage).toHaveScreenshot(getScreenshotPath(projectName, '05-enter-after'));
	});
});
