// import loadable from '@loadable/component';
//
// // 菜单固定的是两级。用于antd展开和选中
// const menus = [
//   {
//     name: '首页',
//     children: [
//       {
//         name: 'Ant 页面',
//         path: '/',
//         component: loadable(() => import('../../pages/index')),
//         exact: true,
//       },
//
//       {
//         name: 'Ant 页面',
//         path: '/a',
//         component: loadable(() => import('../../pages/index')),
//         exact: true,
//         hidden: true, // 菜单项隐藏该页面
//       },
//     ],
//   },
//
//   {
//     name: '低代码页',
//     children: [
//       {
//         name: '低代码页',
//         path: '/lowcode/test',
//         component: loadable(() => import('../../pages/lowcode/index')),
//         exact: true,
//       },
//
//       {
//         name: '菜单隐藏',
//         path: '/lowcode/hidden',
//         hidden: true, // 菜单项隐藏该页面
//         component: loadable(() => import('../../pages/lowcode/index')),
//         exact: true,
//       },
//     ],
//   },
//   {
//     name: '低代码页',
//     children: [
//       { name: '低代码页', path: '/lowcode/test', component: loadable(() => import('../../pages/lowcode/index')) },
//     ],
//   },
// ];
//
// const combineMenus = [...menus];
//
// export default combineMenus;
