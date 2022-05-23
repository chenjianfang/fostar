const chalk = require('chalk');

const info = (msg) => {
  console.log(chalk.blue('ℹ'), chalk.blue(msg));
};

const error = (msg) => {
  console.log(chalk.red('✖'), chalk.red(msg));
};

const warning = (msg) => {
  console.log(chalk.yellow('⚠'), chalk.yellow(msg));
};

const success = (msg) => {
  console.log(chalk.green('✔'), chalk.green(msg));
};

module.exports = {
  info,
  error,
  warning,
  success,
};
