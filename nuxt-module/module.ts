import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { isArray, isEmpty, mergeObjects } from '@morev/utils';
import { addComponentsDir, createResolver, defineNuxtModule, isNuxtMajorVersion } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';
import type { PluginOptions } from '../types';

const COMPONENTS = [
	'TransitionExpand',
	'TransitionFade',
	'TransitionMixed',
	'TransitionScale',
	'TransitionSlide',
] as const;
const BABEL_PLUGIN_NAME = '@babel/plugin-transform-logical-assignment-operators';
const SCOPE = '@morev';
const MODULE_NAME = `${SCOPE}/vue-transitions`;

const module: NuxtModule<PluginOptions> = defineNuxtModule<PluginOptions>({
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
		const COMPONENTS_DIRECTORY = join(nuxt.options.rootDir, 'node_modules', '.vue-transitions');
		const isNuxt2 = isNuxtMajorVersion(2, nuxt);
		const packageEntrypoint = `${MODULE_NAME}/${isNuxt2 ? 'vue2' : 'vue3'}`;

		const resolver = createResolver(import.meta.url);
		const packageRuntimeEntrypoint = resolver.resolve(
			`../dist/${isNuxt2 ? 'vue2' : 'vue3'}/vue-transitions.js`,
		);
		nuxt.hook('prepare:types', ({ declarations }) => {
			declarations.push(`import type {} from "${packageEntrypoint}";`);
		});

		nuxt.options.css ??= [];
		nuxt.options.css.push(`${MODULE_NAME}/styles`);

		// This is necessary because the package uses utilities
		// that use modern syntax and have not been transpiled.
		if (isNuxt2) {
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

		// Make sure there are no cache from previous runs.
		try {
			existsSync(COMPONENTS_DIRECTORY) && unlinkSync(COMPONENTS_DIRECTORY);
		} catch {}

		mkdirSync(COMPONENTS_DIRECTORY, { recursive: true });

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
				join(COMPONENTS_DIRECTORY, `${componentName}.vue`),
				templateContents
					.replaceAll('<%= options.propsDeclaration %>', () => propsDeclaration)
					.replaceAll('<%= options.listenersDeclaration %>', () => isNuxt2 ? ' v-on="$listeners"' : '')
					.replaceAll('<%= options.packageEntrypoint %>', () => packageRuntimeEntrypoint)
					.replaceAll('<%= options.componentName %>', () => componentName),
			);
		});

		addComponentsDir({
			path: COMPONENTS_DIRECTORY,
			pathPrefix: false,
			watch: false,
		});
	},
});

export default module;
