// official-demos
import FlowChart from '@/views/official-demos/FlowChart'
import Chart from '@/views/official-demos/Chart'
import StateMachine from '@/views/official-demos/StateMachine'
import PerimeterAnchors from '@/views/official-demos/PerimeterAnchors'
import DragAndDrop from '@/views/official-demos/DragAndDrop'
import DynamicAnchors from '@/views/official-demos/DynamicAnchors'
import Groups from '@/views/official-demos/Groups'
import SourcesAndTargets from '@/views/official-demos/SourcesAndTargets'

let router = [{
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
  {
    path: '/perimeter-anchors',
    name: 'PerimeterAnchors',
    component: PerimeterAnchors
  },
  {
    path: '/drag-and-drop',
    name: 'DragAndDrop',
    component: DragAndDrop
  },
  {
    path: '/dynamic-anchors',
    name: 'DynamicAnchors',
    component: DynamicAnchors
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups
  },
  {
    path: '/sources-and-targets',
    name: 'SourcesAndTargets',
    component: SourcesAndTargets
  },
]

export default router
