import loadable from '@loadable/component';

// 菜单固定的是两级。用于antd展开和选中
const menus = [
  {
    name: '首页',
    children: [
      {
        name: 'Ant 页面',
        path: '/',
        component: loadable(() => import('../../pages/index')),
        exact: true,
      },

      {
        name: 'Ant 页面',
        path: '/hidden',
        component: loadable(() => import('../../pages/index')),
        exact: true,
        hidden: true, // 菜单项隐藏该页面
      },
    ],
  },
];

const combineMenus = [...menus];

export default combineMenus;
