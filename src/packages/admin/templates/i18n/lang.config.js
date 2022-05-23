module.exports = {
  lngs: [
    {
      lng: 'zh',
      name: '中文',
    },
    {
      lng: 'en',
      name: '英文',
    },
    {
      lng: 'jp',
      name: '日文',
    },
    {
      lng: 'ko',
      name: '韩文',
    },
    {
      lng: 'pt',
      name: '葡文',
    },
  ],
  ns: {
    home: {
      src: ['src/pages/home'],
    },
  },
  packReg: /[\u4e00-\u9fa5]+/, // 匹配中文
  extname: ['.js', '.jsx', '.ts', '.tsx'], // 后缀文件
  translateFunction: ['t', 'i18n.t', '$t'], // 翻译的函数。默认扫<Trans>组件
};
