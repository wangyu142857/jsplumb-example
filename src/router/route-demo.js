// my-demos
import MyHello from '@/views/my-demos/MyHello.vue';
import MyDrag from '@/views/my-demos/MyDrag.vue';
import MyOverlay from '@/views/my-demos/MyOverlay.vue';
import MySource from '@/views/my-demos/MySource.vue';
import MyGroups from '@/views/my-demos/MyGroups.vue';

const router = [{
  path: '/my-hello',
  name: 'MyHello',
  component: MyHello,
},
{
  path: '/my-drag',
  name: 'MyDrag',
  component: MyDrag,
},
{
  path: '/my-overlay',
  name: 'MyOverlay',
  component: MyOverlay,
},
{
  path: '/my-source',
  name: 'MySource',
  component: MySource,
},
{
  path: '/my-groups',
  name: 'MyGroups',
  component: MyGroups,
},
];
export default router;
