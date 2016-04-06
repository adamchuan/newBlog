var path = require('path')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry:  "./js/entry.js",
    output: {
        path: path.join(__dirname, 'js'),
        filename: "bundle.js"
    },
    module: {
        loaders: [{ 
            test: /\.js|jsx$/, 
            exclude: /node_modules/, 
            loader: "babel", 
            query:
              {
                presets:['react','es2015']
              }
        },{
            test: /\.scss|sass$/,
            loader: ["style","css","postcss","sass"]
        }]
    },
    postcss: ()=> {
        return [autoprefixer({
            browsers: ['ie 8-10','Firefox >= 20','Chrome >= 30','iOS >= 6','Android >= 4'],
            cascade: false
        })]
    }
}