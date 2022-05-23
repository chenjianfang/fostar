import { message } from 'antd';
import Cookies from 'js-cookie';
import getEnv from 'utils/env';
import getType from 'utils/getType';

let baseURL;
const env = getEnv();

if (env === 'development') {
  baseURL = '//dev.api.qcintl.woa.com';
} else if (env === 'test') {
  baseURL = '//test.api.qcintl.woa.com';
} else {
  baseURL = '//api.qcintl.woa.com';
}

const withCredentials = false;
const SERVER_ERROR = '服务器错误';
const operator = Cookies.get('oa_nickname');

async function request(options) {
  try {
    const { noCode, ...optionsExpand } = options;
    const {
      status,
      statusText,
      data = {},
    } = await window.axios({
      baseURL,
      withCredentials,
      ...optionsExpand,
    });

    if (status !== 200) {
      message.error(statusText);
      return null;
    }

    // 对某些不符合规范的响应特殊处理
    if (noCode) {
      return data;
    }

    if (isNaN(data.code)) {
      message.error(SERVER_ERROR);
      return null;
    }
    if (data.code !== 0) {
      message.error(data.msg || SERVER_ERROR);
      return null;
    }
    return data;
  } catch (err) {
    message.error(err.message);
    return null;
  }
}

function get(url, params = {}, options = {}) {
  return request({
    method: 'get',
    url,
    params: {
      ...params,
      operator,
    },
    ...options,
  });
}

function post(url, params = {}, options = {}) {
  let data;
  if (options.headers && options.headers['Content-Type'] === 'multipart/form-data' && getType(params) === 'FormData') {
    params.append('operator', operator);
    data = params;
  } else {
    data = {
      ...params,
      operator,
    };
  }
  return request({
    method: 'post',
    url,
    data,
    ...options,
  });
}

export { get, post };
