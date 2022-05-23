const { collectCommand } = require('utils/installCommand');
const init = require('./commands/init');
const pack = require('./commands/pack');
const collect = require('./commands/collect');
const { error } = require('logger');

function langCommand(command) {
  if (!command) {
    return error('command必填');
  }
  collectCommand({
    command,
    commandChild: [
      {
        name: 'init',
        callback: init,
        describe: '初始化多语言配置',
      },
      {
        name: 'pack',
        callback: pack,
        describe: '包裹词条',
      },
      {
        name: 'collect',
        callback: collect,
        describe: '搜集词条',
      },
    ],
  });
}

module.exports = langCommand;
