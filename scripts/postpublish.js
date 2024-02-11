import { readFileSync, writeFileSync } from 'node:fs';

const packageJsonContents = readFileSync('package.json', { encoding: 'utf8' });

writeFileSync(
	'package.json',
	packageJsonContents.replace('"private": false', '"private": true'),
);
