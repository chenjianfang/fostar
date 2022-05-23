const path = require('path');

const resolveSrc = (relativePath) => path.resolve(__dirname, 'src', relativePath);

// 参考：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
module.exports = {
  webpack: {
    alias: {
      assets: resolveSrc('assets'),
      components: resolveSrc('components'),
      common: resolveSrc('common'),
      configs: resolveSrc('configs'),
      layouts: resolveSrc('layouts'),
      pages: resolveSrc('pages'),
      services: resolveSrc('services'),
      utils: resolveSrc('utils'),
    },
    configure: (webpackConfig) => {
      return webpackConfig;
    },
  },
  devServer: {
    open: true,
    proxy: {},
  },
};
