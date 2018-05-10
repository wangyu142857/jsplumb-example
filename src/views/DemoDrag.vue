<template>
  <div id="palette">
    <div id="modules">
      <ul>
        <li class="module item">元素1</li>
        <li class="module item">元素2</li>
        <li class="module item">元素3</li>
      </ul>
    </div>
    <div id="paletteArea"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    // 创建元素
    function addItem(parentId, nodeId, nodeLable, position) {
      var panel = $("#" + parentId);
      var div = $('<div class="drawedItem"></div>');
      div
        .css("width", "100px")
        .css("height", "50px")
        .css("line-height", "50px")
        .css("background", "#f3f8fe")
        .css("position", "absolute")
        .css("top", position.y)
        .css("left", position.x)
        .css("border", "1px solid #dcdfe6")
        .attr("align", "center")
        .attr("id", nodeId)
        .attr("node", true)
        .text(nodeLable);
      panel.append(div);
      return jsPlumb.getSelector("#" + nodeId)[0];
    }
    // 设置锚点
    function addPorts(instance, node, ports, type) {
      var number_of_ports = ports.length;
      var i = 0;
      var y_offset = 1 / (number_of_ports + 1);
      var y = 0;
      for (var i = 0; i < number_of_ports; i++) {
        var anchor = [0, 0, 0, 0];
        var paintStyle = { radius: 4, fillStyle: "#FF8891" };
        var isSource = false,
          isTarget = false;
        if (type === "output") {
          anchor[0] = 1;
          paintStyle.fillStyle = "#D4FFD6";
          isSource = true;
        } else {
          isTarget = true;
        }
        anchor[1] = y + y_offset;
        y = anchor[1];
        // 绑定点到node上
        instance.addEndpoint(node, {
          uuid: node.getAttribute("id") + "-" + ports[i],
          paintStyle: paintStyle,
          anchor: anchor,
          maxConnections: -1,
          isSource: isSource,
          isTarget: isTarget
        });
      }
    }
    jsPlumb.ready(function() {
      var color = "#37bfb8";
      var instance = jsPlumb.getInstance({
        Connector: [
          "Flowchart",
          { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }
        ],
        //拖动时鼠标停留在该元素上显示指针，通过css控制
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        //元素的默认颜色
        PaintStyle: { strokeStyle: color, lineWidth: 2 },
        //连接点的默认颜色
        EndpointStyle: { radius: 5, fillStyle: color },
        HoverPaintStyle: { strokeStyle: "#189992" },
        //连接点的默认颜色
        EndpointHoverStyle: { fillStyle: "#189992" },
        Container: "paletteArea",
        ConnectionOverlays: [
          //连接覆盖图
          [
            "Arrow",
            {
              location: 1,
              id: "arrow",
              length: 14,
              foldback: 1 //这些都是控制箭头的形状的(0.8)
            }
          ]
        ]
      });
      // 将模块拖入画板中
      $(".module").draggable({
        appendTo: "body",
        helper: "clone"
      });
      $("#paletteArea").droppable({
        drop: function(ev, ui) {
          if (ui.draggable.hasClass("item")) {
            ev.preventDefault();
            ev.stopPropagation();
            var mx = "" + ui.position.left + "px";
            var my = "" + ui.position.top + "px";
            var txt = ui.draggable.text();
            var uid = new Date().getTime();
            var node = addItem("paletteArea", "node" + uid, txt, {
              x: mx,
              y: my
            }); //向画板区域插入拖拽的图形
            addPorts(instance, node, ["out"], "output"); //插入 "出" 的锚点
            addPorts(instance, node, ["in1", "in2"], "input"); //插入 "进" 的锚点
            instance.draggable($(node));
          }
        }
      });
    });
  }
};
</script>
<style>

</style>


