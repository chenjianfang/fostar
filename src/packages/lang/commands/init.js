const path = require('path');
const cwd = require('utils/cwd');
const { error, info } = require('logger');
const { copyFileSync, pathExists } = require('utils/fsHelper');
const { CONFIG_NAME } = require('../constants');

function init(options) {
  if (!pathExists(path.join(cwd, CONFIG_NAME))) {
    copyFileSync(path.join(__dirname, '../templates/default.config.js'), cwd, CONFIG_NAME);
  } else {
    error(`${CONFIG_NAME} 配置已存在`);
  }
  info(`run init ${JSON.stringify(options)}`, true);
}

module.exports = init;
