import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = resolve(dirname(fileURLToPath(import.meta.url)));
const distDirectory = join(currentDirectory, '..', 'dist');

const write = (name, content) => {
	const destination = join(distDirectory, name);
	writeFileSync(destination, content, 'utf8');
};

const copy = (name, version) => {
	const source = join(distDirectory, `vue${version}`, name);
	const destination = join(distDirectory, name);

	const content = readFileSync(source, 'utf8');

	// unlink for pnpm, @see https://github.com/vueuse/vue-demi/issues/92
	try { unlinkSync(destination); } catch {}

	writeFileSync(destination, content, 'utf8');
};

export const ERROR_PREFIX = '[@morev/vue-transitions]';

export const loadModule = async (name) => {
	try {
		return import(name);
	} catch {
		return undefined;
	}
};

export const switchVersion = (version, vueEntry = 'vue') => {
	copy('vue-transitions.cjs', version);
	copy('vue-transitions.js', version);
	copy('index.css', version);
	write('index.css.d.ts', `declare module '@morev/vue-transitions/styles';\n`);

	console.log(`${ERROR_PREFIX} Switched for Vue ${version} (entry: '${vueEntry}')`);
};
