const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const webpackProvidePlugin = require('webpack-stream').webpack.ProvidePlugin;

module.exports = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve() + "/dist"
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    },
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx','.ts','.tsx'],
    fallback: {
      fs: false,
      os: require.resolve("os-browserify"),
      path: require.resolve("path-browserify")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: ''
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new webpackProvidePlugin({
      process: 'process/browser'
    }),
    new dotenv()
  ],
};