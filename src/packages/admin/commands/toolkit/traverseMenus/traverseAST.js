const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

// AST转换
const traverseAST = (ast, params) => {
  if (!params.isLowcode) {
    return;
  }

  traverse(ast, {
    VariableDeclarator(path) {
      const { node } = path;
      if (node.id.name === 'menus') {
        // childrenEle
        const childrenEle = t.arrayExpression([
          t.objectExpression([
            t.objectProperty(t.identifier('name'), t.stringLiteral('低代码页')),
            t.objectProperty(t.identifier('path'), t.stringLiteral('/lowcode/test')),
            t.objectProperty(
              t.identifier('component'),
              t.callExpression(t.identifier('loadable'), [
                t.arrowFunctionExpression(
                  [],
                  t.callExpression(t.import(), [t.stringLiteral('../../pages/lowcode/index')]),
                ),
              ]),
            ),
          ]),
        ]);

        const menuEle = t.objectExpression([
          t.objectProperty(t.identifier('name'), t.stringLiteral('低代码页')),
          t.objectProperty(t.identifier('children'), childrenEle),
        ]);

        node.init.elements.push(menuEle);
      }
    },
  });
};

module.exports = traverseAST;
