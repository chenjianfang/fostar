const fs = require('fs');
const path = require('path');
const i18nScanner = require('i18next-scanner');
const map = require('map-stream');
const fse = require('fs-extra');
const vfs = require('vinyl-fs');
const sort = require('gulp-sort');
const xlsx = require('node-xlsx');
const getConfig = require('utils/getConfig');
const cwd = require('utils/cwd');
const { info } = require('logger');
const hashKey = require('./hashKey');

const lngsList = ['zh']; // 语言标识列表
const lngsName = ['中文']; // 语言名称
let extname = []; // 后缀文件
let translateFunction = []; // i18n函数

let scannedFileCount = 0;

/**
 * 扫描源码中的词条，合并到词条文件中
 */
const run = (namespace, srcList) => {
  return new Promise((resolve, reject) => {
    vfs
      .src(srcList, { cwd })
      // 对文件进行排序，保证词条有一定的顺序
      .pipe(sort())

      // 每个文件扫描前，统计文件数量
      // @ts-ignore
      .pipe(map((file, cb) => {
        scannedFileCount += 1;
        cb(null, file);
      }))

      // 扫描词条
      .pipe(scanner(namespace))

      // 创建词条文件
      .pipe(map(writer(namespace)))

      // 写入词条文件
      .pipe(vfs.dest(cwd))
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', () => {
        info(`Scanned ${scannedFileCount + 1} files.`);
        resolve();
      });
  });
};

/**
 * 扫描词条
 */
function scanner(ns) {
  const options = {
    lngs: lngsList,
    ns: [ns],
    defaultLng: 'en',
    defaultNs: ns,
    resource: {
      savePath: 'i18n/{{ns}}/locale/{{lng}}',
    },
  };
  /**
   * @param {import('vinyl')} file
   * @param {string} encoding
   * @param {Function} done
   */
  function transform(file, encoding, done) {
    const { parser } = this;
    const fileExtname = path.extname(file.path);

    // 只扫描源码文件
    if (!extname.includes(fileExtname)) {
      return done();
    }

    const content = file.contents.toString();

    parser.parseFuncFromString(content, { list: translateFunction }, (sentence, options) => {
      const key = hashKey(sentence);
      options.defaultValue = sentence;
      parser.set(key, options);
    });

    parser.parseTransFromString(content, (transKey, options) => {
      let sentence = options.defaultValue;
      // 直接包围插值的 <Tag> 要去掉，以匹配 i18next 的结果
      // @see https://github.com/i18next/react-i18next/blob/master/CHANGELOG.md#800
      sentence = sentence.replace(/<(\d+)>{{(\w+)}}<\/\1>/g, '{{$2}}');
      sentence = sentence.replace(/\s+/g, ' ');
      transKey = transKey || hashKey(sentence);
      options.defaultValue = sentence;

      parser.set(transKey, options);
    });
    done();
  }

  return i18nScanner.createStream(options, transform);
}

/**
 * 更新词条
 * @param {string} namespace
 */
function writer(namespace) {
  /**
   *
   * @param {import('vinyl')} file
   * @param {Function} cb
   */
  const write = (file, cb) => {
    // 文件名就是对应语言
    const lng = file.basename;

    // 词条扫描结果
    const scanResult = JSON.parse(file.contents.toString('utf8'));

    // 遍历扫描结果
    const xlsxKeyData = [['标记词条', ...lngsName]];
    for (const [, resource] of Object.entries(scanResult)) {
      !!resource && xlsxKeyData.push([resource, resource]);
    }

    // 写入excel
    if (lng === 'zh') {
      const buffer = xlsx.build([{ name: 'Sheet1', data: xlsxKeyData }]);
      if (!fs.existsSync(`${cwd}/i18nXlsx`)) {
        fs.mkdirSync(`${cwd}/i18nXlsx`);
      }
      fs.writeFileSync(`${cwd}/i18nXlsx/${namespace}.xlsx`, buffer);
    }

    fse.outputJson(path.join(cwd, `i18n/${namespace}/${lng}.json`), scanResult, {
      spaces: 2,
    });

    cb(null);
  };
  return write;
}

async function collect() {
  const { config } = getConfig('lang');
  const { lngs, ns } = config;
  extname = config.extname;
  translateFunction = config.translateFunction;

  lngs.forEach(({ lng, name }) => {
    lngsList.push(lng);
    lngsName.push(name);
  });

  const allTask = Object.entries(ns).map(([key, nsValue]) => {
    info(`正在处理命名空间为 "${key}" 的词条文件`);
    const srcList = nsValue.src.map((item) => `${item}/**/*{${extname.join(',')}}`);
    return run(key, srcList);
  });
  await Promise.all(allTask);
}

module.exports = collect;
