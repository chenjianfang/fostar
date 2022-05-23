const fs = require('fs');
const path = require('path');
const os = require('os');
const { error } = require('logger');
const { TEMPLATES } = require('constants');

const stopDir = os.homedir();

function getTemplate(dir) {
  if (!dir) {
    return error('dir 必填');
  }

  const dirFile = fs.readdirSync(dir);

  if (dirFile.includes(TEMPLATES)) {
    return path.join(dir, TEMPLATES);
  }

  const currentDir = path.dirname(dir);

  if (currentDir === stopDir) {
    return null;
  }

  if (currentDir) {
    return getTemplate(currentDir);
  }
}

module.exports = getTemplate;
