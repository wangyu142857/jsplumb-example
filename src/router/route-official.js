// official-demos
import FlowChart from '@/views/official-demos/FlowChart.vue';
import Chart from '@/views/official-demos/Chart.vue';
import StateMachine from '@/views/official-demos/StateMachine.vue';
import PerimeterAnchors from '@/views/official-demos/PerimeterAnchors.vue';
import DragAndDrop from '@/views/official-demos/DragAndDrop.vue';
import DynamicAnchors from '@/views/official-demos/DynamicAnchors.vue';
import Groups from '@/views/official-demos/Groups.vue';
import SourcesAndTargets from '@/views/official-demos/SourcesAndTargets.vue';

const base = '/layout/official-demo/';

const router = [
  {
    path: `${base}chart`,
    name: 'Chart',
    component: Chart,
  },
  {
    path: `${base}flow-chart`,
    name: 'FlowChart',
    component: FlowChart,
  },
  {
    path: `${base}state-machine`,
    name: 'StateMachine',
    component: StateMachine,
  },
  {
    path: `${base}perimeter-anchors`,
    name: 'PerimeterAnchors',
    component: PerimeterAnchors,
  },
  {
    path: `${base}drag-and-drop`,
    name: 'DragAndDrop',
    component: DragAndDrop,
  },
  {
    path: `${base}dynamic-anchors`,
    name: 'DynamicAnchors',
    component: DynamicAnchors,
  },
  {
    path: `${base}groups`,
    name: 'Groups',
    component: Groups,
  },
  {
    path: `${base}sources-and-targets`,
    name: 'SourcesAndTargets',
    component: SourcesAndTargets,
  },
];

export default router;
