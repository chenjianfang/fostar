const glob = require('glob');
const { readFileSync } = require('utils/fsHelper');
const cwd = require('utils/cwd');

// 读取需要包裹的文件内容
function getFileContent({ ns, extname }, callback) {
  const srcList = Object.values(ns).reduce((list, current) => list.concat(current.src), []);
  const matchSrc = srcList.map((item) => `${item}/**/*{${extname.join(',')}}`);

  // 配置读取目录
  matchSrc.forEach((item) => {
    const pathFile = glob.sync(item, {
      cwd,
      absolute: true,
    });
    pathFile.forEach((pathFileItem) => {
      if (pathFileItem) {
        const data = readFileSync(pathFileItem);
        callback(data, pathFileItem);
      }
    });
  });
}

module.exports = getFileContent;
