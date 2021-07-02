<template>
  <el-container
    id="work-container"
    class="container"
  >
    <el-aside width="200px">
      <div class="box-card">
        <div class="header">
          模块一
        </div>
        <div class="card-body">
          <div
            v-for="(item,i) in list"
            :key="item"
            class="item"
          >
            <i
              class="chart-item"
              :class="item"
              :data-key="item"
            >{{ i }}</i>
          </div>
        </div>
      </div>
    </el-aside>
    <el-main>
      <div
        id="workplace"
        class="workplace"
      />
    </el-main>
  </el-container>
</template>

<script>
import { jsPlumb } from 'jsplumb';

export default {
  name: 'DragToWorkplace',
  data() {
    return {
      list: ['circle', 'diamond', 'ellipse', 'rectangle'],
    };
  },
  mounted() {
    jsPlumb.ready(() => {
      // 默认配置
      const instance = jsPlumb.getInstance({
        // drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // overlays
        ConnectionOverlays: [
          [
            'Arrow',
            {
              location: 1,
              visible: true,
              width: 11,
              height: 11,
              id: 'Arrow',
            },
          ],
          [
            'Label',
            {
              location: 0.1,
              id: 'Label',
              cssClass: 'arrow-label',
              events: {
                tap() {
                  console.log('Label');
                },
              },
            },
          ],
        ],
        Container: 'workplace',
      });
      // 连接线默认样式
      const connectorPaintStyle = {
        strokeWidth: 2,
        stroke: '#61B7CF',
        joinstyle: 'round',
        outlineStroke: 'white',
        outlineWidth: 2,
      };
      // hover style.
      const connectorHoverStyle = {
        strokeWidth: 3,
        stroke: '#216477',
        outlineWidth: 5,
        outlineStroke: 'white',
      };
      const endpointHoverStyle = {
        fill: '#216477',
        stroke: '#216477',
      };
      // source endpoints
      const sourceEndpoint = {
        endpoint: 'Dot',
        paintStyle: {
          stroke: '#7AB02C',
          fill: 'transparent',
          radius: 7,
          strokeWidth: 1,
        },
        isSource: true,
        connector: [
          'Flowchart',
          {
            stub: [40, 60],
            gap: 10,
            cornerRadius: 5,
            alwaysRespectStubs: true,
          },
        ],
        connectorStyle: connectorPaintStyle,
        hoverPaintStyle: endpointHoverStyle,
        connectorHoverStyle,
        dragOptions: {},
        overlays: [
          [
            'Label',
            {
              location: [0.5, 1.5],
              label: 'Drag',
              cssClass: 'endpointSourceLabel',
              visible: false,
            },
          ],
        ],
      };
      // target endpoints
      const targetEndpoint = {
        endpoint: 'Dot',
        paintStyle: { fill: '#7AB02C', radius: 7 },
        hoverPaintStyle: endpointHoverStyle,
        maxConnections: -1,
        dropOptions: { hoverClass: 'hover', activeClass: 'active' },
        isTarget: true,
        overlays: [
          [
            'Label',
            {
              location: [0.5, -0.5],
              label: 'Drop',
              cssClass: 'endpointTargetLabel',
              visible: false,
            },
          ],
        ],
      };
      const init = function (connection) {
        console.log(connection);

        connection.getOverlay('label').setLabel('123');
      };
      const addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        console.log(toId, sourceAnchors, targetAnchors);

        for (let i = 0; i < sourceAnchors.length; i++) {
          const sourceUUID = toId + sourceAnchors[i];
          instance.addEndpoint(toId, sourceEndpoint, {
            anchor: sourceAnchors[i],
            uuid: sourceUUID,
          });
        }
        for (let j = 0; j < targetAnchors.length; j++) {
          const targetUUID = toId + targetAnchors[j];
          instance.addEndpoint(toId, targetEndpoint, {
            anchor: targetAnchors[j],
            // anchor: 'Continuous',
            uuid: targetUUID,
          });
        }
      };

      // 暂停渲染，执行以下操作
      instance.batch(() => {
        // listen for new connections;
        // eslint-disable-next-line no-unused-vars
        instance.bind('connection', (connInfo, originalEvent) => {
          init(connInfo.connection);
        });
        /* // make all the window divs draggable
        instance.draggable($(".workplace .chart-item"), {
          grid: [1, 1]
        }); */

        // listen for clicks on connections, and offer to delete connections on click.
        // eslint-disable-next-line no-unused-vars
        instance.bind('click', (conn, originalEvent) => {
          // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
          //   instance.detach(conn);
          // conn.toggleType("basic");
        });

        instance.bind('connectionDrag', (connection) => {
          console.log(
            `connection ${
              connection.id
            } is being dragged. suspendedElement is `,
            connection.suspendedElement,
            ' of type ',
            connection.suspendedElementType,
          );
        });

        instance.bind('connectionDragStop', (connection) => {
          console.log(`connection ${connection.id} was dragged`);
        });

        instance.bind('connectionMoved', (params) => {
          console.log(`connection ${params.connection.id} was moved`);
        });
      });
      // 将模块拖入画板中
      $('.box-card .chart-item').draggable({
        scope: 'plant',
        helper: 'clone',
        containment: $('#work-container'),
      });
      $('#workplace').droppable({
        scope: 'plant',
        drop(ev, ui) {
          console.log(ev, ui);

          const id = `item${new Date().getTime()}`;

          const html = `<div id="${id}" class="chart-item ${ui.helper.attr(
            'data-key',
          )}">${ui.helper.html()}</div>`;

          $(this).append(html);
          $(`#${id}`).css({
            top: `${ui.position.top - 60}px`,
            left: `${ui.position.left - 200}px`,
          });
          addEndpoints(
            id,
            ['RightMiddle', 'BottomCenter'],
            ['LeftMiddle', 'TopCenter'],
          );

          /* jsPlumb.addEndpoint(id, { anchors: "TopCenter" });
          jsPlumb.addEndpoint(id, { anchors: "RightMiddle" });
          jsPlumb.addEndpoint(id, { anchors: "BottomCenter" });
          jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }); */

          /* instance.draggable(jsPlumb.getSelector("#" + id), {
            containment: "parent"
          }); */
          instance.draggable(id, {
            grid: [1, 1],
            // containment: true
          });
        },
      });

      jsPlumb.fire('jsPlumbDemoLoaded', instance);
    });
  },
  methods: {},
};
</script>
<style lang="scss">
.workplace {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
