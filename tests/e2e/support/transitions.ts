import type { Locator } from '@playwright/test';

export const getAnimationCount = (locator: Locator) => locator.evaluate(
	(element) => element.getAnimations().length,
);

export const pauseTransitionAt = (locator: Locator, elapsedMs: number) => locator.evaluate(
	(element, transitionElapsedMs) => {
		const [animation] = element.getAnimations();
		const timing = animation?.effect?.getTiming();

		if (!animation || !timing) throw new Error('No active transition found');

		animation.pause();
		animation.currentTime = Number(timing.delay) + transitionElapsedMs;
	},
	elapsedMs,
);

export const readInlineStyle = (locator: Locator, property: string) => locator.evaluate(
	(element, styleProperty) => ({
		priority: element.style.getPropertyPriority(styleProperty),
		value: element.style.getPropertyValue(styleProperty),
	}),
	property,
);

export const resumeTransitions = (locator: Locator) => locator.evaluate((element) => {
	element.getAnimations().forEach((animation) => {
		animation.playbackRate = 100;
		animation.play();
	});
});
