const webpackMerge = require("webpack-merge");

const tsConfig = {
	resolve: {
		extensions: [".ts", ".tsx"]
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loaders: "babel-loader",
				options: {
					babelrc: true,
					extends: "./server/.babelrc"
				}
			}
		]
	}
};

module.exports = {
	webpackPlugins: [],
	modifyWebpack: config => webpackMerge(config, tsConfig)
};
