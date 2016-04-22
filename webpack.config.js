var path = require('path')

module.exports = {
  entry: './js/entry.js',
  debug: false,
  plugins: [],
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [ {
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [ 'react', 'es2015' ]
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    } ]
  }
}
