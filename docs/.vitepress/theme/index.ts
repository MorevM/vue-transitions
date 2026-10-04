import DefaultTheme from 'vitepress/theme';
import EventsDemo from '../components/events-demo/events-demo.vue';
import StaggeredListDemo from '../components/staggered-list-demo/staggered-list-demo.vue';
import TransitionDemo from '../components/transition-demo/transition-demo.vue';
import type { Theme } from 'vitepress';
import './custom.scss';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('EventsDemo', EventsDemo);
		app.component('StaggeredListDemo', StaggeredListDemo);
		app.component('TransitionDemo', TransitionDemo);
	},
} satisfies Theme;
