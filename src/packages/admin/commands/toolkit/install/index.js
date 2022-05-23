const path = require('path');
const shell = require('shelljs');
const getConfig = require('utils/getConfig');

function install(destinationFolder, params) {
  let rootPath = destinationFolder;
  if (params.isBigStore) {
    const { filepath } = getConfig('eslint');
    rootPath = path.dirname(filepath);
  }

  shell.cd(rootPath);
  shell.exec(`${params.packageManagement} install`);
}

module.exports = install;
