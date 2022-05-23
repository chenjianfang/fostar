const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

// 拷贝目录
function copyFolderSync(src, dest) {
  fse.copySync(src, dest);
}

// 拷贝文件到目录
function copyFileSync(filePath, destDir, filename) {
  const name = filename || path.basename(filePath);
  return fse.copySync(filePath, path.join(destDir, name));
}

// 判断文件是否存在
function pathExists(filePath) {
  const exists = fse.pathExistsSync(filePath);
  return exists;
}

// 读取文件内容
function readFileSync(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = {
  copyFolderSync,
  copyFileSync,
  pathExists,
  readFileSync,
};
