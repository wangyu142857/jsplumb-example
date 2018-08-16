## 基本概念
### 介绍
- Anchor - 锚点。一个位置，相对于元素的原点、终点存在。 向各种jsPlumb函数提供提示，并根据需要创建它们。他们没有视觉表现; 他们只是一个```合乎逻辑```的位置。可以通过名称引用锚，对于jsPlumb附带的Anchors或包含各种参数的数组，可以进行更好的控制。```不要自己创造锚点```
- Endpoint - 端点。可以创建这些元素并将它们附加到元素上，需要执行这些元素才能支持```drag drop```操作，或者让jsPlumb在创建```Connection``` ```jsPlumb.connect(...)```时创建它们。可以将它们作为参数传递给两个端点```jsPlumb.connect(...)```
- Connector - 连接器。连接页面中两个元素的直线的直观表示。jsPlumb有四种类型的默认值可供选择 - ``` a Bezier curve, a straight line, 'flowchart' connectors and 'state machine' connectors```贝塞尔曲线，直线，折线和'状态机'连接器。使用时只需要定义即可。
- Overlay - 覆盖。用于装饰连接器的UI组件，例如标签，箭头等。
- Group - 组。包含在某个其他元素中的一组元素，可以将其折叠，从而导致与所有组成员的连接被集中到折叠的组容器中。
---
> 无论何时你需要定义一个Connector，Endpoint，Anchor或Overlay，你都必须使用它的“定义”，而不是直接构造一个。
全部四种定义示例
```
var common = {
    cssClass:"myCssClass"
};
jsPlumb.connect({
  source:"someDiv",
  target:"someOtherDiv",
  anchor:[ "Continuous", { faces:["top","bottom"] }],
  endpoint:[ "Dot", { radius:5, hoverClass:"myEndpointHover" }, common ],
  connector:[ "Bezier", { curviness:100 }, common ],
  overlays: [
        [ "Arrow", { foldback:0.2 }, common ],
        [ "Label", { cssClass:"labelClass" } ]  
    ]
});
```
## Anchor - 锚点
### 静态锚
jsPlumb有九个默认锚点位置，可用于指定连接器连接到元素的位置：这些元素是元素的四个角点，元素的中心和元素每个边缘的中点
- Top（也作为别名TopCenter）
- TopRight
- Right（也作为别名RightMiddle）
- BottomRight
- Bottom（也作为别名BottomCenter）
- BottomLeft
- Left（也作为别名LeftMiddle）
- TopLeft
- Center  

每个这些字符串表示的仅仅是围绕着底层基于阵列的语法的包装 [x, y, dx, dy]。其中，x和y是在间隔坐标[0,1]指定锚的位置，并且dx和dy，其指定曲线入射的定向至锚定，可具有一个值为0,1或-1。一下两种方式均表示向下连接：
```
jsPlumb.connect({...., anchor:"Bottom", ... });
jsPlumb.connect({...., anchor:[ 0.5, 1, 0, 1 ], ... });
```
除了提供锚点的位置和方向之外，还可以选择提供另外两个参数，这些参数用于定义距给定位置的像素偏移量。这是上面指定的锚点，但是在y轴的元素下方有一个50像素的偏移量：
```
jsPlumb.connect({...., anchor:[ 0.5, 1, 0, 1, 0, 50 ], ... }); 
```
### 动态锚
这些锚可以放置在多个位置之一，选择一个最适合的位置。
```
// 没有用于创建动态锚的特殊语法; 您只需提供一组单独的静态锚定规范，例如：
var dynamicAnchors = [ [ 0.2, 0, 0, -1 ],  [ 1, 0.2, 1, 0 ], [ 0.8, 1, 0, 1 ], [ 0, 0.8, -1, 0 ] ];
jsPlumb.connect({...., anchor:dynamicAnchors, ... });

// 请注意，您可以混合使用这些单独的静态锚定规范的类型：
var dynamicAnchors = [ [ 0.2, 0, 0, -1 ],  [ 1, 0.2, 1, 0 ], "Top", "Bottom" ];
jsPlumb.connect({...., anchor:dynamicAnchors, ... });

// jsPlumb提供了一个默认动态锚AutoDefault，从Top，Right，Bottom和Left中选择
jsPlumb.connect({...., anchor:"AutoDefault", ... });
```
### 周长锚
这些是动态锚的一种形式，锚定位置是从某个给定形状的周边中选择的。jsPlumb支持六种形状：
- Circle
- Ellipse
- Triangle
- Diamond
- Rectangle
- Square

