const question = require('utils/question');
const createProject = require('./toolkit/createProject');

const schemaConfig = {
  name: {
    describe: '项目名称', // 描述 {必填}
  },
  tech: {
    describe: '开发语言', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: 'TypeScript',
        value: 'ts',
      },
      {
        name: 'ES6+',
        value: 'js',
      },
    ],
  },
  packageManagement: {
    describe: '包管理工具', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: 'pnpm',
        value: 'pnpm',
      },
      {
        name: 'npm',
        value: 'npm',
      },
    ],
  },
  isBigStore: {
    describe: '是否在大仓', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: '是',
        value: true,
      },
      {
        name: '否',
        value: false,
      },
    ],
  },
  isLowcode: {
    describe: '是否要支持低代码', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: '是',
        value: true,
      },
      {
        name: '否',
        value: false,
      },
    ],
  },

  isI18n: {
    describe: '是否要支持多语言', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: '是',
        value: true,
      },
      {
        name: '否',
        value: false,
      },
    ],
  },

  isMock: {
    describe: '是否要支持Mock', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: '是',
        value: true,
      },
      {
        name: '否',
        value: false,
      },
    ],
  },

  isStore: {
    describe: '是否要状态管理', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: '是',
        value: true,
      },
      {
        name: '否',
        value: false,
      },
    ],
  },

  isOALogin: {
    describe: '是否要OA登录', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: '是',
        value: true,
      },
      {
        name: '否',
        value: false,
      },
    ],
  },

  isHTTPS: {
    describe: '是否要https', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: '是',
        value: true,
      },
      {
        name: '否',
        value: false,
      },
    ],
  },

  host: {
    describe: '本地开发Host', // 描述 {必填}
    type: 'input',
    defaultValue: 'dev.woa.com',
  },

  ui: {
    describe: 'UI框架', // 描述 {必填}
    type: 'list',
    choices: [
      {
        name: 'AntDesign',
        value: 'AntDesign',
      },
      {
        name: 'TDesign',
        value: 'TDesign',
      },
      {
        name: 'tea',
        value: 'tea',
      },
    ],
  },
};

async function create(options) {
  const params = await question(schemaConfig, options);

  createProject(params);
}

module.exports = create;
