import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';

export default {
    entry: 'tmp/Meld.js',
    dest: 'dist/Meld.js',
    plugins: [includePaths({
        paths: ['tmp'],
        extensions: ['.js']
    }), babel()],
    format: 'umd',
    moduleName: 'Meld',
    indent: false
};