module.exports = {
	extends: [
		'@morev/stylelint-config/scss/warn-autofixable',
	],
	rules: {
		'plugin/no-low-performance-animation-properties': null,
		'declaration-block-no-redundant-longhand-properties': null,
	},
};
