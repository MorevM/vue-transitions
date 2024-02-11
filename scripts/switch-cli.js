import { switchVersion, ERROR_PREFIX } from './utils.js';

const version = process.argv[2];
const vueEntry = process.argv[3] || 'vue';

if (version === '2') {
	switchVersion(2, vueEntry);
} else if (version === '3') {
	switchVersion(3, vueEntry);
} else {
	console.warn(`${ERROR_PREFIX} expecting version "2" or "3" but got "${version}"`);
}
