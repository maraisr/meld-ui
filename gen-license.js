var fs = require('fs'),
	pkg = require('./package.json');

var files = ['dist/Meld.min.js', 'dist/Meld.js'];
var comment = '/** ' + pkg.name + ' - ' + pkg.description + '\n' +
	' *\n' +
	' * @version v' + pkg.version + '\n' +
	' * @author ' + pkg.author + '\n' +
	' * @link ' + pkg.homepage + '\n' +
	' * @license ' + pkg.license + '\n' +
	' *\n' +
	' * @providesModule Meld\n' +
	' */\n';

files.forEach(function (file) {
	var data = fs.readFileSync(file),
		fd = fs.openSync(file, 'w+'),
		buffer = new Buffer(comment);
	fs.writeSync(fd, buffer, 0, buffer.length);
	fs.writeSync(fd, data, 0, data.length);
	fs.close(fd);

});
