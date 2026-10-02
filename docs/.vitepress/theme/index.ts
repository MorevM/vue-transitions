import DefaultTheme from 'vitepress/theme';
import EventsDemo from '../components/events-demo/events-demo.vue';
import TransitionDemo from '../components/transition-demo/transition-demo.vue';
import type { Theme } from 'vitepress';
import './custom.scss';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('EventsDemo', EventsDemo);
		app.component('TransitionDemo', TransitionDemo);
	},
} satisfies Theme;
