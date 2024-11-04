import { readFileSync, writeFileSync } from 'node:fs';

const packageJsonContents = readFileSync('package.json', { encoding: 'utf8' });

let newContents = packageJsonContents
	.replace('"private": true', '"private": false')
	.replaceAll(/"workspaces": \[[^\]]*],\s*/g, '');

if (!newContents.includes('"postinstall"')) {
	newContents = packageJsonContents
		.replace('"scripts": {', '"scripts": {\n\t\t"postinstall": "node ./scripts/postinstall.js",');
}

writeFileSync('package.json', newContents);
