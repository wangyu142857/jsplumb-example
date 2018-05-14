import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import DemoDrag from '@/views/DemoDrag'
// official-demos
import Chart from '@/views/official-demos/Chart'
import FlowChart from '@/views/official-demos/FlowChart'
import StateMachine from '@/views/official-demos/StateMachine'

// my-demos
import MyHello from '@/views/my-demos/MyHello'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // official-demos
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/flow-chart',
      name: 'FlowChart',
      component: FlowChart
    },
    {
      path: '/state-machine',
      name: 'StateMachine',
      component: StateMachine
    },
    // my-demos
    {
      path: '/my-hello',
      name: 'MyHello',
      component: MyHello
    }
  ]
})
