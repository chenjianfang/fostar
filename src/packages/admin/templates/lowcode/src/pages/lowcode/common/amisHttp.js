import Cookies from 'js-cookie';
import getEnv from 'utils/env';

const operator = Cookies.get('oa_nickname');
const env = getEnv();
const { axios } = window;

// 区分环境host
let baseURL;
if (env === 'development') {
  baseURL = '//dev.api.qcintl.woa.com';
} else if (env === 'test') {
  baseURL = '//test.api.qcintl.woa.com';
} else {
  baseURL = '//api.qcintl.woa.com';
}

// amis需要有响应字段status
const modifyResponseData = (res) => {
  res.data.status = res.data.code;
  return res;
};

const fetcher = function ({
  url, // 接口地址
  method, // 请求方法 get、post、put、delete
  data, // 请求数据
  responseType,
  config = {}, // 其他配置
  headers, // 请求头
}) {
  // 操作人
  data.operator = operator;

  config.withCredentials = true;
  config.baseURL = baseURL;
  responseType && (config.responseType = responseType);

  if (config.cancelExecutor) {
    config.cancelToken = new axios.CancelToken(config.cancelExecutor);
  }

  config.headers = headers || {};

  if (method !== 'post' && method !== 'put' && method !== 'patch') {
    if (data) {
      config.params = data;
    }

    return axios[method](url, config).then((data) => {
      return modifyResponseData(data);
    });
  }
  if (data && data instanceof FormData) {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'multipart/form-data';
  } else if (data && typeof data !== 'string' && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
    data = JSON.stringify(data);
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
  }

  return axios[method](url, data, config).then((data) => {
    return modifyResponseData(data);
  });
};

const isCancel = (value) => axios.isCancel(value);

export { fetcher, isCancel };
