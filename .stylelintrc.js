/** @type {import('stylelint').Config} */
export default {
	extends: [
		'@morev/stylelint-config/scss',
	],
	rules: {
		'plugin/no-low-performance-animation-properties': null,
		'declaration-block-no-redundant-longhand-properties': null,
	},
};
