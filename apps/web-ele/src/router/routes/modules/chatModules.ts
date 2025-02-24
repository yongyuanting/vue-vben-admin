import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:chart-area',
      order: 3,
      title: $t('page.analysis.title'),
    },
    name: 'Analysis',
    path: '/analysis',
    children: [
      {
        name: 'AnalysisResult',
        path: '/analysisResult',
        component: () => import('#/views/analysis/analysisResult/index.vue'),
        meta: {
          title: $t('page.analysis.analysisResult'),
        },
      },
      {
        name: 'AnalysisModel',
        path: '/analysisModel',
        component: () => import('#/views/analysis/analysisModel/index.vue'),
        meta: {
          title: $t('page.analysis.analysisModel'),
        },
      },
    ],
  },
];

export default routes;
