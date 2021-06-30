import { createRouter, createWebHashHistory } from 'vue-router';
// official-demos
// import routeOfficial from './route-official';
// my-demos
// import routeDemos from './route-demo';

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
      ],
    },
  ],
});

export default router;

// // DragToWorkplace
// import DragToWorkplace from '@/views/DragToWorkplace'
// import DemoChart from '@/views/DemoChart'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     },
//     // official-demos
//     ...routeOfficial,
//     // my-demos
//     ...routeDemos,
//     // demos
//     {
//       path: '/drag-to-workplace',
//       name: 'DragToWorkplace',
//       component: DragToWorkplace
//     },
//     {
//       path: '/demo-chart',
//       name: 'DemoChart',
//       component: DemoChart,
//       /* children: [
//         {
//           path:''
//         }
//       ] */
//     }

//   ]
// })
