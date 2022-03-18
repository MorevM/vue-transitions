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
	],
};
