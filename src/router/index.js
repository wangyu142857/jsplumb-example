import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import DemoDrag from '@/views/DemoDrag'

// official-demos
import routeOfficial from './route-official'
// my-demos
import routeDemos from './route-demo'

// DragToWorkplace
import DragToWorkplace from '@/views/DragToWorkplace'
import DemoChart from '@/views/DemoChart'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // official-demos
    ...routeOfficial,
    // my-demos
    ...routeDemos,
    // demos
    {
      path: '/drag-to-workplace',
      name: 'DragToWorkplace',
      component: DragToWorkplace
    },
    {
      path: '/demo-chart',
      name: 'DemoChart',
      component: DemoChart,
      /* children: [
        {
          path:''
        }
      ] */
    }
    
  ]
})
