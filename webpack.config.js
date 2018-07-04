const path = require('path');
const webpack = require('webpack');
const ExtraTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const SassExtraText = new ExtraTextPlugin({
	filename: '[name].css',
	allChunks: true
});

module.exports = {
	entry: {
		app: './src/index.js',
		vendor: ['react', 'react-dom', 'redux', 'react-redux']
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},

	resolve: {

	},
  	devtool: 'inline-source-map',

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: ['transform-runtime']
					}
				}]
			},

			{
				test: /\.sass|scss$/,
				use: SassExtraText.extract({ 
					// dev环境使用
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: '[local]-[hash:base64:6]'
							}
						}, 
						// {
						// 	loader: 'postcss-loader'
						// },
						{
							loader: 'sass-loader'
						}
					]
				})
			}
		]
	},

	plugins: [
		SassExtraText,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HTMLWebpackPlugin({
			title: 'react-redux'
		})
	],

	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, 'dist'),
		host: '0.0.0.0',
		disableHostCheck: true
	}
}