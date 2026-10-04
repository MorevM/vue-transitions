import { build as buildWithVite } from 'vite';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_NAME = '@morev/vue-transitions';
const PROJECT_DIRECTORY = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const FIXTURES_DIRECTORY = join(PROJECT_DIRECTORY, 'tests/consumers');
const TEMPORARY_DIRECTORY = process.env.RUNNER_TEMP || tmpdir();
const FIXTURE_NAMES = ['vue2', 'vue3', 'nuxt2', 'nuxt3'];
const REQUIRED_PACKAGE_FILES = [
	'dist/vue2/index.css',
	'dist/vue2/vue-transitions.browser.cjs',
	'dist/vue2/vue-transitions.browser.js',
	'dist/vue2/vue-transitions.cjs',
	'dist/vue2/vue-transitions.js',
	'dist/vue3/index.css',
	'dist/vue3/vue-transitions.browser.cjs',
	'dist/vue3/vue-transitions.browser.js',
	'dist/vue3/vue-transitions.cjs',
	'dist/vue3/vue-transitions.js',
	'nuxt/module.cjs',
	'nuxt/module.d.cts',
	'nuxt/module.d.mts',
	'nuxt/module.mjs',
	'nuxt/template.vue',
	'types/styles.d.ts',
	'types/vue2.d.cts',
	'types/vue2.d.ts',
	'types/vue3.d.cts',
	'types/vue3.d.ts',
];

const run = (command, arguments_, cwd) => {
	process.stdout.write(`\n> ${command} ${arguments_.join(' ')}\n`);
	const result = spawnSync(command, arguments_, { cwd, stdio: 'inherit' });

	if (result.error) throw result.error;
	if (result.status !== 0) {
		throw new Error(`Command exited with status ${result.status}: ${command}`);
	}
};

const runAndCapture = (command, arguments_, cwd) => {
	const result = spawnSync(command, arguments_, { cwd, encoding: 'utf8' });

	if (result.error) throw result.error;
	if (result.status !== 0) {
		process.stderr.write(result.stderr);
		throw new Error(`Command exited with status ${result.status}: ${command}`);
	}

	return result.stdout;
};

const setPackageTarball = async (fixtureDirectory, tarballPath) => {
	const packageJsonPath = join(fixtureDirectory, 'package.json');
	const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
	const relativeTarballPath = relative(fixtureDirectory, tarballPath).split(sep).join('/');
	packageJson.dependencies[PACKAGE_NAME] = `file:${relativeTarballPath}`;
	await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, '\t')}\n`);
};

const verifyBrowserRequireResolution = (fixtureName, fixtureDirectory) => {
	const entrypoints = fixtureName === 'vue2'
		? [`${PACKAGE_NAME}/vue2`]
		: [PACKAGE_NAME, `${PACKAGE_NAME}/vue3`];

	entrypoints.forEach((entrypoint) => {
		const resolvedEntrypoint = runAndCapture(
			'node',
			['--conditions=browser', '--print', `require.resolve('${entrypoint}')`],
			fixtureDirectory,
		).trim();
		assert.equal(
			basename(resolvedEntrypoint),
			'vue-transitions.browser.cjs',
			`${entrypoint} must resolve to the CommonJS browser entrypoint`,
		);
	});
};

const verifyBrowserBuild = async (fixtureName, fixtureDirectory) => {
	const outputDirectory = join(fixtureDirectory, 'browser-dist');

	await buildWithVite({
		configFile: false,
		logLevel: 'error',
		root: fixtureDirectory,
		build: {
			emptyOutDir: true,
			outDir: outputDirectory,
			lib: {
				entry: join(fixtureDirectory, 'browser.mjs'),
				fileName: 'consumer',
				formats: ['es'],
			},
			rollupOptions: {
				external: ['@morev/utils', 'vue'],
			},
		},
	});

	const outputFiles = await readdir(outputDirectory);
	const cssFiles = outputFiles.filter((filename) => filename.endsWith('.css'));
	assert.equal(cssFiles.length, 1, `${fixtureName} browser build must emit one stylesheet`);

	const styles = await readFile(join(outputDirectory, cssFiles[0]), 'utf8');
	assert.ok(styles.includes('.expand-enter-active'), `${fixtureName} browser build is missing transition styles`);
	assert.ok(styles.includes('overflow:hidden'), `${fixtureName} browser build emitted unrelated styles`);
};

const temporaryRoot = await mkdtemp(join(TEMPORARY_DIRECTORY, 'vue-transitions-consumers-'));
const artifactsDirectory = join(temporaryRoot, 'artifacts');
let didSucceed = false;

try {
	await mkdir(artifactsDirectory);
	const packOutput = runAndCapture(
		'pnpm',
		['pack', '--ignore-scripts', '--json', '--pack-destination', artifactsDirectory],
		PROJECT_DIRECTORY,
	);
	const packageData = JSON.parse(packOutput);
	const packagedFiles = new Set(packageData.files.map(({ path }) => path));

	REQUIRED_PACKAGE_FILES.forEach((path) => {
		assert.ok(packagedFiles.has(path), `Published tarball is missing ${path}`);
	});

	/* eslint-disable no-await-in-loop -- Sequential installs keep fixture output isolated and resource use predictable. */
	for (const fixtureName of FIXTURE_NAMES) {
		const fixtureDirectory = join(temporaryRoot, fixtureName);
		await cp(join(FIXTURES_DIRECTORY, fixtureName), fixtureDirectory, { recursive: true });
		await cp(
			join(FIXTURES_DIRECTORY, 'pnpm-workspace.yaml'),
			join(fixtureDirectory, 'pnpm-workspace.yaml'),
		);
		await setPackageTarball(fixtureDirectory, packageData.filename);
		run('pnpm', ['install', '--frozen-lockfile=false'], fixtureDirectory);
		run('pnpm', ['run', 'check'], fixtureDirectory);
		if (fixtureName === 'vue2' || fixtureName === 'vue3') {
			verifyBrowserRequireResolution(fixtureName, fixtureDirectory);
			await verifyBrowserBuild(fixtureName, fixtureDirectory);
		}
	}
	/* eslint-enable no-await-in-loop */

	didSucceed = true;
} finally {
	if (didSucceed) {
		await rm(temporaryRoot, { recursive: true });
	} else {
		process.stderr.write(`Consumer test files were preserved in ${temporaryRoot}\n`);
	}
}
