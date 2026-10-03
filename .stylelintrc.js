import { defineConfig } from '@morev/stylelint-config';

export default defineConfig(
	{ preset: 'scss' },
	{
		rules: {
			'@morev/sass/no-unused-variables': [true, { checkRoot: false }],
			'plugin/no-low-performance-animation-properties': null,
			'declaration-block-no-redundant-longhand-properties': null,
		},
	},
);