默认60个锚点，可更改
```
jsPlumb.addEndpoint("someDiv", {
    endpoint:"Dot",
    anchor:[ "Perimeter", { shape:"Square", anchorCount:150 }]
});
```
旋转.`请注意，必须以度数而非弧度提供该值，并且该数字可以是正数也可以是负数。`
```
jsPlumb.connect({
    source:"someDiv",
    target:"someOtherDiv",
    endpoint:"Dot",
    anchors:[
        [ "Perimeter", { shape:"Triangle", rotation:25 } ],
        [ "Perimeter", { shape:"Triangle", rotation:-335 } ]
    ]
}); 
```
### 连续锚
这些锚点的位置由jsPlumb根据Connection中元素之间的方向计算，还有多少个其他连续锚点恰好共享该元素。您可以使用字符串语法来指定要使用连续锚点，您将使用该语法来指定默认静态锚点之一:
```
// 连接中指定
jsPlumb.connect({
    source:someDiv,
    target:someOtherDiv,
    anchor:"Continuous"
});
jsPlumb.connect({
  source:someDiv,
  target:someOtherDiv,
  anchors:["Bottom", "Continuous"]
});

// addEndpoint中指定
jsPlumb.addEndpoint(someDiv, {
  anchor:"Continuous",
  paintStyle:{ fill:"red" }
});

// makeSource/makeTarget 中指定
jsPlumb.makeSource(someDiv, {
  anchor:"Continuous",
  paintStyle:{ fill:"red" }
});

jsPlumb.makeTarget(someDiv, {
  anchor:"Continuous",
  paintStyle:{ fill:"red" }
});

// 默认值中指定
jsPlumb.Defaults.Anchor = "Continuous";
```
连续锚允许值,设置faces指定。允许值为： - top - left - right -bottom。如果为faces参数提供了一个空数组，jsPlumb将默认使用全部四个面。
```
jsPlumb.makeSource(someDiv, {
    anchor:["Continuous", { faces:[ "top", "left" ] } ]
});
```
### 关联css
默认前缀`endpointAnchorClass`，该值为`jtk-endpoint-anchor-`
```
var ep = jsPlumb.addEndpoint("someDiv", {
  anchor:[0.5, 0, 0, -1, 0, 0, "top" ]
};
```
然后，由jsPlumb创建的端点以及该元素someDiv将会为其分配这个类：`jtk-endpoint-anchor-top`.
> 如果您提供的类名由多个词组成，则jsPlumb不会在该类中的每个词语前加上前缀
```
var ep = jsPlumb.addEndpoint("someDiv", {
  anchor:[ 0.5, 0, 0, -1, 0, 0, "foo bar" ]
});
```
将导致2个类被添加到端点和元素`jtk-endpoint-anchor-foo`和`bar`  
更改前缀可用下列方法
```
jsPlumb.endpointAnchorClass = "anchor_";
```
或
```
var jp = jsPlumb.getInstance();
jp.endpointAnchorClass = "anchor_";
```
---
## Endpoint - 端点
- 创建方式
  - 当您调用jsPlumb.connect(..)并传递元素ID或DOM元素作为源/目标时，会创建并分配新的端点。
  - 当你调用jsPlumb.addEndpoint(...)一个新的端点被创建（并从调用返回）
  - 当您使用jsPlumb.makeSource(...)后续配置元素并随后从该元素拖动连接时，会创建并分配新的端点。
- 端点类型
  - Dot 点
    - radius
    - cssClass
    - hoverClass
  - Rectangle 矩形
    - width
    - height
    - cssClass
    - hoverClass
  - Image 图片
    - src
    - cssClass
    - hoverClass
  - Blank 空白不可见
---
## Connector - 连接器
- Bezier 
    - curviness 可选的; 默认值为150.弯曲度
- Straight 
    - stub 可选的; 默认值为0.
    - gap 可选的; 默认值为0.间隔
- Flowchart 
    - stub 这是从端点发出的初始线的最小长度（以像素为单位）。可选，可以是指定连接器每个端点的存根的整数，也可以是指定连接端点的两个整数数组。默认为一个值为30像素的整数
    - alwaysRespectStubs 可选，默认为false。
    - gap 可选的; 默认值为0.间隔
    - midpoint 可选，默认为0.5。长部分将被绘制的两个元素之间的距离
    - cornerRadius 可选的; 默认值为0.弯曲的角部分
- State Machine 
    - margin 可选的; 默认为5.定义连接器开始/结束元素的距离。
    - curviness 可选的; 默认值为150.弯曲度
    - proximityLimit 可选，默认值为80.连接器两端之间的最小距离将其绘制为直线而不是二次贝塞尔曲线。
