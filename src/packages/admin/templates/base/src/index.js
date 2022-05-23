import 'antd/dist/antd.css';
import './index.css';

import { login } from 'admin-common';
import { message } from 'antd';
import { NAMESPACE_DEFAULT } from 'common/constants/lang';
import { i18n, lang } from 'i18n';
import { langId } from 'i18n/lang';
import { queryLanguage } from 'services/lang';
import getEnv from 'utils/env';
import loadScript from 'utils/loadScript';

const env = getEnv();

message.config({
  duration: 3,
  prefixCls: 'max_zIndex ant-message',
});

// 获取多语言
const getLanguage = async () => {
  try {
    const id = env === 'production' ? langId.prod : langId.test;
    const data = await queryLanguage({
      id,
      lang,
    });
    if (data) {
      await loadScript(data.data);
      i18n.addResourceBundle(lang, NAMESPACE_DEFAULT, window.INTL_CMS_PKGLANG[id], true, true);
    }
  } catch (err) {}
};

async function initApp() {
  // 检查登录
  login.checkLogin();

  // 获取多语言
  await getLanguage();

  await import('./App');
}

initApp();
