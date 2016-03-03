module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
			'../node_modules/babel-polyfill/dist/polyfill.js',
            '../dist/meld.js',
            '../spec/**/*.js'
        ],
        reporters: ['progress', 'coverage'],
        port: 3304,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity,
		preprocessors: {
			'../dist/meld.js': ['coverage']
		},
		coverageReporter: {
			reporters: [
				{ type: 'lcov', dir: '../coverage', subdir: '.' },
				{ type: 'text-summary', dir: '../coverage', subdir: '.' }
			]
		}
    })
}
