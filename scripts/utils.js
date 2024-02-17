import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(dirname(fileURLToPath(import.meta.url)));

const copy = (name, version) => {
	const source = join(dir, '..', 'dist', `vue${version}`, name);
	const destination = join(dir, '..', 'dist', name);

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

	console.log(`${ERROR_PREFIX} Switched for Vue ${version} (entry: '${vueEntry}')`);
};
