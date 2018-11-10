module.exports = {
	webpackPlugins: [],
	modifyWebpack: config => ({
		...config,
		module: {
			...config.module,
			rules: [
				...config.module.rules.filter(r => r.loaders !== "url-loader"),
				{
					test: /\.(png|jpe?g|gif|bmp|svg)?$/,
					loaders: "url-loader",
					options: {
						limit: 10000,
						name: "/static/media/[name].[hash:8].[ext]"
					}
				}
			]
		}
	})
};
