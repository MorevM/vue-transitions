import type { Plugin } from 'vite';
import { randomInt } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const YANDEX_METRIKA_COUNTER_ID = 88409546;
const YANDEX_METRIKA_HTML = `
		<!-- Yandex.Metrika counter -->
		<script type="text/javascript">
			(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
			m[i].l=1*new Date();
			k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
			(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

			ym(${YANDEX_METRIKA_COUNTER_ID}, "init", {
				clickmap:true,
				trackLinks:true,
				accurateTrackBounce:true,
				webvisor:true
			});
		</script>
		<noscript>
			<div><img src="https://mc.yandex.ru/watch/${YANDEX_METRIKA_COUNTER_ID}" style="position:absolute; left:-9999px;" alt="" /></div>
		</noscript>
		<!-- /Yandex.Metrika counter -->`;

const transformLibrarySourceForVue3 = {
	name: 'transform-library-source-for-vue3',
	enforce: 'pre',
	transform(source, id) {
		if (!id.includes('/src/')) return;

		const transformedSource = source
			.replace(
				'// BUILD-TIME: TRANSITIONS IMPORT FOR VUE 3',
				`import { Transition, TransitionGroup } from 'vue';`,
			)
			.replace(
				`'transition-group' : 'transition'`,
				`TransitionGroup : Transition`,
			);

		if (transformedSource === source) return;

		return transformedSource;
	},
} satisfies Plugin;

export default defineConfig({
	title: '@morev/vue-transitions',
	description: 'Reusable interface transitions for Vue 2 and Vue 3',
	base: '/vue-transitions/',
	cleanUrls: true,
	transformHtml(html) {
		return html.replace('</body>', () => `${YANDEX_METRIKA_HTML}\n\t</body>`);
	},
	vite: {
		plugins: [transformLibrarySourceForVue3],
		resolve: {
			alias: [
				{
					find: /^vue$/,
					replacement: fileURLToPath(
						new URL('../node_modules/vue/dist/vue.runtime.esm-bundler.js', import.meta.url),
					),
				},
				{
					find: /^vue\/server-renderer$/,
					replacement: fileURLToPath(
						new URL('../node_modules/vue/server-renderer/index.js', import.meta.url),
					),
				},
			],
		},
		server: {
			port: randomInt(49152, 65536),
		},
		css: {
			preprocessorOptions: {
				scss: { api: 'modern-compiler' },
			},
		},
	},
	themeConfig: {
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/morevm/vue-transitions' },
		],
		outline: [2, 3],
		footer: {
			message: 'Released under the MIT License.',
		},
		nav: [
			{ text: 'Guide', link: '/guide/installation' },
			{ text: 'Transitions', link: '/transitions/fade' },
			{ text: 'API', link: '/api/common-props' },
		],
		sidebar: [
			{
				text: 'Guide',
				items: [
					{ text: 'Installation', link: '/guide/installation' },
					{ text: 'Usage', link: '/guide/usage' },
					{ text: 'Plugin configuration', link: '/guide/configuration' },
					{ text: 'Nuxt', link: '/guide/nuxt' },
					{ text: 'Reduced motion', link: '/guide/accessibility' },
					{ text: 'List transitions', link: '/guide/lists' },
				],
			},
			{
				text: 'Transitions',
				items: [
					{ text: 'TransitionFade', link: '/transitions/fade' },
					{ text: 'TransitionExpand', link: '/transitions/expand' },
					{ text: 'TransitionSlide', link: '/transitions/slide' },
					{ text: 'TransitionScale', link: '/transitions/scale' },
					{ text: 'TransitionMixed', link: '/transitions/mixed' },
				],
			},
			{
				text: 'API',
				items: [
					{ text: 'Common props', link: '/api/common-props' },
					{ text: 'Lifecycle events', link: '/api/events' },
				],
			},
		],
	},
});
