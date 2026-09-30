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
	defineConfiguration('playwright', {
		files: ['tests/e2e/**/*.e2e.ts'],
	}),
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
		name: 'project/consumer-fixtures',
		files: ['tests/consumers/**/*.{cjs,cts,js,mjs,mts,ts,vue}'],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['tests/consumers/nuxt3/nuxt.config.ts'],
				},
			},
		},
		rules: {
			// Fixture dependencies exist only in the temporary consumer installations.
			'import-x/no-unresolved': 'off',
			// Fixture dependencies exist only in the temporary consumer installations.
			'n/no-missing-import': 'off',
			// Fixture dependencies exist only in the temporary consumer installations.
			'n/no-missing-require': 'off',
		},
	},
	{
		name: 'project/e2e-harness',
		files: ['tests/e2e/apps/**/*.{js,vue}'],
		rules: {
			// The harness resolves the package entrypoints to version-specific build artifacts in Vite.
			'import-x/no-unresolved': 'off',
			// The harness uses fixed diagnostic copy instead of application localization.
			'vue/no-bare-strings-in-template': 'off',
		},
	},
	{
		name: 'project/consumer-commonjs-types',
		files: ['tests/consumers/**/*.cts'],
		rules: {
			// The fixtures intentionally exercise package declarations selected by require().
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
	{
		name: 'project/consumer-nuxt-components',
		files: ['tests/consumers/nuxt*/**/*.vue'],
		rules: {
			// The package module registers transition components through Nuxt auto-imports.
			'vue/no-undef-components': ['error', { ignorePatterns: ['^transition-'] }],
		},
	},
	{
		name: 'project/consumer-nuxt-pages',
		files: ['tests/consumers/nuxt2/pages/**/*.vue'],
		rules: {
			// Nuxt uses index.vue as the conventional root route filename.
			'vue/multi-word-component-names': 'off',
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
]);
