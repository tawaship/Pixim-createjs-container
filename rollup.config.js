import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';
import del from 'del';

const conf = require('./package.json');
const version = conf.version;
const pixi = conf.dependencies['pixi.js'].replace('^', '');
const pixim = conf.dependencies['@tawaship/pixim.js'].replace('^', '');

const banner = [
	'/*!',
	` * @tawaship/pixim-createjs-container.js - v${version}`,
	' * ',
	` * @require pixi.js v${pixi}`,
	` * @require @tawaship/pixim.js v${pixim}`,
	' * @author tawaship (makazu.mori@gmail.com)',
	' * @license MIT',
	' */',
	''
].join('\n');

export default (async () => {
	if (process.env.PROD) {
		await del(['./docs/', './dist/']);
	}
	
	return [
		{
			input: 'src/index.ts',
			output: [
				{
					banner,
					file: 'dist/Pixim-createjs-container.js',
					format: 'iife',
					name: 'Pixim.createjs',
					sourcemap: true,
					extend: true,
					globals: {
						'pixi.js': 'PIXI',
						'@tawaship/pixim.js': 'Pixim'
					}
				}
			],
			external: ['pixi.js', '@tawaship/pixim.js'],
			plugins: [
				nodeResolve(),
				commonjs(),
				typescript(),
				buble(),
				terser({
					compress: {
						//drop_console: true
						//pure_funcs: ['console.log']
					},
					mangle: false,
					output: {
						beautify: true,
						braces: true
					}
				})
			]
		},
		{
			input: 'src/index.ts',
			output: [
				{
					banner,
					file: 'dist/Pixim-createjs-container.min.js',
					format: 'iife',
					name: 'Pixim.createjs',
					sourcemap: true,
					extend: true,
					globals: {
						'pixi.js': 'PIXI',
						'@tawaship/pixim.js': 'Pixim'
					},
					compact: true
				}
			],
			external: ['pixi.js', '@tawaship/pixim.js'],
			plugins: [
				nodeResolve(),
				commonjs(),
				typescript(),
				buble(),
				terser({
					compress: {
						//drop_console: true,
						pure_funcs: ['console.log']
					}
				})
			]
		}
	]
})();