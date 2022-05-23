const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

// AST转换
const traverseAST = (ast, params) => {
  traverse(ast, {
    ObjectProperty(path) {
      const { node } = path;

      // alias
      if (node.key.name === 'alias') {
        if (params.isI18n) {
          // i18n
          const strObj = [t.stringLiteral('i18n')];
          const obj = t.objectProperty(t.identifier('i18n'), t.callExpression(t.identifier('resolveSrc'), strObj));
          node.value.properties.push(obj);
        }

        if (params.isStore) {
          // i18n
          const strObj = [t.stringLiteral('store')];
          const obj = t.objectProperty(t.identifier('store'), t.callExpression(t.identifier('resolveSrc'), strObj));
          node.value.properties.push(obj);
        }
      }

      // devServer
      if (node.key.name === 'devServer') {
        if (params.isHTTPS) {
          // https
          const obj = t.objectProperty(t.stringLiteral('https'), t.booleanLiteral(true));
          node.value.properties.push(obj);
        }
        if (params.host) {
          // https
          const obj = t.objectProperty(t.stringLiteral('host'), t.stringLiteral(params.host));
          node.value.properties.push(obj);
        }
      }

      // proxy
      if (node.key.name === 'proxy') {
        if (params.isMock) {
          // mock
          const obj = t.objectProperty(
            t.stringLiteral('/mock'),
            t.ObjectExpression([
              t.objectProperty(t.identifier('target'), t.stringLiteral('http://localhost:3721/')),
              t.objectProperty(t.identifier('changeOrigin'), t.booleanLiteral(true)),
            ]),
          );
          node.value.properties.push(obj);
        }
        if (params.isI18n) {
          // i18n
          const obj = t.objectProperty(
            t.stringLiteral('/gettranslate'),
            t.ObjectExpression([
              t.objectProperty(t.identifier('target'), t.stringLiteral('http://9.208.69.124:8080/v1')),
              t.objectProperty(t.identifier('changeOrigin'), t.booleanLiteral(true)),
            ]),
          );
          node.value.properties.push(obj);
        }
      }
    },
  });
};

module.exports = traverseAST;
