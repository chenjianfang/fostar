const inquirer = require('inquirer');

// 弹框询问
function inquirerConfig(questions) {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        resolve(answers);
      })
      .catch((err) => reject(err));
  });
}

/**
 * 获取声明的schema参数值
 * @param schemaConfig
 const schemaConfig = {
  username: { // key名
    describe: '用户名称', // 描述 {必填}
    defaultValue?: '默认用户名', // 默认值 {可不填}
    type?: 'string' // value值类型 {可不填}
  }
}
 * @param options
 * @returns {Promise<unknown>}
 */
async function question(schemaConfig, options = {}) {
  // 问答询问
  const questions = [];

  // 对比配置完整性 - 只校验了key匹配
  Object.entries(schemaConfig).forEach(([key, item]) => {
    if (!options[key]) {
      const { describe, defaultValue, type = 'input', choices = [] } = item;
      questions.push({
        type,
        name: key,
        message: describe,
        default: defaultValue,
        choices,
      });
    }
  });

  // 弹框询问
  const inquirerParams = await inquirerConfig(questions);
  return {
    ...options,
    ...inquirerParams,
  };
}

module.exports = question;
