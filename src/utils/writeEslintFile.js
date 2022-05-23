const fs = require('fs');
const { ESLint } = require('eslint');
const { error } = require('logger');
const getConfig = require('utils/getConfig');
const cwd = require('utils/cwd');

/**
 * 写入eslint fix 文件
 * @param code
 * @param pathFile
 */
function writeEslintFile(code, pathFile) {
  const { config: customEslintConfig } = getConfig('eslint');
  if (!customEslintConfig) {
    return error('没找到eslint配置，跳过eslint fix');
  }

  const eslint = new ESLint({
    fix: true,
    cwd,
    overrideConfig: customEslintConfig,
  });

  fs.writeFile(pathFile, code, async (err) => {
    if (err) {
      return error(err);
    }

    // eslint fix
    const result = await eslint.lintFiles(pathFile);
    result.forEach(({ pathFileFix, output }) => {
      if (pathFileFix && output) {
        fs.writeFile(pathFileFix, output, async (err) => {
          if (err) {
            return error(err);
          }
        });
      }
    });
  });
}

module.exports = writeEslintFile;
