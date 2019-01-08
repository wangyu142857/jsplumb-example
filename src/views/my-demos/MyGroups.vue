<template>
  <div class="jtk-demo demo-groups">
    <div id="workplace"
         class="workplace">
      <chart-node v-for="(item, idx) in chartData"
                  v-bind="item"
                  :key="idx"
                  @edit="editNode(item,idx)"></chart-node>
      <div class="group"
           id="group"
           group="firGroup">
        <div class="ep"></div>
      </div>
    </div>
  </div>
</template>
<script>
// components
import ChartNode from "@/components/ChartNode";

// data
import chartData from '../../json/group-demo.json'
export default {
  name: "Groups",
  data () {
    return {
      chartData,
      jsp: null
    };
  },
  mounted () {
    const _self = this
    this.$nextTick(() => {
      jsPlumb.ready(() => {
        let jsp = jsPlumb.getInstance({ // 初始化实例
          Endpoint: [
            "Blank",
            {
              cssClass: 'chart-dot',
              hoverClass: 'chart-dot-hover',
              radius: 5
            }
          ],
          Connector: "Straight",
          HoverPaintStyle: {
            'stroke': '#1e8151',
            'strokeWidth': 2
          },
          ConnectionOverlays: [
            [
              "Arrow",
              {
                location: 1,
                visible: true,
                width: 11,
                height: 11,
                id: "Arrow"
              }
            ]
          ],
          Container: "workplace"
        })
        this.jsp = jsp

        // 暂停渲染，执行以下操作
        jsp.batch(() => {
          jsPlumb.getSelector(".workplace-chart").forEach(item => {
            _self.initNode(item);
          });
          // jsPlumb.getSelector(".group").forEach(item => {
          //   _self.initNode(item);
          // });

        });
        this.initGroup()

        jsPlumb.fire("jsPlumbDemoLoaded", jsp);
      })
    })
  },
  methods: {
    /**
     * 初始化相关事件及操作
     */
    initGroup () {
      let jsp = this.jsp
      jsp.addGroup({
        el: group, // el元素，必须为DOM元素。TypeError: Cannot create property '_isJsPlumbGroup' on string 'group'
        id: 'firGroup', // dom元素上group属性 必填
        draggable: true, // 默认情况下设置为true。如果为false，则不会将Group元素设置为可拖动元素。
        dragOptions: {}, // 基于 katavorio.js 插件dragOptions
        droppable: true, // 默认设置为true。如果为false，则Group元素将不允许将元素拖放到其上，以便将它们添加到Group
        dropOptions: {
          drop(p) {
            console.log(p)
          }
        }, // 基于 katavorio.js dropOptions
        proxied: true, // 当组折叠时，应通过附加到组元素的连接来代理与组内子元素（从组外部发出）的连接。

        revert: true, // 默认情况下设置为true 子元素在组外部丢弃（而不是在另一个接受可丢弃组的组上）将在mouseup上恢复到组内的最后位置。
        prune: false, // 默认设置为false。如果为true，则将从Group元素外部的空白中删除的子元素将从group和jsPlumb的实例中删除，并且还将清除连接到该元素的任何连接。
        orphan: false, // 默认设置为false。如果为true，则将从Group元素外部的空白中删除的子元素将从Group中删除，但不会从jsPlumb的实例中删除。
        constrain: false, // 默认情况下设置为false。如果为true，则子元素仅限于在Group元素内拖动。
        ghost: false, // 默认设置为false。如果为true，则拖出Group元素之外的子元素将保留其原始元素，并使用鼠标跟踪'ghost'元素 - 原始的克隆 - 替换。
        dropOverride: false, // 默认为false。如果为true，则可以将子元素拖动到Group元素之外（假设没有其他标志阻止此元素），但可能不会将其拖放到其他Group上。

        collapsed: false, // 折叠状态
        anchor: "Continuous", // 代理端点
        endpoint: ["Dot", { radius: 5 }]
      })
      // jsp.removeGroup("firGroup"); // 删除，第二个参数为true时，删除时删除所有子元素及连接
      // jsp.removeFromGroup(someElement); // 从组中删除元素
      // jsPlumb.collapseGroup("aGroup");
      // jsPlumb.expandGroup("aGroup");
      // jsp.addToGroup("firGroup", start);

    },
    // 初始化node节点
    initNode (el) {
      // initialise draggable elements.
      // 元素拖动，基于 katavorio.js 插件
      let _self = this;
      this.jsp.draggable(el, {
        // containment: true,
        start (params) {
          // 拖动开始
          // console.log(params);
        },
        drag (params) {
          // 拖动中
          // console.log(params);
        },
        stop (params) {
          // 拖动结束
          let id = params.el.id;
          _self.chartData.forEach(item => {
            if (item.id === id) {
              item.nodeStyle.left = params.pos[0] + "px";
              item.nodeStyle.top = params.pos[1] + "px";
            }
          });
        }
      });

      this.jsp.makeSource(el, {
        filter: ".ep",
        // anchor: "Continuous",
        anchor: ["Perimeter", { shape: "Rectangle" }],
        connectorStyle: {
          stroke: "#5c96bc",
          strokeWidth: 2,
          outlineStroke: "transparent",
          outlineWidth: 4
        },
        extract: {
          action: "the-action"
        },
        maxConnections: -1,
        onMaxConnections: function (info, e) {
          alert("Maximum connections (" + info.maxConnections + ") reached");
        }
      });

      this.jsp.makeTarget(el, {
        dropOptions: { hoverClass: "dragHover" },
        anchor: ["Perimeter", { shape: "Rectangle" }],
        allowLoopback: false
      });

      // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
      // version of this demo to find out about new nodes being added.
      //
      this.jsp.fire("jsPlumbDemoNodeAdded", el);
    },
  },

  components: {
    ChartNode
  }
};
</script>

<style scoped>
</style>
