const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    port: 3030,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx','.ts','.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'production' ? '' : '[DEV]',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
  ],
};