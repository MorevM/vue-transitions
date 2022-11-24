import { existsSync, unlinkSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { tsObject, mergeObjects, isEmpty, kebabCase } from '@morev/helpers';
import { addTemplate, defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';
import type { PluginOptions } from '../types';

const ALL_COMPONENTS = {
	TransitionExpand: 'TransitionExpand',
	TransitionSlide: 'TransitionSlide',
	TransitionScale: 'TransitionScale',
	TransitionFade: 'TransitionFade',
};

export default defineNuxtModule<PluginOptions>({
	meta: {
		name: '@morev/vue-transitions/nuxt',
		configKey: 'vueTransitions',
	},
	defaults: {},
	async setup(options, nuxt) {
		const resolver = createResolver(import.meta.url);
		const buildResolver = createResolver(nuxt.options.buildDir);
		const entries = options.components ?? ALL_COMPONENTS;

		// If there is no components to register.
		if (!Object.values(entries).filter(Boolean).length) return;

		nuxt.options.css ??= [];
		nuxt.options.css.push(`@morev/vue-transitions/styles`);

		const templateContents = readFileSync(resolver.resolve('template.vue'), { encoding: 'utf8' });
		const componentsDir = buildResolver.resolve('vue-transitions');

		// Make sure there is no cache from previous runs.
		try {
			existsSync(componentsDir) && unlinkSync(componentsDir);
		} catch {}

		mkdirSync(componentsDir, { recursive: true });

		tsObject.entries(entries)
			.forEach(([originalPascalName, neededName]) => {
				const customProps = mergeObjects(
					options.defaultProps ?? {},
					options.componentDefaultProps?.[originalPascalName],
				);

				const neededKebabName = kebabCase(neededName);
				const propsDeclaration = isEmpty(customProps)
					? '$attrs'
					: JSON.stringify(customProps)
						.replace(/}$/, ',...$$attrs}')
						.replace(/"/g, "'");

				// Create inline component mappings.
				// It's important to create it for redefining default props globally or per component,
				// also to support auto-import of renamed components.
				addTemplate({
					filename: `vue-transitions/${neededKebabName}.vue`,
					src: resolver.resolve('template.vue'),
					write: true,
					options: { originalPascalName, neededName, propsDeclaration },
				});

				// It's important to create it this way as well as `addTemplate` because
				// `addTemplate` doesn't create files at once, it adds them to the queue,
				// but when we call `addComponentsDir` files should be in place already.
				writeFileSync(
					buildResolver.resolve(`vue-transitions/${neededKebabName}.vue`),
					templateContents
						.replace(/<%= options\.propsDeclaration %>/g, propsDeclaration)
						.replace(/<%= options\.originalPascalName %>/g, originalPascalName)
						.replace(/<%= options\.neededName %>/g, neededName),
				);
			});

		addComponentsDir({
			path: componentsDir,
			pathPrefix: false,
		});

		const typeMappings = Object.entries(entries).reduce<string[]>((acc, [originalName, neededName]) => {
			acc.push(`${neededName}: DefineComponent<ComponentPropsAndEmits['${originalName}']>;`);
			return acc;
		}, []).join('\n\t\t');

		const typesPath = addTemplate({
			filename: `types/vue-transitions.d.ts`,
			src: resolver.resolve('template.d.ts'),
			write: true,
			options: {
				declarations: `\n\t\t${typeMappings}\n\t`,
			},
		}).dst;

		nuxt.hook('prepare:types', (types: any) => {
			types.references.push({ path: typesPath });
		});
	},
});
