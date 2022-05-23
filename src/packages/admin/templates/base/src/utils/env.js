/**
 * 获取当前端环境，development/test/production
 * @returns {string}
 */
function getEnv() {
  const { host } = location;
  let env = 'development';
  if (host === 'test.opcenter.woa.com') {
    env = 'test';
  } else if (host === 'opcenter.woa.com') {
    env = 'production';
  }
  return env;
}

export default getEnv;
