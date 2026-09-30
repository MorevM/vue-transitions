import { expect, test } from '@playwright/test';

test.describe('E2E harness', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Loads the matching Vue build', async ({ page }, testInfo) => {
		const expectedVueMajor = String(testInfo.project.metadata.vueMajor);
		const harness = page.getByTestId('harness');

		await expect(harness).toHaveAttribute('data-vue-major', expectedVueMajor);
		await expect(page.getByTestId('library-content')).toBeVisible();
		await expect(page.getByTestId('harness-card')).toHaveScreenshot('harness.png');
	});
});
