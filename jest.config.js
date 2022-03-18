module.exports = {
	moduleFileExtensions: ['js'],
	testEnvironment: 'jsdom',
	verbose: true,
	restoreMocks: true,
	cacheDirectory: './tmp/jest/cache',
	coverageDirectory: './tmp/jest/coverage',
	collectCoverageFrom: [
		'./src/utility/**/*.js',
		'!./src/utility/defaults/*',
		'!**/_*.js',
	],
	coverageReporters: ['lcov', 'text'],
	coverageProvider: 'v8',
};
