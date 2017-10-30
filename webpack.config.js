var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname + '/build')
var SRC_DIR = path.resolve(__dirname + '/src')
var PUBLIC_DIR = path.resolve(__dirname + '/public_html')

var config = {
	entry: SRC_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'source-map',
	devServer: {
		inline: true,
		contentBase: PUBLIC_DIR,
		host: 'flightsv2.detooltip.com',
		port: 8080
	},
	module: {
		rules: [
		{
			test: /\jsx?$/,
			include: SRC_DIR,
			loader: "babel-loader",
			query: {
				presets: ['env', 'react', 'stage-0']
			}
		}
		]
	}
}

module.exports = config
