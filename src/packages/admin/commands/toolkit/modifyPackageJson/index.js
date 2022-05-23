const path = require('path');
const fse = require('fs-extra');

async function modifyPackageJson(destinationFolder, params) {
  const packageJsonPath = path.join(destinationFolder, './package.json');
  const packageObj = await fse.readJson(packageJsonPath);

  if (params.name) {
    packageObj.name = params.name;
  }

  if (params.tech === 'ts') {
    packageObj.devDependencies = {
      ...packageObj.devDependencies,
      typescript: '^4.5.4',
      '@types/node': '^17.0.8',
      '@types/react': '^17.0.38',
      '@types/react-dom': '^17.0.11',
    };
  }

  if (params.isBigStore) {
    packageObj.devDependencies = {
      ...packageObj.devDependencies,
      '@tencent/eslint-config-tencent': '^0.15.2',
      '@typescript-eslint/eslint-plugin': '^5.6.0',
      '@typescript-eslint/parser': '^5.6.0',
      'babel-eslint': '^10.1.0',
      eslint: '^7.32.0',
      'eslint-plugin-react': '^7.27.1',
      'eslint-plugin-react-hooks': '^4.3.0',
      'eslint-plugin-simple-import-sort': '^7.0.0',
      prettier: '^2.3.2',
    };
  }

  if (params.isI18n) {
    packageObj.dependencies = {
      ...packageObj.dependencies,
      i18next: '^19.9.2',
    };
  }

  if (params.isMock) {
    packageObj.devDependencies = {
      ...packageObj.devDependencies,
      'mocker-api': '^2.9.4',
    };
  }

  if (params.isLowcode) {
    packageObj.dependencies = {
      ...packageObj.dependencies,
      amis: '^1.5.3',
    };
  }

  if (params.isOALogin) {
    packageObj.dependencies = {
      ...packageObj.dependencies,
      'admin-common': 'workspace:^1.0.2',
    };
  }

  if (params.ui) {
    let uiPkg = {};
    if (params.ui === 'AntDesign') {
      uiPkg = {
        '@ant-design/icons': '^4.7.0',
        antd: '4.16.13',
      };
    }
    if (params.ui === 'TDesign') {
      uiPkg = {
        'tdesign-icons-react': '^0.0.7',
        'tdesign-react': '^0.22.1',
      };
    }

    if (params.ui === 'tea') {
      uiPkg = {
        '@tencent/tea-component': '^2.7.3',
      };
    }

    packageObj.dependencies = {
      ...packageObj.dependencies,
      ...uiPkg,
    };
  }

  await fse.outputJson(packageJsonPath, packageObj);
}

module.exports = modifyPackageJson;
