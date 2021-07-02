import { createRouter, createWebHashHistory } from 'vue-router';

import routeOfficial from './route-official'; // official-demos

// import.meta.globEager 替换 webpack require.context
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/layout',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/layout',
          component: () => import('@/views/HelloWorld.vue'),
        },
        ...routeOfficial,
        // {
        //   path: '/layout/demos/drag-to-workplace',
        //   name: 'DragToWorkplace',
        //   component: () => import('@/views/DragToWorkplace.vue'),
        // },
        // {
        //   path: '/layout/demos/demo-chart',
        //   name: 'DemoChart',
        //   component: () => import('@/views/DemoChart.vue'),
        // },
      ],
    },
  ],
});

export default router;
