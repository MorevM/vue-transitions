import { existsSync, unlinkSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { mergeObjects, isEmpty } from '@morev/utils';
import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';
import type { PluginOptions } from '../types';

const COMPONENTS = ['TransitionExpand', 'TransitionFade', 'TransitionScale', 'TransitionSlide'] as const;

export default defineNuxtModule<PluginOptions>({
	meta: {
		name: '@morev/vue-transitions/nuxt',
		configKey: 'vueTransitions',
	},
	defaults: {},
	async setup(options, nuxt) {
		const DIRECTORY_NAME = 'vue-transitions';
		const resolver = createResolver(import.meta.url);
		const entries = options.components ?? ALL_COMPONENTS;

		// If there are no components to register.
		if (!Object.values(entries).filter(Boolean).length) return;

		nuxt.options.css ??= [];
		nuxt.options.css.push(`@morev/vue-transitions/styles`);

		nuxt.options.build.transpile.push('@morev/utils');

		const templateContents = readFileSync(resolver.resolve('template.vue'), { encoding: 'utf8' });
		const componentsDir = resolver.resolve(DIRECTORY_NAME);

		// Make sure there are no cache from previous runs.
		try {
			existsSync(componentsDir) && unlinkSync(componentsDir);
		} catch {}

		mkdirSync(componentsDir, { recursive: true });

		COMPONENTS.forEach((componentName) => {
			const customProps = mergeObjects(
				options.defaultProps ?? {},
				options.componentDefaultProps?.[componentName],
			);

			const propsDeclaration = isEmpty(customProps)
				? '$attrs'
				: JSON.stringify(customProps)
					.replace(/}$/, ',...$$attrs}')
					.replaceAll('"', "'");

			// It's important to create it this way instead of using `addTemplate` because
			// `addTemplate` doesn't create files at once, it adds them to queue,
			// but when we call `addComponentsDir` files should be in place already.
			writeFileSync(
				resolver.resolve(`${DIRECTORY_NAME}/${componentName}.vue`),
				templateContents
					.replaceAll('<%= options.propsDeclaration %>', propsDeclaration)
					.replaceAll('<%= options.componentName %>', componentName),
			);
		});

		addComponentsDir({
			path: componentsDir,
			pathPrefix: false,
			watch: false,
		});
	},
});
