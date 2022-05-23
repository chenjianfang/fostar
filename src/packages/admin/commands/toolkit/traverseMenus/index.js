const path = require('path');
const { MENUS_PATH } = require('constants');
const getAST = require('utils/getAST');
const astToCode = require('utils/astToCode');
const traverseAST = require('./traverseAST');
const prettierCode = require('utils/prettierCode');
const writeEslintFile = require('utils/writeEslintFile');

/**
 * 修改 menus.js 文件
 * @param destinationFolder
 * @param params
 */
async function traverseMenus(destinationFolder, params) {
  const pathFile = path.join(destinationFolder, MENUS_PATH);
  const { ast, content } = getAST(pathFile, true);

  traverseAST(ast, params);

  // AST 生成代码
  let code = astToCode(ast, content);

  // 代码美化
  code = await prettierCode(code);

  // 写入文件
  writeEslintFile(code, pathFile);
}

module.exports = traverseMenus;
