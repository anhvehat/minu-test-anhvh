const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pkgJson = require('../../package.json');
const ESLintPlugin = require('eslint-webpack-plugin');

const basePath = path.resolve(__dirname, '../');
const buildPath = path.resolve(basePath, './build');
const distPath = path.resolve(basePath, './dist');

module.exports = {
	entry: {
		'main': [path.resolve(basePath, './index.js')]
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: distPath
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						compact: false,
						plugins: ['dynamic-import-webpack'],
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										chrome: '56',
										ie: '10',
										edge: '13',
										firefox: '45'
									}
								}
							]
						]
					}
				}
			}
		]
	},
	devtool: 'source-map',
	context: __dirname,
	target: ['web', 'es5'],
	stats: 'normal',
	plugins: [
		new ESLintPlugin(),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [distPath + '/*.js']
		}),
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(pkgJson.version)
		})
	]
};
