var curlConfig = function ({
  title,
  url,
  columns,
  limit = 10
}) {
  return {
    title: title,
    body: [
      {
        type: 'crud',
        filter: {
          title: "",
          body: [
            {
              type: 'select',
              name: 'eventId',
              searchable: true,
              size: "sm",
              autoComplete: {
                url: '/backend-operation-event/queryEventList',
                method: 'post',
                data: {
                  eventName: '$term',
                  limit: "10",
                },
                adaptor(payload) {
                  payload.data = payload.data.list.map(({ eventName, eventId }) => {
                    return {
                      label: eventName,
                      value: eventId,
                    };
                  });
                  return payload;
                },
              },
            },
            {
              type: 'select',
              name: 'ecId',
              searchable: true,
              size: "sm",
              visibleOn: "Boolean(this.eventId)",
              source: {
                url: '/backend-operation-event/queryCommodityList?eventId=$eventId',
                method: 'post',
                data: {
                  eventId: "$eventId",
                  limit: 10,
                },
                adaptor(payload) {
                  payload.data = payload.data.list.map(({ ecId, couponInfo }) => {
                    return {
                      label: couponInfo.title,
                      value: ecId,
                    };
                  });
                  return payload;
                },
              },
            },
            {
              type: 'input-text',
              name: 'uin',
              placeholder: 'uin',
              size: "sm",
            },
            {
              label: '查询',
              type: "button",
              actionType: 'submit',
              level: 'primary',
            }
          ],
          submitText: '',
        },
        defaultParams: {
          perPage: 10,
        },
        api: {
          url: url,
          method: 'post',
          data: {
            eventId: '$eventId',
            ecId: '$ecId',
            uin: '$uin',
            needCount: true,
            page: "${page}",
            limit: limit
          },
          requestAdaptor(req) {
            req.data.offset = (req.data.page - 1) * req.data.limit;
            return req;
          },
          adaptor(payload) {
            payload.data.rows = payload.data.list;
            payload.data.hasNext = Boolean(payload.data.list.length);
            payload.data.total = payload.data.count;
            return payload;
          },
        },
        footerToolbar: [
          "pagination",
          {
            type: 'tpl',
            tpl: "总共${total}条数据"
          }
        ],
        columns: columns
      },
    ]
  }
}
window.amisSchema = {
  type: 'page',
  data: {
    couponStatus: {
      0: '初始化',
      10: '下发中',
      20: '下发中',
      30: '下发成功',
      40: '下发失败',
    }
  },
  body: [
    {
      type: "tabs",
      tabs: [
        curlConfig({
          title: '领取成功流水',
          url:'/backend-operation-event/queryRecordInfos',
          limit: 5,
          columns: [
            {
              label: 'uin',
              name: 'uin'
            },
            {
              label: '账号类型',
              name: 'regInfo.userType'
            },
            {
              label: '注册地',
              name: 'regInfo.area'
            },
            {
              label: '活动名称',
              name: 'eventName'
            },
            {
              label: '活动ID',
              name: 'eventId'
            },
            {
              label: '资源名称',
              name: 'commodityName'
            },
            {
              label: '资源ID',
              name: 'ecId'
            },
            {
              label: '状态',
              type: 'tpl',
              tpl: "<%= data.couponStatus[data.status] %>"
            },
            {
              label: '领取时间',
              name: 'ctime'
            },
          ]
        }),
        curlConfig({
          title: '领取失败流水',
          url:'/backend-operation-event/queryUserLogInfos',
          limit: 20,
          columns: [
            {
              label: 'uin',
              name: 'uin'
            },
            {
              label: '活动名称',
              name: 'eventName'
            },
            {
              label: '活动ID',
              name: 'eventId'
            },
            {
              label: '资源名称',
              name: 'commodityName'
            },
            {
              label: '资源ID',
              name: 'ecId'
            },
            {
              label: '领取时间',
              name: 'ctime'
            },
            {
              label: '失败原因',
              name: 'errMsg'
            },
            {
              label: '错误码',
              name: 'errCode'
            },
          ]
        }),
      ]
    }
  ],
};
