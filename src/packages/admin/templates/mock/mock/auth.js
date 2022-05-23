const Mock = require('mockjs');

module.exports = {
  appList: (req, res) => {
    res.send(Mock.mock({
      code: 0,
      msg: 'success',
      data: {
        'count|1-100': 1,
        'rows|1-20': [
          {
            'id|+1': 1,
            name: '@ctitle',
            url: '@url',
            icon: '',
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
