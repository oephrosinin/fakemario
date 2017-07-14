const IS_DEV = require('./isDev');

module.exports = {
  test: /\.ms[ac]ss$/,
  use: [{
    loader: 'style-loader',
    options: {
      sourceMap: IS_DEV,
    },
  }, {
    loader: 'css-loader',
    options: {
      localIdentName: '[hash:base64]-[name]-[local]',
      modules: true,
      sourceMap: IS_DEV,
    },
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: IS_DEV,
    },
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: IS_DEV,
    },
  }],
};
