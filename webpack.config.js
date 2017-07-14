const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const pjson = require('package.json');
// rules
const isDev = require('./webpack-rules/is_dev');
const sass = require('./webpack-rules/sass');
const ts = require('./webpack-rules/typescript');

const CSS_FILE_NAME = `style.css`;

const TSX_INPUT_FILE_NAME = `index.tsx`;
const JS_OUTPUT_FILE_NAME = 'main.js';

const plugins = [
  new CheckerPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: !isDev,
    debug: isDev,
  }),
  new ExtractTextPlugin({ filename: `../css/${CSS_FILE_NAME}`, allChunks: true }),
];

if (!isDev) {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }), new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      screw_ie8: true,
    },
    comments: false,
  }));
}

module.exports = {
  entry: `./ts/${TSX_INPUT_FILE_NAME}`,
  output: {
    path: path.resolve(__dirname, './static/js/'),
    filename: JS_OUTPUT_FILE_NAME,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.sass', '.scss'],
  },
  module: {
    rules: [
      sass,
      ts,
    ],
  },
  plugins,
};
