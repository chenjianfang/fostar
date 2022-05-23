const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

// AST转换
const traverseAST = (ast, packReg, packFunction) => {
  const reg = new RegExp(packReg);
  traverse(ast, {
    // 字符串
    StringLiteral(path) {
      const { node, parent } = path;
      if (!reg.test(node.value)) {
        return;
      }

      // 作为函数参数情况不考虑
      if (!t.isCallExpression(parent)) {
        if (
          t.isObjectProperty(parent) // 在对象的key或value
          && node.start === parent.key.start // 匹配项为对象key
        ) {
          return;
        }

        const valueObj = [t.stringLiteral(node.value)];
        if (t.isJSXAttribute(parent)) {
          // jsx字符串 -> jsx包裹表达式
          const jsxExpress = t.jsxExpressionContainer(t.callExpression(t.identifier(packFunction), valueObj));
          path.replaceWith(jsxExpress);
          return;
        }

        // 普通字符串包裹函数包裹
        const pack = t.callExpression(t.identifier(packFunction), valueObj);
        path.replaceWith(pack);
      }
    },

    // jsx文本处理
    JSXText(path) {
      const { node } = path;

      // AST树一直往上找Trans包裹组件
      const hasTransParent = path.findParent((pathParent) => pathParent.isJSXElement() && pathParent.node?.openingElement?.name?.name === 'Trans');

      if (
        !reg.test(node.value)
        || hasTransParent // 被Trans包裹的忽略
      ) {
        return;
      }

      node.value = node.value.replace(/\n/g, '').trim(); // todo 这里会有bug，如果文本中间有换行，也会被删除
      const valueObj = [t.stringLiteral(node.value)];
      const jsxExpress = t.jsxExpressionContainer(t.callExpression(t.identifier(packFunction), valueObj));
      path.replaceWith(jsxExpress);
    },

    // 模版字符串
    TemplateLiteral(path) {
      const { expressions, quasis } = path.node;
      let str = '';
      const objPropsList = [];


      while (expressions.length || quasis.length) {
        let current;
        if (!expressions.length) {
          current = quasis.shift();
        } else if (!quasis.length) {
          current = expressions.shift();
        } else {
          // expressions和quasis同时存在
          if (expressions[0].start < quasis[0].start) {
            current = expressions.shift();
          } else {
            current = quasis.shift();
          }
        }

        if (current.type === 'Identifier') {
          // 变量

          str += `{{${current.name}}}`;
          // 创建参数对象
          const name = t.identifier(current.name);
          const props = t.objectProperty(name, name, false, true);
          objPropsList.push(props);
        } else if (current.type === 'TemplateElement') {
          // 字符串
          str += current.value.raw;
        } else if (current.type === 'CallExpression') {
          // 函数调用

          // 函数名
          const { name } = current.callee;

          // 函数参数
          const args = current.arguments;

          str += `{{${name}}}`;

          // 获取参数列表
          const newArgs = [];
          args.forEach((item) => {
            if (item.type === 'StringLiteral') {
              newArgs.push(t.stringLiteral(item.value));
            }
            if (item.type === 'Identifier') {
              newArgs.push(t.identifier(item.name));
            }
          });

          const propKey = t.identifier(name);
          const propValue = t.callExpression(t.identifier(name), newArgs);
          const props = t.objectProperty(propKey, propValue);
          objPropsList.push(props);
        } else {
          throw Error(`模版内只支持字符串类型和变量类型, ${current.type}类型不支持`);
        }
      }

      const newStr = t.stringLiteral(str);

      if (newStr) {
        const pack = t.callExpression(t.identifier(packFunction), [newStr, t.objectExpression(objPropsList)]);
        path.replaceWith(pack);
      }
    },

  });
};

module.exports = traverseAST;
