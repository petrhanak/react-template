const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: 'node_modules',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "react",
                ["latest", {
                  "es2015": {
                    "modules": false
                  }
                }],
                "stage-0"
              ]
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        exclude: 'node_modules',
        loader: 'pug-loader'
      },
      {
        test: /\.css$/,
        exclude: 'node_modules',
        loader: 'css-loader/locals?modules'
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        exclude: 'node_modules',
        loader: 'url-loader?limit=10000&emitFile=false'
      }
    ]
  },
  devtool: "source-map",
  target: 'node',
  entry: [
    path.resolve(__dirname, '..', 'src', 'index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  }
};