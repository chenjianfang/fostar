const path = require('path');
const moduleAlias = require('module-alias');

// 配置别名
moduleAlias.addAliases({
  src: path.join(__dirname, 'src'),
  packages: path.join(__dirname, 'src/packages'),
  utils: path.join(__dirname, 'src/utils'),
  logger: path.join(__dirname, 'src/logger'),
  constants: path.join(__dirname, 'src/constants'),
  config: path.join(__dirname, 'src/config'),
});