---
## Overlay - 覆盖
- Overlays types 类型
  - Arrow 箭头
    - width
    - length
    - location
    - direction
    - foldback
    - paintStyle
  - Label 标签
    - label
    - cssClass
    - labelStyle
      - font
      - fill
      - color
      - padding
      - borderWidth
      - borderStyle
    - location  
  - PlainArrow 三角形
  - Diamond 菱形
  - Custom 自定义
- Position
  - 作为[0..1]范围内的小数，表示沿连接器刻出的路径的一定比例的行程量
  - 作为大于0的整数，表示从起点沿着连接器偏移的像素值
  - 作为小于0的整数，表示从终点点沿着连接器偏移的像素值
  - get/set
    - getLocation
    - setLocation
- Add 添加
  - jsPlumb.connect
  ```
    // 连接在它的一半处有一个箭头，并且标签“foo”的四分之一处
    jsPlumb.connect({
      ...
      overlays:[ 
        "Arrow", 
          [ "Label", { label:"foo", location:0.25, id:"myLabel" } ]
        ],
      ...
      });
  ```
  - jsPlumb.addEndpoint
  ```
    // 该连接将在连接的头部有一个10x30箭头，标签“foo”位于中间点。端点本身也有一个覆盖层，位于相对于端点顶部左角的[-0.5 *宽度，-0.5 *高度]
    jsPlumb.addEndpoint("someDiv", {
      ...
      overlays:[
        [ "Label", { label:"foo", id:"label", location:[-0.5, -0.5] } ]
      ],
      connectorOverlays:[ 
        [ "Arrow", { width:10, length:30, location:1, id:"arrow" } ],
        [ "Label", { label:"foo", id:"label" } ]
      ],
      ...
    });
  ```
  - jsPlumb.makeSource
  ```
    // 该连接将在连接的头部有一个10x30箭头，标签“foo”位于中间点。
    jsPlumb.makeSource("someDiv", {
      ...
      endpoint:{
        connectorOverlays:[ 
          [ "Arrow", { width:10, length:30, location:1, id:"arrow" } ], 
          [ "Label", { label:"foo", id:"label" } ]
        ]
      }
      ...
    });
  ```
- Hiding/Showing  
  您可以使用`setVisible`叠加层本身的方法或使用`showOverlay(id)`或`hideOverlay(id)`在连接上控制`overlay`的可见性。
- Removing  
  使用`removeOverlay`删除`overlay`
---
## group - 组
### Adding a Group 添加
```
jsPlumb.addGroup({
  el:"foo",
  id:"aGroup",
  collapsed:true // 折叠

});
```
这里我们创建了一个带ID的组aGroup。它的元素foo将会被拖放，并且它也将被配置为接受被拖放到它上面的元素。默认情况下，子元素可以在组元素之外拖动，但是如果它们没有被拖放到另一个组上，它们将在被拖动之前恢复到它们在组元素内的位置。
- Group element parameters 组元素参数
  - draggable 默认值为true
  - dragOptions 拖拽参数
    - filter 元素过滤
  - droppable  默认值为true
  - dropOptions  拖放参数
  - proxied  代理，默认值为true。代理子元素的连接
- Child element behaviour parameters 子元素参数
  - revert 恢复，默认值为true。  
  - prune 剪裁，默认值为false。如果为true，超出组元素外的空白子元素将删除，包括从实例中以及连接。  
  - orphan 孤立，默认值为false。如果为true，超出组元素外的空白子元素将删除，不包括从实例中删除。  
  - ghost 孤立，默认值为false。If true, a child element that is dragged outside of the Group element will have its original element left in place, and a 'ghost' element - a clone of the original - substituted, which tracks with the mouse. 
  - dropOverride  默认值为false。如果为true，则可以将子元素拖到Group元素之外（假设没有其他标志阻止），但可能不会将其放到其他组中。  
### Removing a Group 删除
```
jsPlumb.removeGroup("aGroup");
jsPlumb.removeGroup("aGroup", true); // 删除全部包括子元素
```
### Proxy Endpoints 代理端点
```
jsPlumb.addGroup({
    el:someElement,
    id:"aGroup",
    anchor:"TopLeft",
    endpoint:[ "Rectangle", { width:10, height:10 } ]
});
```
### methods
- addToGroup(group, el) 添加
- removeGromGroup(el) 移除 
- collapseGroup(group) 折叠
- expandGroup(group) 展开
- getGroup(ID) 检索
- getGroupFor(el/ID) 找出元素所属的组
- getMembers 获取组的成员
---
## Element Dragging 元素拖动
`基于Katavio.js插件`[https://github.com/jsplumb/katavorio](https://github.com/jsplumb/katavorio)

---
