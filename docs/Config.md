## Configuring Defaults
jsPlumb附带的默认值存储在```jsPlumb.Defaults```Javascript对象中
### 覆盖默认值
1. 修改
```
jsPlumb.importDefaults({
  PaintStyle : {
    strokeWidth:13,
    stroke: 'rgba(200,0,0,0.5)'
  },
  DragOptions : { cursor: "crosshair" },
  Endpoints : [ [ "Dot", { radius:7 } ], [ "Dot", { radius:11 } ] ],
  EndpointStyles : [{ fill:"#225588" }, { fill:"#558822" }]
});
```
2. 设置默认值
```
jsPlumb.getInstance({
  PaintStyle : {
    strokeWidth:13,
    stroke: 'rgba(200,0,0,100)'
  },
  DragOptions : { cursor: "crosshair" },
  Endpoints : [ [ "Dot", { radius:7 } ], [ "Dot", { radius:11 } ] ],
  EndpointStyles : [
    { fill:"#225588" }, 
    { fill:"#558822" }
  ]
});
```
### 默认配置
```
Anchor : "BottomCenter",                            // 锚点
Anchors : [ null, null ],                           // default source and target Anchors for Connections.
ConnectionsDetachable   : true,                     // 连接是否响应鼠标
ConnectionOverlays  : [],                           // 连接器覆盖
Connector : "Bezier",                               // 连接器
Container : null,                                   // 容器
DoNotThrowErrors  : false,                          // 
DragOptions : { },                                  // 用于配置可拖动的任何元素的默认选项 jsPlumb.draggable
DropOptions : { },                                  // 用于配置任何目标端点的可放置行为的默认选项
Endpoint : "Dot",                                   // 默认的端点定义。无论何时添加端点或以其他方式创建端点，并且jsPlumb未被赋予任何明确的端点定义。
Endpoints : [ null, null ],                         // 默认源和目标端点定义 jsPlumb.connect
EndpointOverlays : [ ],                             // 每个端点的默认覆盖
EndpointStyle : { fill : "#456" },                  // 端点样式
EndpointStyles : [ null, null ],                    // 源和目标端点样式
EndpointHoverStyle : null,                          // 鼠标悬停端点样式
EndpointHoverStyles : [ null, null ],               // 鼠标悬停连接端点样式
HoverPaintStyle : null,                             // 悬停Connection的默认样式
LabelStyle : { color : "black" },                   // 已弃用
LogEnabled : false,                                 // 是否打开jsPlumb的内部日志记录
Overlays : [ ],                                     // 覆盖
MaxConnections : 1,                                 // 任何给定端点支持的默认最大连接数
PaintStyle : { strokeWidth : 8, stroke : "#456" },  // 连接器的默认样式
ReattachConnections : false,                        // 是否重新连接使用鼠标分离的连接，然后既不重新连接到其原始端点也不连接到其他端点
RenderMode : "svg",                                 // 渲染模式
Scope : "jsPlumb_DefaultScope"                      // 端点和连接的默认范围。范围提供了对哪些端点可以连接到哪些其他端点的基本控制。
```