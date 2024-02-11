import { readFileSync, writeFileSync } from 'node:fs';

const packageJsonContents = readFileSync('package.json', { encoding: 'utf8' });

writeFileSync(
	'package.json',
	packageJsonContents
		.replace('"private": true', '"private": false')
		.replace('"scripts": {', '"scripts": {\n\t\t"postinstall": "node ./scripts/postinstall.js",')
		.replaceAll(/"workspaces": \[[^\]]*],\s*/g, ''),
);
