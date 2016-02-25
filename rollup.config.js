import babel from 'rollup-plugin-babel';

export default {
	entry: 'tmp/Meld.js',
	dest: 'dist/Meld.js',
	plugins: [babel()],
	format: 'umd',
	moduleName: 'Meld'
};