const path = require('path');
const cwd = require('utils/cwd');
const fse = require('fs-extra');
const fs = require('fs');
const { error } = require('logger');
const getTemplate = require('utils/getTemplate');
const traverseCRACO = require('./traverseCRACO');
const modifySrc = require('./modifySrc');
const modifyPackageJson = require('./modifyPackageJson');
const install = require('./install');

const templtePath = getTemplate(__dirname);

// 创建基础模版
async function createTemplateBase(destinationFolder) {
  // base模版路径
  const templtePathBase = path.join(templtePath, 'base');

  // 复制模版
  await fse.copy(templtePathBase, destinationFolder);
}

async function createProject(params) {
  const destinationFolder = path.join(cwd, params.name);
  if (fs.existsSync(destinationFolder)) {
    return error('目录已存在');
  }

  // 创建项目文件夹
  await fse.ensureDir(destinationFolder);

  // 创建基础模版
  await createTemplateBase(destinationFolder, params);

  // 修改package.json
  await modifyPackageJson(destinationFolder, params);

  // 修改 craco.config.js 文件
  traverseCRACO(destinationFolder, params);

  // 修改src模版文件
  modifySrc(destinationFolder, params);

  // 安装依赖包
  install(destinationFolder, params);
}

module.exports = createProject;
