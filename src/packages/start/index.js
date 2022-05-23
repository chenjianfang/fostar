const path = require('path');
const shell = require('shelljs');
const { error } = require('logger');
const { collectCommand } = require('utils/installCommand');
const getConfig = require('utils/getConfig');

function start() {
  const { filepath } = getConfig('eslint');
  const root = path.dirname(filepath);
  const { config: name } = getConfig('name');
  shell.cd(root);
  shell.exec(`pnpm start --filter ${name}`);
}

function startCommand(command) {
  if (!command) {
    return error('command必填');
  }
  collectCommand({
    command,
    commandChild: [
      {
        name: '',
        callback: start,
        describe: 'start 大仓命令',
      },
    ],
  });
}

module.exports = startCommand;
