module.exports = {
  lngs: [
    // 默认包含中文
    {
      lng: 'en',
      name: '英文',
    },
  ],
  ns: {
    home: {
      src: ['test/hello'],
    },
  },
  packFunction: '$t', // 用于包裹的函数，必须挂载在全局
  packReg: /[\u4e00-\u9fa5]+/, // 匹配中文
  extname: ['.js', '.jsx', '.ts', '.tsx'], // 后缀文件
  translateFunction: ['t', 'i18n.t', '$t'], // 翻译的函数。默认扫<Trans>组件
};
