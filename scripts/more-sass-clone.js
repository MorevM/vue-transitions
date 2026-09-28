import { cpSync, existsSync, realpathSync, rmSync } from 'node:fs';

const source = [
	'builders/vue2-builder/node_modules/more-sass',
	'node_modules/more-sass',
].find((path) => existsSync(path));

if (!source) {
	throw new Error('more-sass is not installed.');
}

rmSync('.more-sass', { recursive: true, force: true });
cpSync(realpathSync(source), '.more-sass', { recursive: true });
