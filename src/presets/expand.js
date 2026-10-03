import { expandAxis } from '../utility/defaults/defaults.js';

const elementVisuals = new WeakMap();

const getAxis = (options, event) => options.axis?.[event] ?? options.axis ?? expandAxis;

const getSizes = (element) => {
	const styles = getComputedStyle(element);
	const { opacity } = styles;
	const { width, height } = styles;
	const { paddingTop, paddingRight, paddingBottom, paddingLeft } = styles;
	const { marginTop, marginRight, marginBottom, marginLeft } = styles;

	elementVisuals.set(element, {
		opacity,
		size: { x: width, y: height },
		padding: { x: [paddingLeft, paddingRight], y: [paddingTop, paddingBottom] },
		margin: { x: [marginLeft, marginRight], y: [marginTop, marginBottom] },
	});
};

const expandElement = (context, element, event, options) => {
	const axis = getAxis(options, event);
	const start = axis === 'x' ? 'left' : 'top';
	const end = axis === 'x' ? 'right' : 'bottom';

	const visual = elementVisuals.get(element);

	if (!visual) return;

	const size = visual.size[axis];
	const margin = visual.margin[axis];
	const padding = visual.padding[axis];

	if (!options.noOpacity) {
		context.setTemporaryStyle(element, 'opacity', visual.opacity);
	}
	elementVisuals.delete(element);

	context.setTemporaryStyle(
		element,
		axis === 'x' ? 'width' : 'height',
		`${parseFloat(size)}px`,
	);
	context.setTemporaryStyle(element, `padding-${start}`, `${parseFloat(padding[0])}px`);
	context.setTemporaryStyle(element, `padding-${end}`, `${parseFloat(padding[1])}px`);
	context.setTemporaryStyle(element, `margin-${start}`, `${parseFloat(margin[0])}px`);
	context.setTemporaryStyle(element, `margin-${end}`, `${parseFloat(margin[1])}px`);
};

const collapseElement = (context, element, event, options) => {
	const axis = getAxis(options, event);
	const axisProp = axis === 'x' ? 'width' : 'height';
	const start = axis === 'x' ? 'left' : 'top';
	const end = axis === 'x' ? 'right' : 'bottom';

	if (!options.noOpacity) {
		context.setTemporaryStyle(element, 'opacity', 0);
	}

	context.setTemporaryStyle(element, axisProp, '0px');
	context.setTemporaryStyle(element, `padding-${start}`, '0px');
	context.setTemporaryStyle(element, `padding-${end}`, '0px');
	context.setTemporaryStyle(element, `margin-${start}`, '0px');
	context.setTemporaryStyle(element, `margin-${end}`, '0px');
};

export const expandPreset = {
	async enter(context, element, options) {
		const transition = context.getActiveTransition(element);

		await context.$nextTick();
		await context.$nextTick();

		if (!context.isTransitionActive(element, transition)) return;

		getSizes(element);
		collapseElement(context, element, 'enter', options);
		element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

		context.setupTransition(element, 'enter');
		expandElement(context, element, 'enter', options);
	},

	leave(context, element, options) {
		getSizes(element);
		expandElement(context, element, 'leave', options);
		element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

		context.setupTransition(element, 'leave');
		collapseElement(context, element, 'leave', options);
	},

	reset(element) {
		elementVisuals.delete(element);
	},
};
