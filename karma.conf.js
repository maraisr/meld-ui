module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'dist/Meld.js',
            'spec/**/*.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS', 'Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}
