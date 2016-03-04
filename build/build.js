var fs = require('fs'),
	chalk = require('chalk'),
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

console.log(chalk.red('Building Meld Ui Version v' + pkg.version + ' | ' + process.env.NODE_ENV));
console.log('');
console.log(chalk.blue('Building from TypeScript output'));

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
		console.log(chalk.blue('Building bundle'));

		var code = bundle.generate({
			format: 'umd',
			moduleName: 'Meld',
			moduleId: 'meld',
			useStrict: true,
			banner: banner
		}).code;

		write('dist/meld.js', code);

		if (process.env.NODE_ENV == 'production') {
			console.log(chalk.blue('Building minified version'));

			write('dist/meld.min.js', banner + '\n' + uglify.minify(code, {
				fromString: true,
				mangle: true,
				output: {
					ascii_only: true
				}
			}).code);
		}
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
