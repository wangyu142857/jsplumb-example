<template>
  <el-container class="container" id="work-container">
    <el-aside width="200px">
      <div class="template-box">
        <div class="header">模板列表
          <i class="el-icon-circle-plus-outline add" title="新建" @click="handleClickTemp()"></i>
        </div>
        <ul class="template-list">
          <li class="item" :class="{'active':item.isActive}" v-for="item in templateList" :key="item.key" @click="handleClickTemp(item.key)">
            {{item.name}}
            <!-- <router-link to="/demo-chart/fir"></router-link> -->
          </li>
        </ul>
      </div>
    </el-aside>
    <el-main>
      <el-button class="btn-save" @click="saveChart" type="success">保存</el-button>
      <div class="workplace" id="workplace">
        <!-- <div class="workplace-chart" id="start">
          <i class="el-icon-loading circle"></i>
          <span>开始</span>
          <div class="ep"></div>
        </div> -->
        <chart-node v-for="(item, idx) in chartData.nodes" v-bind="item" :key="idx"></chart-node>
      </div>
    </el-main>
    <el-aside width="200px">
      <div class="box-card" v-for="(item,idx) in list" :key="idx">
        <div class="header">模块{{idx+1}}</div>
        <div class="card-body">
          <div class="item" v-for="(item2,idx2) in item" :key="idx2" :data-icon="item2.icon" :data-text="item2.name" :data-type="item2.type">
            <i :class="[item2.icon,item2.type]"></i>
            <span class="text">{{item2.name}}</span>

          </div>
        </div>
      </div>
    </el-aside>
    <el-dialog title="智能模型保存" :visible.sync="dialogFormVisible">
      <el-form :model="chartForm" ref="chartForm" :label-width="formLabelWidth">
        <el-form-item label="模型名称">
          <el-input v-model="chartForm.name" auto-complete="off" placeholder="请输入模型名称"></el-input>
        </el-form-item>
        <el-form-item label="批注内容">
          <el-input type="textarea" :autosize="true" v-model="chartForm.msg" auto-complete="off" placeholder="请输入模型批注内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSave">取 消</el-button>
        <el-button type="primary" @click="submitSave">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
