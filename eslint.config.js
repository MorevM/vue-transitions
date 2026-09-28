import { combine, defineConfiguration, defineIgnores } from '@morev/eslint-config';

export default combine([
	defineIgnores({
		extraIgnoredGlobs: [
			'LICENSE.md',
			'CHANGELOG.md',
			'pnpm-lock.yaml',
			'nuxt-module/template.d.ts',
			'nuxt-module/template.vue',
		],
	}),
	defineConfiguration('javascript', {
		overrides: {
			'import-x/no-unresolved': 'off',
		},
	}),
	defineConfiguration('node'),
	defineConfiguration('browser'),
	defineConfiguration('vue', {
		version: 2,
		typescript: false,
		overrides: {
			'vue/no-bare-strings-in-template': 'off',
			'vue/no-unused-properties': 'off',
			'vue/no-undef-components': 'off',
			'vue/no-undef-directives': ['error', { ignore: ['bem'] }],
			'import-x/no-named-as-default-member': 'off',
		},
	}),
	defineConfiguration('typescript'),
	defineConfiguration('json', {
		overrides: {
			'package-json/require-engines': 'off',
			'package-json/require-license': 'off',
			'package-json/require-version': 'off',
		},
	}),
	defineConfiguration('markdown', {
		overrides: {
			'markdown-preferences/prefer-fenced-code-blocks': 'off',
		},
	}),
	defineConfiguration('yaml'),
	defineConfiguration('vitest'),
	{
		name: 'project/development-dependencies',
		files: ['**/builders/**/*.js', '**/playground/main.js', 'nuxt-module/**/*'],
		rules: {
			'import-x/no-extraneous-dependencies': 'off',
			'n/no-extraneous-import': 'off',
		},
	},
	{
		name: 'project/scripts',
		files: ['**/scripts/**/*.js'],
		rules: {
			'no-console': 'off',
			'import-x/no-dynamic-require': 'off',
		},
	},
]);
