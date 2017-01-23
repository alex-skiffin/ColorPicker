const webpack = require('webpack');
var path = require('path');

const ASSET_PATH = process.env.ASSET_PATH || '/';
module.exports = {
	entry: {
		app: './app/main.ts',
		polyfill: './configs/polyfill.ts',
		'app-style': './configs/style/app-style.ts'
	},
	output: {
		publicPath: ASSET_PATH,
		filename: "./scripts/[name].js"
	},

	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
				dead_code: true,
                screw_ie8: true
            },
            compress: {
				dead_code: true,
                screw_ie8: true,
				drop_console: true,
				warnings: false,
				unused: false,
				unsafe: true
            },
            comments: false
		}),
		new webpack.optimize.AggressiveMergingPlugin()
	],
	module: {
		loaders: [
			{ test: /\.ts$/, loaders: ['ts-loader'] },
			{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
	},
	resolve: {
		extensions: [".js", ".ts", ".css"],
		alias: {
			'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
		}
	},
}