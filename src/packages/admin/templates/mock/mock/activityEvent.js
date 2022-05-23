const Mock = require('mockjs');

module.exports = {
  queryEventList: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
      'data|1-20': [
        {
          applyStatus: 0,
          beginTime: '20210920',
          creator: 'lockjfchen',
          endTime: '20210928',
          eventId: '123',
          eventName: '活动1',
          eventType: 10,
          focus: 'lockjfchen',
          latestApplyId: 'string',
          paperwork:
              '超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容',
          status: 0,
          url: 'https://intl.cloud.tencent.com/',
          userLimitNum: 0,
        },
      ],
    }));
  },

  queryEvent: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
      data: {
        applyStatus: 0,
        beginTime: '20210920',
        creator: 'lockjfchen',
        endTime: '20210928',
        eventId: '123',
        eventName: '活动1',
        eventType: 10,
        focus: 'lockjfchen',
        latestApplyId: 'string',
        paperwork:
            '超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容超长的文案内容',
        status: 0,
        url: 'https://intl.cloud.tencent.com/',
        userLimitNum: 0,
      },
    }));
  },

  queryCommodityList: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
      'data|1-20': [
        {
          applyStatus: 0,
          commodityId: 'string',
          commodityType: 0,
          couponInfo: {
            'amount|1-100': 1,
            'couponId|1-100': 1,
            index: 0,
            minAmountLimit: 0,
            payMode: 0,
            payScene: 'string',
            title: '代金券名称1',
            useBeginTime: '20210910',
            useEndTime: '20210912',
            useTimeType: 'string',
            useTimeUnit: 'string',
            useTimeValue: 'string',
          },
          'drawNum|1-100': 1,
          'ecId|1-100': 1,
          eventId: 'string',
          latestApplyId: 'string',
          ruleId: 'string',
          ruleInfos: [
            {
              index: 0,
              ruleId: '123',
              ruleType: 'account',
              ruleValue: [
                {
                  ruleCase: 'newRegUser',
                  ruleParam: {
                    option: '20210910',
                  },
                },
                {
                  ruleCase: 'userType',
                  ruleParam: {
                    option: 'personal',
                  },
                },
                {
                  ruleCase: 'agentUser',
                  ruleParam: {
                    option: 'notAgent',
                  },
                },
                {
                  ruleCase: 'agentClientUser',
                  ruleParam: {
                    option: 'notAgentClient',
                  },
                },
                {
                  ruleCase: 'cooperator',
                  ruleParam: {
                    option: 'notCooperator',
                  },
                },
                {
                  ruleCase: 'authInfo',
                  ruleParam: {
                    option: 'authed',
                  },
                },
              ],
            },
          ],
          status: 0,
          'totalNum|1-100': 1,
          userLimitNum: 0,
        },
      ],
    }));
  },

  createEvent: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
    }));
  },

  applyEvent: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
    }));
  },

  offlineEvent: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
    }));
  },

  batchApplyOnlineCommodity: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
    }));
  },

  offlineCommodity: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
    }));
  },

  authList: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
      data: {
        'count|1-100': 1,
        'rows|1-20': [
          {
            'id|+1': 1,
            'app_id|+1': 1,
            name: '@ctitle',
            auth_key: '@ctitle',
            comment: '@cparagraph',
            type: 'public',
            status: 1,
            create_at: '2018-10-31T09:08:27.000Z',
            update_at: '2018-10-31T09:08:27.000Z',
            create_by: 'kidzhao',
            update_by: 'kidzhao',
          },
        ],
      },
    }));
  },

  userAuthList: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
      data: {
        'count|1-100': 1,
        'rows|1-20': [
          {
            'id|+1': 1,
            'auth_id|+1': 1,
            user_id: '@name',
            status: 1,
            create_at: '2018-10-31T09:08:27.000Z',
            update_at: '2018-10-31T09:08:27.000Z',
            create_by: 'kidzhao',
            update_by: 'kidzhao',
          },
        ],
      },
    }));
  },

  result: (req, res) => {
    res.send(Mock.mock({
      'code|-1-0': 0,
      msg: '@title',
      data: {},
    }));
  },
};
