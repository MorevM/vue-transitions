export const fadePreset = {
	enter(context, element) {
		const transition = context.getActiveTransition(element);

		context.setTemporaryStyle(element, 'opacity', 0);
		element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

		context.setupTransition(element, 'enter');
		context.$nextTick(() => {
			if (!context.isTransitionActive(element, transition)) return;

			context.restoreTemporaryStyle(element, 'opacity');
		});
	},

	leave(context, element) {
		context.setupTransition(element, 'leave');
		context.setTemporaryStyle(element, 'opacity', 0);
	},
};
