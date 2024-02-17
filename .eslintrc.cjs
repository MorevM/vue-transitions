module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/base',
		'@morev/eslint-config/node',
		'@morev/eslint-config/browser',
		'@morev/eslint-config/preset/typescript',
		'@morev/eslint-config/preset/assistive',
		'@morev/eslint-config/preset/vue2',
	],
	rules: {
		// TODO: Should be fixed in the config itself
		'import/no-unresolved': 'off',
	},
	overrides: [
		{
			files: ['*.vue'],
			rules: {
				'vue/no-bare-strings-in-template': ['off'],
				'vue/no-unused-properties': ['off'],
				'vue/no-undef-components': ['off'],
				'import/no-named-as-default-member': ['off'],
			},
		},
		{
			files: ['*.md'],
			rules: {
				'markdownlint/md046': ['off'],
				'markdownlint/md041': ['off'],
			},
		},
		{
			files: ['**/builders/**/*.js', '**/playground/main.js', 'nuxt-module/**/*'],
			rules: {
				'import/no-extraneous-dependencies': 'off',
				'node/no-extraneous-import': 'off',
			},
		},
		{
			files: ['**/scripts/**/*.js'],
			rules: {
				'no-console': 'off',
				'import/no-dynamic-require': 'off',
			},
		},
	],
};
