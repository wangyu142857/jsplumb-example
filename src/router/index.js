import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import DemoDrag from '@/views/DemoDrag'
import Chart from '@/views/official-demos/Chart'
import FlowChart from '@/views/official-demos/FlowChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/flow-chart',
      name: 'FlowChart',
      component: FlowChart
    }
  ]
})
