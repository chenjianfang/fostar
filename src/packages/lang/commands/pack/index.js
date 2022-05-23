const getConfig = require('utils/getConfig');
const { info } = require('logger');
const traverseAST = require('./traverseAST');
const getFileContent = require('./getFileContent');
const getAST = require('utils/getAST');
const astToCode = require('utils/astToCode');
const prettierCode = require('utils/prettierCode');
const writeEslintFile = require('utils/writeEslintFile');

function pack(options) {
  info(`lang pack ${JSON.stringify(options)}`);

  const { config } = getConfig('lang');
  const { ns, extname, packReg, packFunction } = config;

  getFileContent({ ns, extname }, async (content, pathFile) => {
    if (!content) {
      return;
    }

    // 解析AST
    const { ast } = getAST(content);

    // 转换AST
    traverseAST(ast, packReg, packFunction);

    // AST 生成代码
    let code = astToCode(ast, content);

    // 代码美化
    code = await prettierCode(code);

    // 写入文件
    writeEslintFile(code, pathFile);
  });
}

module.exports = pack;
