process.env.NODE_ENV = 'production';

var fs = require('fs'),
	exec = require('child_process').exec,
	rollup = require('rollup'),
	uglify = require('uglifyjs'),
	babel = require('rollup-plugin-babel'),
	includePaths = require('rollup-plugin-includepaths'),
	pkg = require('../package.json');

var banner = '/** ' + pkg.name + ' - ' + pkg.description + '\n' +
	' *\n' +
	' * @version v' + pkg.version + '\n' +
	' * @author ' + pkg.author + '\n' +
	' * @link ' + pkg.homepage + '\n' +
	' * @license ' + pkg.license + '\n' +
	' *\n' +
	' * @providesModule Meld\n' +
	' */\n';

rollup.rollup({
	entry: 'tmp/Meld.js',
	plugins: [
		includePaths({
			paths: ['tmp'],
			extensions: ['.js']
		}),
		babel()
	],
	indent: false,
	sourceMap: 'inline'
})
.then(function (bundle) {
	var code = bundle.generate({
		format: 'umd',
		moduleName: 'Meld',
		banner: banner
	}).code;

	write('dist/meld.js', code);
	write('dist/meld.min.js', banner + '\n' + uglify.minify(code, {
		fromString: true,
		mangle: true,
		output: {
			ascii_only: true
		}
	}).code);
})
.catch(function (e) {
	console.log(e);
})

function write(dest, code) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(dest, code, function (err) {
			if (err) return reject(err)
			resolve()
		})
	})
}
