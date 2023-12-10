const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './public/main.js',
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public/index.html'),
			favicon: path.join(__dirname, 'public/favicon.png'),
			inject: false,
		}),
		new CopyPlugin({
			patterns: [
				{ from: './public/assets', to: './assets' },
				{ from: './public/reset.css', to: './' },
				{ from: './public/styles.css', to: './' },
			],
		}),
	],
};
