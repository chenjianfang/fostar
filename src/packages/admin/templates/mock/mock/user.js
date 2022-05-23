module.exports = {
  login: {
    code: 0,
    data: {
      user: 'intl_mock',
      login: true,
    },
  },

  auths: {
    code: 0,
    msg: 'success',
    data: [
      {
        id: 1,
        name: '访问监控页',
        auth_key: '/monitor',
        app_id: 2,
      },
      {
        id: 2,
        name: '访问基础表单页',
        auth_key: '/basic-form',
        app_id: 2,
      },
      {
        id: 4,
        name: '访问代办列表页',
        auth_key: '/todo-list',
        app_id: 2,
      },
      {
        id: 5,
        name: '提交基础表单',
        auth_key: '/basic-form/submit',
        app_id: 2,
      },
      {
        id: 6,
        name: '搜索基础表单',
        auth_key: '/basic-form/search',
        app_id: 2,
      },
    ],
  },

  account: (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json({
        status: 'ok',
        code: 0,
        token: 'sdfsdfsdfdsf',
        data: {
          id: 1,
          username: 'kenny',
          sex: 6,
        },
      });
    }
    return res.status(403).json({
      status: 'error',
      code: 403,
    });
  },
};
