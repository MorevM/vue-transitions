import { readFileSync } from 'node:fs';

const vue2Styles = readFileSync('dist/vue2/index.css');
const vue3Styles = readFileSync('dist/vue3/index.css');

if (!vue2Styles.equals(vue3Styles)) {
	throw new Error('Vue 2 and Vue 3 styles must be identical for the shared styles export.');
}
