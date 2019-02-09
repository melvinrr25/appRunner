// module.exports = {
//   module: {
//   }
// }


const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2015'],
          plugins: ["transform-object-assign", "transform-runtime"]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  //devtool: 'source-map'
};