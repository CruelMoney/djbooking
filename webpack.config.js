module.exports = {
  entry: ['whatwg-fetch','./src/App.js'],
  output: {
    path: './',
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port: 8888
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          sourceMaps: true,
          sourceMapTarget: './'
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}
