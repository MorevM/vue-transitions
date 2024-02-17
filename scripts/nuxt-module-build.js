import { copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'unbuild';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copyNuxtFile = (name) => copyFileSync(
	join(__dirname, '..', 'nuxt-module', name),
	join(__dirname, '..', 'nuxt', name),
);

await build('.', false, {
	outDir: './nuxt',
	clean: true,
	entries: [
		{
			input: './nuxt-module/module.ts',
			name: 'module',
		},
	],
	declaration: 'compatible',
	externals: ['@nuxt/schema', '@morev/utils', 'type-fest'],
	failOnWarn: false,
	rollup: {
		emitCJS: true,
	},
	hooks: {
		'build:done'(context) {
			// Annoying messages, I know these files are inlined and this is intended.
			context.warnings.forEach(w => {
				if (w.includes('Inlined') && w.match(/nuxt-module[/\\]module/)) {
					context.warnings.delete(w);
				}
			});

			// Move static files.
			['template.vue', 'package.json'].forEach(file => copyNuxtFile(file));
		},
	},
});
