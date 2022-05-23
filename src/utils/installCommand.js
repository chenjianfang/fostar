const { Command } = require('commander');

const collectList = [];

function installCommand({ version }) {
  const program = new Command();
  program.version(version);

  collectList.forEach(({ command, commandChild }) => {
    commandChild.forEach(({ name, callback, describe, options }) => {
      const commandName = name ? `${command}-${name}` : command;

      // 安装命令
      const tempProgram = program.command(commandName).description(describe);

      // 声明命令参数
      if (Array.isArray(options)) {
        options.forEach((option) => {
          tempProgram.option(option.flags, option.describe);
        });
      }

      // 触发回调
      tempProgram.action((optionsValue) => {
        callback(optionsValue);
      });
    });
  });
  program.parse(process.argv);
}

/**
 * 搜集命令
 * @param version
 * @param command
 * @param commandChild
 */
function collectCommand({ command = '', commandChild = [] }) {
  collectList.push({ command, commandChild });
}

module.exports = {
  installCommand,
  collectCommand,
};
