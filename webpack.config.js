var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')

module.exports = {
  entry: ['whatwg-fetch','./src/App.js'],
  output: {
    path: './output',
    publicPath: "/output/",
    filename: 'index.js'

  },
  devServer: {
    inline: true,
    port: 8888
  },
  devtool: 'source-map',
  // Resolve the `./src` directory so we can avoid writing
  // ../../styles/base.css
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
           sourceMaps: true,
           sourceMapTarget: './'
        }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') }
      //{ test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  postcss: function (webpack) {
        return [
            postcssImport({
                addDependencyTo: webpack
            })
        , autoprefixer]
    },
  // This plugin moves all the CSS into a separate stylesheet
 plugins: [
   new ExtractTextPlugin('app.css')
 ]
}
