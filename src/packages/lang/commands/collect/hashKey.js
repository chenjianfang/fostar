const hashString = require('hash-string'); // 针对每一个英文单词做相关运算，每次运算会得到一个新的hash值

const hashKey = (value) => `k_${`0000${hashString(value.replace(/\s+/g, '')).toString(36)}`.slice(-7)}`;

module.exports = hashKey;
