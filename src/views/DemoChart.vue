<template>
  <el-container class="container" id="work-container">
    <el-aside width="200px">
      <div class="template-box">
        <div class="header">模板列表</div>
        <ul class="template-list">
          <li class="item">
            <router-link to="/demo-chart/fir">模板一</router-link>
          </li>
          <li class="item">
            <router-link to="/demo-chart/sec">模板二</router-link>
          </li>
        </ul>
      </div>
    </el-aside>
    <el-main>
        <el-button class="btn-save" @click="saveChart" type="success">保存</el-button>
      <div class="workplace" id="workplace">
        <div class="workplace-chart" id="start">
          <i class="el-icon-loading circle"></i>
          <span>开始</span>
          <div class="ep"></div>
        </div>
      </div>
    </el-main>
    <el-aside width="200px">
      <div class="box-card" v-for="(item,idx) in list" :key="idx">
        <div class="header">模块{{idx+1}}</div>
        <div class="card-body">
          <div class="item" v-for="(item2,idx2) in item" :key="idx2" :data-key="item2.type">
            <i :class="[item2.icon,item2.type]"></i>
            <span>{{item2.name}}</span>

          </div>
        </div>
      </div>
    </el-aside>

  </el-container>
</template>

<script>
export default {
  name: "DemoChart",
  data() {
    return {
      list: [
        [
          {
            icon: "el-icon-menu",
            name: "伴随车牌",
            type: "diamond"
          },
          {
            icon: "el-icon-star-on",
            name: "常住人口筛选",
            type: "diamond"
          },
          {
            icon: "el-icon-location",
            name: "伴随imsi",
            type: "diamond"
          }
        ],
        [
          {
            icon: "el-icon-date",
            name: "差集",
            type: "diamond"
          },
          {
            icon: "el-icon-time",
            name: "交集",
            type: "diamond"
          },
          {
            icon: "el-icon-bell",
            name: "并集",
            type: "diamond"
          }
        ],
        [
          {
            icon: "el-icon-tickets",
            name: "外部excel",
            type: "circle"
          },
          {
            icon: "el-icon-upload",
            name: "结束",
            type: "circle"
          }
        ]
      ],
      jsp: null
    };
  },
  mounted() {
    console.log(this.$route.params);

    jsPlumb.ready(() => {
      // 默认配置
      var instance = jsPlumb.getInstance({
        Endpoint: [
          "Dot",
          { cssClass: "chart-dot", hoverClass: "chart-dot-hover", radius: 5 }
        ],
        Connector: "Straight",
        HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
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
          // ["Label", { label: "-", id: "label", cssClass: "aLabel" }]
        ],
        Container: "workplace"
      });
      this.jsp = instance;

      var canvas = document.getElementById("workplace");

      // 删除连接线
      // instance.bind("click", function(c) {
      //   instance.deleteConnection(c);
      // });

      // bind a connection listener. note that the parameter passed to this function contains more than
      // just the new connection - see the documentation for a full list of what is included in 'info'.
      // this listener sets the connection's internal
      // id as the label overlay's text.
      instance.bind("connection", function(info) {
        // info.connection.getOverlay("label").setLabel(info.connection.id);
      });
      instance.bind("beforeDrop", function(info) {
        // info.connection.getOverlay("label").setLabel(info.connection.id);
        console.log(info);
        let isSame = true;
        if (!isSame) {
        } else {
        }
        return isSame;
      });

      // bind a double click listener to "canvas"; add new node when this occurs.
      // jsPlumb.on(canvas, "dblclick", function(e) {
      //   newNode(e.offsetX, e.offsetY);
      // });
      // 将模块拖入画板中
      $(".box-card .item").draggable({
        scope: "plant",
        helper: "clone",
        containment: $("#work-container")
      });
      $("#workplace").droppable({
        scope: "plant",
        drop: function(ev, ui) {
          console.log(ev, ui);

          // let id = "item" + new Date().getTime();
          // let type = ui.helper.attr("data-key");
          // let html = `<div id="${id}" class="workplace-chart">${ui.helper.html()}<b class="ep"></b></div>`;

          // $(this).append(html);
          // $("#" + id).css({
          //   top: ui.position.top - 60 + "px",
          //   left: ui.position.left - 200 + "px"
          // });
          // initNode($("#" + id));
          let d = document.createElement("div");
          let id = jsPlumbUtil.uuid();
          d.className = "workplace-chart";
          d.id = id;
          d.innerHTML = ui.helper.html() + '<div class="ep"></div>';
          d.style.top = ui.position.top - 60 + "px";
          d.style.left = ui.position.left - 200 + "px";
          instance.getContainer().appendChild(d);
          initNode(d);
        }
      });

      //
      // initialise element as connection targets and source.
      //
      var initNode = function(el) {
        // initialise draggable elements.
        instance.draggable(el, {
          containment: true
        });

        instance.makeSource(el, {
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
          onMaxConnections: function(info, e) {
            alert("Maximum connections (" + info.maxConnections + ") reached");
          }
        });

        instance.makeTarget(el, {
          dropOptions: { hoverClass: "dragHover" },
          anchor: ["Perimeter", { shape: "Rectangle" }],
          allowLoopback: false
        });

        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //
        instance.fire("jsPlumbDemoNodeAdded", el);
      };

      // 暂停渲染，执行以下操作
      instance.batch(() => {
        initNode($("#start"));
      });
      jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });
  },
  methods: {
    // 保存
    saveChart() {
      console.log(this.jsp.getConnections());
    }
  },
  /* beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
  }, */
  watch: {
    '$route' (to, from) {
      console.log(to, from);
      
      // 对路由变化作出响应...
    }
  }
};
</script>
<style lang="scss">
.workplace {
  width: 100%;
  height: 100%;
  position: relative;
}
#start {
  top: 50px;
  left: 50px;
}
</style>


