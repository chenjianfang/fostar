const { cosmiconfigSync } = require('cosmiconfig');
const cwd = require('utils/cwd');

function getConfig(name, searchFrom = cwd) {
  const explorerSync = cosmiconfigSync(name);
  const result = explorerSync.search(searchFrom);
  if (result) {
    return {
      config: result.config,
      filepath: result.filepath,
    };
  }
  return {
    config: null,
    filepath: null,
  };
}

module.exports = getConfig;
