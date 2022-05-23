const { parse } = require('@babel/parser');
const { readFileSync } = require('utils/fsHelper');

/**
 * 获取到AST
 * @param content
 * @param isFile
 * @returns {ParseResult<import("@babel/types").File>}
 */
function getAST(content, isFile) {
  let tempContent = content;
  if (isFile) {
    tempContent = readFileSync(content);
  }

  // 解析AST
  const ast = parse(tempContent, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'decorators-legacy'],
  });

  return {
    ast,
    content,
  };
}

module.exports = getAST;
