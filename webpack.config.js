var path = require('path')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry: "./js/entry.js",
    output: {
        path: path.join(__dirname, 'js'),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}