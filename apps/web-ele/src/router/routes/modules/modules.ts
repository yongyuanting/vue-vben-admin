import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:puzzle',
      order: 4,
      title: $t('page.modulesManage.title'),
    },
    name: 'ModulesManage',
    path: '/modulesManage',
    children: [
      {
        name: 'ModulesList',
        path: '/modulesList',
        component: () => import('#/views/modulesManage/modulesList/index.vue'),
        meta: {
          title: $t('page.modulesManage.modulesList'),
        },
      },
      {
        name: 'ModulesUpload',
        path: '/modulesUpload',
        component: () =>
          import('#/views/modulesManage/modulesUpload/index.vue'),
        meta: {
          title: $t('page.modulesManage.modulesUpload'),
        },
      },
    ],
  },
];

export default routes;