import ChartNode from "@/components/ChartNode";
export default {
  name: "DemoChart",
  data() {
    return {
      dialogFormVisible: false,
      chartForm: {
        name: "",
        msg: ""
      },
      formLabelWidth: "100px",
      templateList: [
        {
          name: "模板一",
          key: "json.1"
        },
        {
          name: "模板二",
          key: "json.2"
        }
      ],
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
      jsp: null,
      chartData: {
        nodes: [
          {
            id: "start",
            icon: "el-icon-loading",
            type: "circle",
            text: "开始",
            nodeStyle: {
              top: "100px",
              left: "300px"
            }
          }
        ],
        connections: [],
        props: {}
      }
    };
  },
  mounted() {
    const _self = this;

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

      // 监听 connection 事件
      instance.bind("connection", function(info) {
        // info.connection.getOverlay("label").setLabel(info.connection.id);
      });
      // 监听拖动connection 事件，判断是否有重复链接
      instance.bind("beforeDrop", function(info) {
        // info.connection.getOverlay("label").setLabel(info.connection.id);
        console.log(info);
        // 判断是否已有该连接
        let isSame = true;
        _self.chartData.connections.forEach(item => {
          if (
            (item.targetId === info.targetId &&
              item.sourceId === info.sourceId) ||
            (item.targetId === info.sourceId && item.sourceId === info.targetId)
          ) {
            isSame = false;
          }
        });
        if (isSame) {
          _self.chartData.connections.push({
            targetId: info.targetId,
            sourceId: info.sourceId
          });
        } else {
          _self.$message.error("不允许重复连接！");
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
          /* let d = document.createElement("div");
          let id = jsPlumbUtil.uuid();
          d.className = "workplace-chart";
          d.id = id;
          d.innerHTML = ui.helper.html() + '<div class="ep"></div>';
          d.style.top = ui.position.top - 60 + "px";
          d.style.left = ui.position.left - 200 + "px";
          instance.getContainer().appendChild(d); */
          let helper = ui.helper;
          let id = jsPlumbUtil.uuid();
          let item = {
            id,
            icon: helper.attr("data-icon"),
            type: helper.attr("data-type"),
            text: helper.attr("data-text"),
            nodeStyle: {
              top: ui.position.top - 60 + "px",
              left: ui.position.left - 200 + "px"
            }
          };

          _self.chartData.nodes.push(item);
          _self.$nextTick(() => {
            initNode(id);
          });
        }
      });

      //
      // initialise element as connection targets and source.
      //
      var initNode = function(el) {
        // initialise draggable elements.
        // 元素拖动，基于 katavorio.js 插件
        instance.draggable(el, {
          containment: true,
          start(params) {
            // 拖动开始
            // console.log(params);
          },
          drag(params) {
            // 拖动中
            // console.log(params);
          },
          stop(params) {
            // 拖动结束
            console.log(params);
            let id = params.el.id;
            _self.chartData.nodes.forEach(item => {
              if (item.id === id) {
                item.nodeStyle.left = params.pos[0] + "px";
                item.nodeStyle.top = params.pos[1] + "px";
              }
            });
          }
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
        jsPlumb.getSelector(".workplace-chart").forEach(item => {
          initNode(item);
        });
      });
      jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });
  },
  methods: {
    // 初始化node节点
    initNode(el) {
      // initialise draggable elements.
      // 元素拖动，基于 katavorio.js 插件
      let _self = this;
      this.jsp.draggable(el, {
        containment: true,
        start(params) {
          // 拖动开始
          // console.log(params);
        },
        drag(params) {
          // 拖动中
          // console.log(params);
        },
        stop(params) {
          // 拖动结束
          console.log(params);
          let id = params.el.id;
          _self.chartData.nodes.forEach(item => {
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
        onMaxConnections: function(info, e) {
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
    // 保存
    saveChart() {
      this.dialogFormVisible = true;
      // console.log(this.jsp.getConnections());
      console.log(this.chartData);
      // jsPlumb.repaintEverything();
    },
    /**
     * @description 取消保存
     */
    cancelSave() {
      this.dialogFormVisible = false;
      this.chartForm = {
        name: "",
        msg: ""
      };
      this.$message.info("已取消保存");
    },
    submitSave() {
      this.dialogFormVisible = false;
      this.chartData.props = this.chartForm;
      this.$message.success("保存成功");
    },
    /**
     * @description 模板点击事件
     * @param {String} key 模板关键值
     */
    handleClickTemp(key) {
      this.chartData = {
        nodes: [],
        connections: [],
        props: {}
      };
      this.jsp.empty("workplace");
      if (key) {
        this.templateList.forEach(item => {
          if (item.key === key) {
            item.isActive = true;
          } else {
            item.isActive = false;
          }
        });
        let url = "./static/json/" + key + ".json";

        this.$axios
          .get(url)
          .then(resp => {
            console.log(resp);
            this.chartData = resp.data;
            this.$nextTick(() => {
              this.chartData.nodes.forEach(item => {
                this.initNode(item.id);
              });
              // this.jsp.empty();
              this.chartData.connections.forEach(item => {
                this.jsp.connect({
                  source: item.sourceId,
                  target: item.targetId
                });
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$nextTick(() => {
          this.chartData.nodes.push({
            id: "start",
            icon: "el-icon-loading",
            type: "circle",
            text: "开始",
            nodeStyle: {
              top: "100px",
              left: "300px"
            }
          });
          this.$nextTick(() => {
            this.jsp.batch(() => {
              this.initNode(jsPlumb.getSelector("#start"));
            });
          });
        });
      }
    }
  },
  /* beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
  }, */
  watch: {
    $route(to, from) {
      console.log(to, from);

      // 对路由变化作出响应...
    }
  },
  components: {
    ChartNode
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


