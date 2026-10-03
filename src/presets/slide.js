import { isNumeric } from '@morev/utils';
import { slideOffset } from '../utility/defaults/defaults.js';
import { getMatrix } from '../utility/helpers.js';

const slideElement = (context, element, event, options) => {
	const { width, height, transform } = getComputedStyle(element);

	const offset = options.offset?.[event] ?? options.offset ?? slideOffset;
	let [offsetX, offsetY] = offset;

	if (!isNumeric(offsetX)) {
		const value = offsetX.endsWith('%')
			? parseFloat(width) * (parseFloat(offsetX.slice(0, -1)) || 0) / 100
			: parseFloat(offsetX);
		offsetX = value;
	}

	if (!isNumeric(offsetY)) {
		const value = offsetY.endsWith('%')
			? parseFloat(height) * (parseFloat(offsetY.slice(0, -1)) || 0) / 100
			: parseFloat(offsetY);
		offsetY = value;
	}

	const [matrixType, matrix] = getMatrix(transform);

	// Respect existing 3D transform
	if (transform.startsWith('matrix3d')) {
		matrix[12] += offsetX;
		matrix[13] += offsetY;
	// Respect existing 2D transform
	} else if (transform.startsWith('matrix')) {
		matrix[4] += offsetX;
		matrix[5] += offsetY;
	// Just apply the transition
	} else {
		matrix[4] = offsetX;
		matrix[5] = offsetY;
	}

	if (!options.noOpacity) {
		context.setTemporaryStyle(element, 'opacity', 0);
	}

	context.setTemporaryStyle(element, 'transform', `${matrixType}(${matrix})`);
};

export const slidePreset = {
	enter(context, element, options) {
		slideElement(context, element, 'enter', options);
		element.offsetTop; // eslint-disable-line no-unused-expressions -- Force layout recalculation

		context.setupTransition(element, 'enter');
		context.restoreTemporaryStyle(element, 'opacity');
		context.restoreTemporaryStyle(element, 'transform');
	},

	leave(context, element, options) {
		context.setupTransition(element, 'leave');
		slideElement(context, element, 'leave', options);
	},
};
