import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:user-cog',
      order: 1,
      title: $t('page.userManage.title'),
    },
    name: 'UserManage',
    path: '/userManage',
    children: [
      {
        name: 'UserList',
        path: '/userList',
        component: () => import('#/views/userManage/userList/index.vue'),
        meta: {
          title: $t('page.userManage.userList'),
        },
      },
      {
        name: 'RoleList',
        path: '/roleList',
        component: () => import('#/views/userManage/roleList/index.vue'),
        meta: {
          title: $t('page.userManage.roleList'),
        },
      },
    ],
  },
];

export default routes;
