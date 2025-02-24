import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:database',
      order: 2,
      title: $t('page.dataManage.title'),
    },
    name: 'DataManage',
    path: '/dataManage',
    children: [
      {
        name: 'DataList',
        path: '/dataList',
        component: () => import('#/views/dataManage/dataList/index.vue'),
        meta: {
          title: $t('page.dataManage.dataList'),
        },
      },
      {
        name: 'DataStatistics',
        path: '/dataStatistics',
        component: () => import('#/views/dataManage/dataStatistics/index.vue'),
        meta: {
          title: $t('page.dataManage.dataStatistics'),
        },
      },
    ],
  },
];

export default routes;
