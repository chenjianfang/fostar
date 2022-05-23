import { LANG, LANGUAGE_DEFAULT, NAMESPACE_DEFAULT } from 'common/constants/lang';
import hashString from 'hash-string';
import i18n from 'i18next';
import Cookies from 'js-cookie';

// 计算hash，和cms动态多语言保持一致
const hashKey = (value) => {
  if (!value) {
    return '';
  }
  return `k_${`0000${hashString(value.replace(/\s+/g, '')).toString(36)}`.slice(-7)}`;
};

// 当前语言
const lang = Cookies.get(LANG) || LANGUAGE_DEFAULT;

i18n.init({
  fallbackLng: LANGUAGE_DEFAULT,
  lng: lang,
  ns: [NAMESPACE_DEFAULT],
  defaultNS: NAMESPACE_DEFAULT,
  interpolation: {
    escapeValue: false,
  },
  react: {
    hashTransKey: hashKey,
  },
});

const $t = (sentence) => {
  const key = hashKey(sentence);
  return i18n.t(key, {
    defaultValue: sentence,
  });
};

window.$t = $t;

export { i18n, lang };
