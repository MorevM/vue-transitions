import { combine, defineConfiguration, defineIgnores } from '@morev/eslint-config';

export default combine([
	defineIgnores({
		extraIgnoredGlobs: [
			// The license text must remain verbatim despite Markdown line-length rules.
			'LICENSE.md',
			// The release tool owns the changelog structure, including repeated section headings.
			'CHANGELOG.md',
			// The Vue parser cannot parse this template until Nuxt replaces its EJS placeholders.
			'nuxt-module/template.vue',
		],
	}),
	defineConfiguration('javascript'),
	defineConfiguration('node'),
	defineConfiguration('browser'),
	defineConfiguration('vue', {
		version: 2,
		typescript: false,
	}),
	defineConfiguration('typescript'),
	defineConfiguration('json'),
	defineConfiguration('markdown'),
	defineConfiguration('yaml'),
	defineConfiguration('vitest'),
	{
		name: 'project/playground-vue-globals',
		files: ['playground/**/*.vue'],
		rules: {
			// The playground intentionally uses hard-coded demo copy instead of localization.
			'vue/no-bare-strings-in-template': 'off',
			// Element UI and the library transitions are registered globally in playground/main.js.
			'vue/no-undef-components': ['error', { ignorePatterns: ['^el-', '^transition-'] }],
			// The BEM transformer registers v-bem globally in playground/main.js.
			'vue/no-undef-directives': ['error', { ignore: ['bem'] }],
		},
	},
	{
		name: 'project/transition-mixin-methods',
		files: ['src/transitions/**/*.vue'],
		rules: {
			// vue/no-unused-properties cannot trace transition methods invoked by baseTransition.
			'vue/no-unused-properties': ['warn', {
				groups: ['props', 'data', 'computed'],
				deepData: false,
				ignorePublicMembers: true,
			}],
		},
	},
	{
		name: 'project/private-package-metadata',
		files: ['builders/*/package.json', 'nuxt-module/package.json'],
		rules: {
			// These private manifests run only through the root package, which declares Node support.
			'package-json/require-engines': 'off',
		},
	},
	{
		name: 'project/root-build-tools',
		files: ['builders/*/vite*.config.js'],
		rules: {
			// Private builders intentionally share the Vite version pinned by the root workspace.
			'import-x/no-extraneous-dependencies': 'off',
		},
	},
	{
		name: 'project/nuxt-module-source',
		files: ['nuxt-module/module.ts'],
		rules: {
			// This subpath ships inside the root package and uses dependencies declared there.
			'import-x/no-extraneous-dependencies': 'off',
			'n/no-extraneous-import': 'off',
		},
	},
	{
		name: 'project/readme-nested-details',
		files: ['README.md'],
		rules: {
			// Nested details require indentation that this rule misidentifies as indented code.
			'markdown-preferences/prefer-fenced-code-blocks': 'off',
		},
	},
	{
		name: 'project/version-switch-output',
		files: ['scripts/utils.js'],
		rules: {
			// The CLI helper intentionally reports a successful version switch to stdout.
			'no-console': 'off',
		},
	},
]);
