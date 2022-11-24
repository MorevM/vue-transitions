import type { ObjectEntries } from '@morev/helpers';
import { mergeObjects, isEmpty, kebabCase } from '@morev/helpers';
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

		(Object.entries(entries) as ObjectEntries<Required<typeof entries>>)
			.forEach(([originalPascalName, neededName]) => {
				const customProps = mergeObjects(
					options.defaultProps,
					options.componentDefaultProps?.[originalPascalName],
				);

				const propsDeclaration = isEmpty(customProps)
					? '$attrs'
					: JSON.stringify(customProps)
						.replace(/}$/, ',...$$attrs}')
						.replace(/"/g, "'");

				// Create inline component mappings.
				// It's important to create it for redefining default props globally or per component,
				// also to support auto-import of renamed components.
				const originalKebabName = kebabCase(originalPascalName);
				addTemplate({
					filename: `vue-transitions/${originalKebabName}.vue`,
					src: resolver.resolve('template.vue'),
					write: true,
					options: { originalPascalName, neededName, propsDeclaration },
				});
			});

		addComponentsDir({
			path: buildResolver.resolve('vue-transitions'),
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
