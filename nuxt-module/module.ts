import { existsSync, unlinkSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { mergeObjects, isEmpty, isArray } from '@morev/utils';
import { defineNuxtModule, createResolver, addComponentsDir, isNuxt2 } from '@nuxt/kit';
import type { PluginOptions } from '../types';

const COMPONENTS = ['TransitionExpand', 'TransitionFade', 'TransitionScale', 'TransitionSlide'] as const;
const BABEL_PLUGIN_NAME = '@babel/plugin-transform-logical-assignment-operators';
const MODULE_NAME = '@morev/vue-transitions';

export default defineNuxtModule<PluginOptions>({
	meta: {
		name: `${MODULE_NAME}/nuxt`,
		configKey: 'vueTransitions',
		compatibility: {
			nuxt: '>= 2.17.0 || >=3.5.0',
		},
	},
	defaults: {
		componentDefaultProps: {},
		defaultProps: {},
	},
	async setup(options, nuxt) {
		const DIRECTORY_NAME = 'vue-transitions';
		const resolver = createResolver(import.meta.url);

		nuxt.options.css ??= [];
		nuxt.options.css.push(`${MODULE_NAME}/styles`);

		// This is necessary because the package uses utilities
		// that use modern syntax and have not been transpiled.
		if (isNuxt2()) {
			nuxt.options.build.transpile.push('@morev/utils', 'ohash', MODULE_NAME);

			/* @ts-expect-error -- Lack of compatibility with Nuxt 2 */
			nuxt.options.build.babel.plugins ??= [];
			/* @ts-expect-error -- Lack of compatibility with Nuxt 2 */
			const doesBabelPluginExists = nuxt.options.build.babel.plugins.some((plugin) => {
				return isArray(plugin)
					? plugin[0] === BABEL_PLUGIN_NAME
					: plugin === BABEL_PLUGIN_NAME;
			});

			/* @ts-expect-error -- Lack of compatibility with Nuxt 2 */
			!doesBabelPluginExists && nuxt.options.build.babel.plugins.push(BABEL_PLUGIN_NAME);
		}

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
