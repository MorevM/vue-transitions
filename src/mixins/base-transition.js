import { validateDuration } from '../utility/validate/validate-duration.js';
import { validateEasing } from '../utility/validate/validate-easing.js';
import { validateDelay } from '../utility/validate/validate-delay.js';
import * as defaults from '../utility/defaults/defaults.js';

// BUILD-TIME: TRANSITIONS IMPORT FOR VUE 3

export const baseTransition = {
	inheritAttrs: false,
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
			const { appear, mode, tag, duration } = this;
			return { appear, mode, tag, duration };
		},
		cHooks() {
			return {
				...this.$listeners,
				beforeEnter: (...args) => {
					this.reduceTransition(...args);
					this.$emit('before-enter', ...args);
				},
				beforeLeave: (...args) => {
					this.reduceTransition(...args);
					this.initLeaving?.(...args);
					this.$emit('before-leave', ...args);
				},
				enter: (...args) => {
					this.onEnter?.(...args);
					this.$emit('enter', ...args);
				},
				leave: (...args) => {
					this.onLeave?.(...args);
					this.$emit('leave', ...args);
				},
				afterEnter: (...args) => {
					this.resetTransition(...args);
					this.resetElement?.(...args);
					this.$emit('after-enter', ...args);
				},
				afterLeave: (...args) => {
					this.resetTransition(...args);
					this.resetElement?.(...args);
					this.$emit('after-leave', ...args);
				},
			};
		},
	},
	methods: {
		setupTransition(element, event = 'enter') {
			const duration = this.duration?.[event] ?? this.duration;
			const easing = this.easing?.[event] ?? this.easing;
			const delay = this.delay?.[event] ?? this.delay;

			element.style.setProperty('transition-duration', `${duration}ms`, 'important');
			element.style.setProperty('transition-timing-function', `${easing}`, 'important');
			element.style.setProperty('transition-delay', `${delay}ms`, 'important');
		},

		reduceTransition(element) {
			element.style.setProperty('transition-duration', '0ms', 'important');
			element.style.setProperty('transition-delay', '0ms', 'important');
		},

		resetTransition(element) {
			element.style.removeProperty('transition-duration');
			element.style.removeProperty('transition-timing-function');
			element.style.removeProperty('transition-delay');
		},

		initLeaving(element) {
			if (!this.group || this.noMove) return element;

			const styles = getComputedStyle(element);
			const { width, height } = styles;
			const { marginLeft, marginTop } = styles;

			element.style.setProperty('left', `${element.offsetLeft - parseFloat(marginLeft)}px`, 'important');
			element.style.setProperty('top', `${element.offsetTop - parseFloat(marginTop)}px`, 'important');
			element.style.setProperty('width', `${parseFloat(width)}px`, 'important');
			element.style.setProperty('height', `${parseFloat(height)}px`, 'important');
			element.style.setProperty('position', 'absolute', 'important');

			return element;
		},

		setMoveDuration() {
			if (this.group && this.$el) {
				this.$el.style?.setProperty('--move-duration', `${this.moveDuration}ms`);
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
