const { collectCommand } = require('utils/installCommand');
const create = require('./commands/create');
const { error } = require('logger');

function adminCommand(command) {
  if (!command) {
    return error('command必填');
  }
  collectCommand({
    command,
    commandChild: [
      {
        name: 'create',
        callback: create,
        describe: '生成管理端项目',
        options: [
          {
            flags: '-n, --name [string]',
            describe: '项目名称',
          },
        ],
      },
    ],
  });
}

module.exports = adminCommand;
