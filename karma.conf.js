module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
            'dist/Meld.js',
            'spec/**/*.js'
        ],
        reporters: ['progress'],
        port: 3304,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
}
