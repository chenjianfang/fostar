const generate = require('@babel/generator').default;

// AST生成代码
function astToCode(ast, content) {
  const { code } = generate(
    ast,
    {
      decoratorsBeforeExport: true,
      jsescOption: {
        minimal: true,
      },
      retainLines: true,
    },
    content,
  );
  return code;
}

module.exports = astToCode;
