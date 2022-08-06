const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, './client/src/index.jsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {presets: ['@babel/env']},
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'client'),
  //   },
  //   compress: true,
  //   port: 3000
  // },
  plugins: [new HtmlWebpackPlugin({
    title: `Tensor Object`,
    lang: 'en',
  }),
  // new webpack.DefinePlugin({
  //   'process.env': dotenv.parsed,
  // }),
  new CompressionPlugin({
    // 'process.env': dotenv.parsed,
    'algorithm': 'gzip',
    'test': /.js$|.css$/,
  }),
  ],

};
