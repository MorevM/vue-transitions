module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/preset/common',
		'@morev/eslint-config/preset/vue2',
	],
	rules: {},
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
