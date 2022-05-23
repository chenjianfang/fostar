// 根据环境变量判断是否需要开启代理
const noProxy = process.env.NO_PROXY === 'true';
const user = require('./user');
const chart = require('./chart');
const auth = require('./auth');
const activityEvent = require('./activityEvent');

const proxy = {
  'GET /mock/global/logininfo': user.login,
  'GET /mock/intl/auth/check': user.auths,

  'GET /mock/intl/app/list': auth.appList,
  'POST /mock/intl/app/add': auth.result,
  'POST /mock/intl/app/update': auth.result,
  'POST /mock/intl/app/delete': auth.result,

  'GET /mock/intl/auth/list': auth.authList,
  'POST /mock/intl/auth/add': auth.result,
  'POST /mock/intl/auth/update': auth.result,
  'POST /mock/intl/auth/delete': auth.result,

  'GET /mock/intl/auth/find_user': auth.userAuthList,
  'POST /mock/intl/auth/add_user': auth.result,
  'POST /mock/intl/auth/delete_user': auth.result,

  'GET /mock/chart/bar': chart.barChart,
  'GET /mock/chart/pie': chart.pieChart,
  'GET /mock/chart/radar': chart.radarChart,
  'GET /mock/chart/line': chart.lineChart,
  'GET /mock/chart/miniArea': chart.miniAreaChart,
  'GET /mock/chart/series': chart.seriesChart,

  // 活动列表查询
  'POST /mock/queryEventList': activityEvent.queryEventList,
  'POST /mock/queryEvent': activityEvent.queryEvent,
  'POST /mock/queryCommodityList': activityEvent.queryCommodityList,
  'POST /mock/createEvent': activityEvent.createEvent,
  'POST /mock/applyEvent': activityEvent.applyEvent,
  'POST /mock/offlineEvent': activityEvent.offlineEvent,
  'POST /mock/batchApplyOnlineCommodity': activityEvent.batchApplyOnlineCommodity,
  'POST /mock/offlineCommodity': activityEvent.offlineCommodity,
};

module.exports = noProxy ? {} : proxy;
