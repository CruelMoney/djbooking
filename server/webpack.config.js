var webpack = require("webpack");
var path = require("path");
var nodeExternals = require("webpack-node-externals");
var NodemonPlugin = require("nodemon-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function isProd(valProd, valDev) {
	return process.env.NODE_ENV === "production" ? valProd : valDev;
}

const commonPlugins = [new webpack.DefinePlugin({ "global.GENTLY": false })];

module.exports = {
	entry: "./src/index.js",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	output: {
		path: __dirname + "/build",
		filename: "bundle.js",
		chunkFilename: isProd("[id].[hash].chunk.js", "[id].chunk.js")
	},
	target: "node",
	devtool: "inline-source-map",
	externals: [nodeExternals()],
	node: {
		__dirname: false
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loaders: "babel-loader",
				options: {
					sourceType: "unambiguous",
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: [
						"@babel/plugin-proposal-class-properties",
						"@babel/plugin-transform-runtime",
						"dynamic-import-node"
						//'transform-object-assign',
					]
				}
			},
			{
				test: [/\.(css)?$/],
				loaders: "null-loader"
			},

			{
				test: /\.svg$/,
				loader: require.resolve("svg-url-loader"),
				options: {
					noquotes: true
				}
			},

			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve("url-loader"),
				options: {
					limit: 10000,
					name: "/static/media/[name].[hash:8].[ext]"
				}
			},
			{
				exclude: [
					/\.html$/,
					/\.(js|jsx)$/,
					/\.css$/,
					/\.json$/,
					/\.bmp$/,
					/\.gif$/,
					/\.jpe?g$/,
					/\.png$/,
					/\.svg$/
				],
				loader: require.resolve("file-loader"),
				options: {
					name: "/static/media/[name].[hash:8].[ext]"
				}
			}
		]
	},
	plugins: isProd(
		[
			// PRODUCTION PLUGINS
			...commonPlugins
		],
		[
			// DEVELOPMENT PLUGINS
			...commonPlugins,
			new NodemonPlugin({
				script: "./build/bundle.js"
			})
		]
	)
};
