/**
 * 我们为了统一方便的管理路由和页面的关系，将配置信息统一抽离到 common/nav.js 下，同时应用动态路由
 */

import dynamic from 'dva/dynamic';

// dynamic包装 函数
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页',
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '网络功能',
            path: 'sf',
            component: dynamicWrapper(app, [], () => import('../routes/Dashboard/SF')),
          },
          {
            name: '网络服务功能链',
            path: 'sfc',
            component: dynamicWrapper(app, [], () => import('../routes/Dashboard/SFC')),
          },
          {
            name: '工作主机',
            path: 'workplace',
            component: dynamicWrapper(app, [], () => import('../routes/Dashboard/Workplace')),
          },
          {
            name: '添加SFC',
            path: 'addSFC',
            component: dynamicWrapper(app, [], () => import('../routes/Dashboard/addSFC')),
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '账户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
        ],
      },
    ],
  },
];
