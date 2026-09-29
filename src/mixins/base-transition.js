import * as defaults from '../utility/defaults/defaults.js';
import { validateDelay } from '../utility/validate/validate-delay.js';
import { validateDuration } from '../utility/validate/validate-duration.js';
import { validateEasing } from '../utility/validate/validate-easing.js';

// BUILD-TIME: TRANSITIONS IMPORT FOR VUE 3

const activeTransitions = new WeakMap();
const cancelledTransitions = new WeakMap();
const temporaryStyles = new WeakMap();
const transitionEvents = [
	'before-enter',
	'enter',
	'after-enter',
	'enter-cancelled',
	'before-leave',
	'leave',
	'after-leave',
	'leave-cancelled',
	'before-appear',
	'appear',
	'after-appear',
	'appear-cancelled',
];

export const baseTransition = {
	inheritAttrs: false,
	emits: transitionEvents,
	props: {
		duration: {
			validator: validateDuration,
			default: defaults.transitionDuration,
		},
		easing: {
			validator: validateEasing,
			default: () => defaults.transitionEasing,
		},
		delay: {
			validator: validateDelay,
			default: defaults.transitionDelay,
		},
		noOpacity: {
			type: Boolean,
			default: false,
		},
		appear: {
			type: Boolean,
			default: false,
		},
		mode: {
			type: String,
			default: undefined,
		},
		group: {
			type: Boolean,
			default: false,
		},
		tag: {
			type: String,
			default: 'span',
		},
		noMove: {
			type: Boolean,
			default: false,
		},
		moveDuration: {
			type: Number,
			default: defaults.moveDuration,
		},
	},
	computed: {
		cComponent() {
			return this.group ? 'transition-group' : 'transition';
		},
		cAttrs() {
			const { appear, mode, tag } = this;
			return this.group
				? { appear, tag, ...this.$attrs }
				: { appear, mode };
		},
		cHooks() {
			const hooks = {
				beforeEnter: (...args) => {
					this.prepareTransition('enter', ...args);
					this.$emit('before-enter', ...args);
				},
				beforeLeave: (...args) => {
					this.prepareTransition('leave', ...args);
					this.initLeaving?.(...args);
					this.$emit('before-leave', ...args);
				},
				enter: (...args) => {
					this.prepareTransition('enter', ...args);
					this.onEnter?.(...args);
					this.$emit('enter', ...args);
				},
				leave: (...args) => {
					this.prepareTransition('leave', ...args);
					this.onLeave?.(...args);
					this.$emit('leave', ...args);
				},
				afterEnter: (...args) => {
					this.finishTransition('enter', ...args);
					this.$emit('after-enter', ...args);
				},
				afterLeave: (...args) => {
					this.finishTransition('leave', ...args);
					this.$emit('after-leave', ...args);
				},
				enterCancelled: (...args) => {
					this.markTransitionCancelled('enter', ...args);
					this.finishTransition('enter', ...args);
					this.$emit('enter-cancelled', ...args);
				},
				leaveCancelled: (...args) => {
					this.markTransitionCancelled('leave', ...args);
					this.finishTransition('leave', ...args);
					this.$emit('leave-cancelled', ...args);
				},
			};

			if (!this.appear) return hooks;

			return {
				...hooks,
				beforeAppear: (...args) => {
					this.prepareTransition('enter', ...args);
					this.$emit('before-appear', ...args);
				},
				appear: (...args) => {
					this.prepareTransition('enter', ...args);
					this.onEnter?.(...args);
					this.$emit('appear', ...args);
				},
				afterAppear: (...args) => {
					this.finishTransition('enter', ...args);
					this.$emit('after-appear', ...args);
				},
				appearCancelled: (...args) => {
					this.markTransitionCancelled('enter', ...args);
					this.finishTransition('enter', ...args);
					this.$emit('appear-cancelled', ...args);
				},
			};
		},
	},
	methods: {
		prepareTransition(event, element) {
			const activeTransition = activeTransitions.get(element);

			if (activeTransition?.event === event) return activeTransition;
			if (activeTransition) return undefined;

			const transition = { event };

			activeTransitions.set(element, transition);
			this.reduceTransition(element);

			return transition;
		},

		getActiveTransition(element) {
			return activeTransitions.get(element);
		},

		isTransitionActive(element, transition) {
			return activeTransitions.get(element) === transition;
		},

		finishTransition(event, element) {
			if (activeTransitions.get(element)?.event !== event) return;

			activeTransitions.delete(element);
			this.restoreTemporaryStyles(element);
			this.resetElement?.(element);
		},

		setTemporaryStyle(element, property, value, priority = '') {
			let styles = temporaryStyles.get(element);

			if (!styles) {
				styles = new Map();
				temporaryStyles.set(element, styles);
			}

			if (!styles.has(property)) {
				styles.set(property, {
					value: element.style.getPropertyValue(property),
					priority: element.style.getPropertyPriority(property),
				});
			}

			element.style.setProperty(property, value, priority);
		},

		restoreTemporaryStyle(element, property) {
			const style = temporaryStyles.get(element)?.get(property);

			if (!style) return;

			if (style.value) {
				element.style.setProperty(property, style.value, style.priority);
			} else {
				element.style.removeProperty(property);
			}
		},

		restoreTemporaryStyles(element) {
			const styles = temporaryStyles.get(element);

			if (!styles) return;

			for (const property of styles.keys()) {
				this.restoreTemporaryStyle(element, property);
			}

			temporaryStyles.delete(element);
		},

		setupTransition(element, event = 'enter') {
			const duration = this.duration?.[event] ?? this.duration;
			const easing = this.easing?.[event] ?? this.easing;
			const cancelledEvent = event === 'enter' ? 'leave' : 'enter';
			const isReversed = cancelledTransitions.get(element) === cancelledEvent;
			const delay = isReversed ? 0 : (this.delay?.[event] ?? this.delay);

			cancelledTransitions.delete(element);

			this.setTemporaryStyle(element, 'transition-duration', `${duration}ms`, 'important');
			this.setTemporaryStyle(element, 'transition-timing-function', easing, 'important');
			this.setTemporaryStyle(element, 'transition-delay', `${delay}ms`, 'important');
		},

		markTransitionCancelled(event, element) {
			cancelledTransitions.set(element, event);
		},

		reduceTransition(element) {
			this.setTemporaryStyle(element, 'transition-duration', '0ms', 'important');
			this.setTemporaryStyle(element, 'transition-delay', '0ms', 'important');
		},

		initLeaving(element) {
			if (!this.group || this.noMove) return element;

			const styles = getComputedStyle(element);
			const { width, height } = styles;
			const { marginLeft, marginTop } = styles;

			this.setTemporaryStyle(
				element,
				'left',
				`${element.offsetLeft - parseFloat(marginLeft)}px`,
				'important',
			);
			this.setTemporaryStyle(
				element,
				'top',
				`${element.offsetTop - parseFloat(marginTop)}px`,
				'important',
			);
			this.setTemporaryStyle(element, 'width', `${parseFloat(width)}px`, 'important');
			this.setTemporaryStyle(element, 'height', `${parseFloat(height)}px`, 'important');
			this.setTemporaryStyle(element, 'position', 'absolute', 'important');

			return element;
		},

		setMoveDuration() {
			if (!this.$el?.style) return;

			if (this.group) {
				this.setTemporaryStyle(this.$el, '--move-duration', `${this.moveDuration}ms`);
			} else {
				this.restoreTemporaryStyle(this.$el, '--move-duration');
			}
		},
	},
	watch: {
		moveDuration() {
			this.setMoveDuration();
		},
		group() {
			this.setMoveDuration();
		},
	},
	mounted() {
		this.setMoveDuration();
	},
};
