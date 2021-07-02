export default [
  {
    title: '首页',
    name: 'Home',
    path: '/',
    icon: 'fa-home',
  },
  {
    title: '官方demo',
    name: 'OfficialDemo',
    path: '/official-demo',
    icon: 'fa-eercast',
    children: [
      {
        title: 'FlowChart',
        name: 'FlowChart',
        path: '/official-demo/flow-chart',
      },
      {
        title: 'Hierarchical Chart',
        name: 'HierarchicalChart',
        path: '/official-demo/chart',
      },
      {
        title: 'state machine',
        name: 'StateMachine',
        path: '/official-demo/state-machine',
      },
      {
        title: 'perimeter anchors',
        name: 'PerimeterAnchors',
        path: '/official-demo/perimeter-anchors',
      },
      {
        title: 'drag and drop',
        name: 'DragAndDrop',
        path: '/official-demo/drag-and-drop',
      },
      {
        title: 'Dynamic anchors',
        name: 'DynamicAnchors',
        path: '/official-demo/dynamic-anchors',
      },
      {
        title: 'groups',
        name: 'Groups',
        path: '/official-demo/groups',
      },
      {
        title: 'sources and targets',
        name: 'SourcesAndTargets',
        path: '/official-demo/sources-and-targets',
      },
    ],
  },
  {
    title: '示例',
    name: 'Demos',
    path: '/demos',
    icon: 'fa-space-shuttle',
    children: [
      {
        title: 'drag to workplace',
        name: 'DragToWorkplace',
        path: '/demos/drag-to-workplace',
      },
      {
        title: 'demo-chart',
        name: 'DemoChart',
        path: '/demos/demo-chart',
      },
    ],
  },
];
