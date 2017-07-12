 var path = require('path');
 
 module.exports = {
     entry: './assets/src/js/main.js',
     output: {
         path: path.resolve(__dirname, 'assets', 'dist', 'js'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     devtool: 'source-map'
 };