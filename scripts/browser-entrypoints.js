import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripIndent } from '@morev/utils';

const PROJECT_DIRECTORY = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const DISTRIBUTIONS = ['vue2', 'vue3'];
const ENTRYPOINTS = {
	'vue-transitions.browser.cjs': stripIndent(`
		require('./index.css');

		module.exports = require('./vue-transitions.cjs');
	`),
	'vue-transitions.browser.js': stripIndent(`
		import './index.css';

		export * from './vue-transitions.js';
		export { default } from './vue-transitions.js';
	`),
};

await Promise.all(DISTRIBUTIONS.flatMap((distribution) => {
	return Object.entries(ENTRYPOINTS).map(([filename, contents]) => {
		return writeFile(join(PROJECT_DIRECTORY, 'dist', distribution, filename), `${contents}\n`);
	});
}));
