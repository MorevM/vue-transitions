import { clamp } from '@morev/utils';
import { scaleAxis, scaleOrigin, scaleValue } from '../utility/defaults/defaults.js';
import { getMatrix } from '../utility/helpers.js';

const scaleElement = (context, element, event, options) => {
	const { transform } = getComputedStyle(element);

	const axis = options.axis?.[event] ?? options.axis ?? scaleAxis;
	const origin = options.origin?.[event] ?? options.origin ?? scaleOrigin;
	const scale = clamp(0.0001, options.scale?.[event] ?? options.scale ?? scaleValue, 0.9999);

	const [matrixType, matrix] = getMatrix(transform);

	// Respect existing 3D transform
	if (transform.startsWith('matrix3d')) {
		if (axis !== 'y') matrix[0] = scale;
		if (axis !== 'x') matrix[5] = scale;
	// Respect existing 2D transform
	} else if (transform.startsWith('matrix')) {
		if (axis !== 'y') matrix[0] = scale;
		if (axis !== 'x') matrix[3] = scale;
	// Just set own transform
	} else {
		matrix[0] = axis === 'y' ? 1 : scale;
		matrix[3] = axis === 'x' ? 1 : scale;
	}

	if (!options.noOpacity) {
		context.setTemporaryStyle(element, 'opacity', 0);
	}

	context.setTemporaryStyle(element, 'transform', `${matrixType}(${matrix})`);
	context.setTemporaryStyle(element, 'transform-origin', origin);
};

export const scalePreset = {
	enter(context, element, options) {
		const transition = context.getActiveTransition(element);

		scaleElement(context, element, 'enter', options);
		element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

		context.setupTransition(element, 'enter');
		context.$nextTick(() => {
			if (!context.isTransitionActive(element, transition)) return;

			context.restoreTemporaryStyle(element, 'opacity');
			context.restoreTemporaryStyle(element, 'transform');
		});
	},

	leave(context, element, options) {
		context.setupTransition(element, 'leave');
		scaleElement(context, element, 'leave', options);
	},
};
