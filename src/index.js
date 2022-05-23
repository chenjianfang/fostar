const { installCommand } = require('utils/installCommand');
const langCommand = require('packages/lang');
const adminCommand = require('packages/admin');
const startCommand = require('packages/start');

// 多语言
langCommand('lang');

// 管理系统模版
adminCommand('admin');

// 大仓start命令
startCommand('start');

// 安装命令
installCommand({
  version: '0.0.1',
});
