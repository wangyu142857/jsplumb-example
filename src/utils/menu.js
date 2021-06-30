export default [
  {
    title: '首页',
    name: 'Home',
    path: '/',
    icon: 'fa-home',
  },
  {
    title: '官方demo',
    name: 'BaseDemo',
    path: '/base-demo',
    icon: 'fa-eercast',
    children: [
      {
        title: 'FlowChart',
        name: 'FlowChart',
        path: '/base-demo/flow-chart',
      },
      {
        title: 'Hierarchical Chart',
        name: 'HierarchicalChart',
        path: '/base-demo/chart',
      },
      {
        title: 'state machine',
        name: 'StateMachine',
        path: '/base-demo/state-machine',
      },
      {
        title: 'perimeter anchors',
        name: 'PerimeterAnchors',
        path: '/base-demo/perimeter-anchors',
      },
      {
        title: 'drag and drop',
        name: 'DragAndDrop',
        path: '/base-demo/drag-and-drop',
      },
      {
        title: 'Dynamic anchors',
        name: 'DynamicAnchors',
        path: '/base-demo/dynamic-anchors',
      },
      {
        title: 'groups',
        name: 'Groups',
        path: '/base-demo/groups',
      },
      {
        title: 'sources and targets',
        name: 'SourcesAndTargets',
        path: '/base-demo/sources-and-targets',
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
