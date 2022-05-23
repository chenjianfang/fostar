const path = require('path');
const fse = require('fs-extra');
const getTemplate = require('utils/getTemplate');

const templtePath = getTemplate(__dirname);

async function modifySrc(destinationFolder, params) {
  const rootConfigPath = path.join(templtePath, 'rootConfig');
  const lowcodePath = path.join(templtePath, 'lowcode');
  const i18nPath = path.join(templtePath, 'i18n');
  const mockPath = path.join(templtePath, 'mock');
  const storePath = path.join(templtePath, 'store');

  if (!params.isBigStore) {
    fse.copySync(rootConfigPath, destinationFolder);
  }

  if (params.isLowcode) {
    fse.copySync(lowcodePath, destinationFolder, {
      overwrite: false,
    });

    fse.copySync(path.join(lowcodePath, './public/index.html'), path.join(destinationFolder, './public/index.html'));
  }

  if (params.isI18n) {
    fse.copySync(i18nPath, destinationFolder, {
      overwrite: false,
    });
  }

  if (params.isMock) {
    fse.copySync(mockPath, destinationFolder, {
      overwrite: false,
    });
  }

  if (params.isStore) {
    fse.copySync(storePath, destinationFolder, {
      overwrite: false,
    });
  }
}

module.exports = modifySrc;
