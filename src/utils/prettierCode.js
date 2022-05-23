const prettier = require('prettier');
const cwd = require('utils/cwd');

// 代码美化
async function prettierCode(code) {
  const options = await prettier.resolveConfig(cwd);
  return prettier.format(code, {
    ...options,
    parser: 'babel',
  });
}

module.exports = prettierCode;
