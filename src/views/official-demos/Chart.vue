<template>
  <div class="jtk-demo">
    <div
      id="canvas"
      class="jtk-demo-canvas canvas-wide chart-demo jtk-surface jtk-surface-nopan"
    >
      <div
        id="chartWindow1"
        class="window"
      >
        window one
      </div>
      <div
        id="chartWindow2"
        class="window"
      >
        window two
      </div>
      <div
        id="chartWindow3"
        class="window"
      >
        window three
      </div>
      <div
        id="chartWindow4"
        class="window"
      >
        window four
      </div>
      <div
        id="chartWindow5"
        class="window"
      >
        window five
      </div>
      <div
        id="chartWindow6"
        class="window"
      >
        window six
      </div>
    </div>
  </div>
</template>
<script>
import all, { jsPlumb } from 'jsplumb';

console.log(all);
export default {
  name: 'Chart',
  data() {
    return {};
  },
  mounted() {
    jsPlumb.ready(() => {
      const color = 'gray';

      const instance = jsPlumb.getInstance({
        // notice the 'curviness' argument to this Bezier curve.
        // than the curves on the first demo, which use the default curviness value.
        Connector: ['Bezier', { curviness: 50 }],
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { stroke: color, strokeWidth: 2 },
        EndpointStyle: { radius: 9, fill: color },
        HoverPaintStyle: { stroke: '#ec9f2e' },
        EndpointHoverStyle: { fill: '#ec9f2e' },
        Container: 'canvas',
      });

      // suspend drawing and initialise.
      instance.batch(() => {
        // declare some common values:
        const arrowCommon = { foldback: 0.7, fill: color, width: 14 };
        // use three-arg spec to create two different arrows with the common values:
        const overlays = [
          ['Arrow', { location: 0.7 }, arrowCommon],
          ['Arrow', { location: 0.3, direction: -1 }, arrowCommon],
        ];

        // add endpoints, giving them a UUID.
        // you DO NOT NEED to use this method. You can use your library's selector method.
        // the jsPlumb demos use it so that the code can be shared between all three libraries.
        const windows = jsPlumb.getSelector('.chart-demo .window');
        for (let i = 0; i < windows.length; i++) {
          instance.addEndpoint(windows[i], {
            uuid: `${windows[i].getAttribute('id')}-bottom`,
            anchor: 'Bottom',
            maxConnections: -1,
          });
          instance.addEndpoint(windows[i], {
            uuid: `${windows[i].getAttribute('id')}-top`,
            anchor: 'Top',
            maxConnections: -1,
          });
        }

        instance.connect({
          uuids: ['chartWindow3-bottom', 'chartWindow6-top'],
          overlays,
          detachable: true,
          reattach: true,
        });
        instance.connect({
          uuids: ['chartWindow1-bottom', 'chartWindow2-top'],
          overlays,
        });
        instance.connect({
          uuids: ['chartWindow1-bottom', 'chartWindow3-top'],
          overlays,
        });
        instance.connect({
          uuids: ['chartWindow2-bottom', 'chartWindow4-top'],
          overlays,
        });
        instance.connect({
          uuids: ['chartWindow2-bottom', 'chartWindow5-top'],
          overlays,
        });

        instance.draggable(windows);
      });

      jsPlumb.fire('jsPlumbDemoLoaded', instance);
    });
  },
};
</script>

<style scoped>
.demo {
  /* for IE10+ touch devices */
  touch-action: none;
}
.chart-demo {
  height: 100%;
  border: 1px solid #ccc;
  background-color: white;
  display: flex;
}

/** ELEMENTS **/
.chart-demo .window {
  border: 0.1em dotted #d4e06b;
  width: 14em;
  height: 4em;
  line-height: 4em;
}

/** HOVER EFFECTS **/
.chart-demo .window:hover,
.chart-demo .window.jtk-source-hover,
.chart-demo .window.jtk-target-hover {
  border: 1px solid orange;
  color: orange;
}

/** ELEMENT POSITIONS **/
#chartWindow1 {
  left: 20em;
  top: 6em;
}
#chartWindow2 {
  left: 10em;
  top: 18em;
}
#chartWindow3 {
  left: 40em;
  top: 18em;
}
#chartWindow4 {
  left: 4em;
  top: 30em;
}
#chartWindow5 {
  left: 22em;
  top: 30em;
}
#chartWindow6 {
  left: 47em;
  top: 30em;
}
#chartWindow7 {
  top: 18em;
  left: 46em;
}
#chartWindow8 {
  left: 63em;
  top: 38em;
}

.window {
  background-color: white;
  border: 1px solid #346789;
  text-align: center;
  z-index: 24;
  cursor: pointer;
  box-shadow: 2px 2px 19px #aaa;
  -o-box-shadow: 2px 2px 19px #aaa;
  -webkit-box-shadow: 2px 2px 19px #aaa;
  -moz-box-shadow: 2px 2px 19px #aaa;
  -moz-border-radius: 0.5em;
  border-radius: 0.5em;
  position: absolute;
  color: black;
  padding: 0.5em;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-transition: -webkit-box-shadow 0.15s ease-in;
  -moz-transition: -moz-box-shadow 0.15s ease-in;
  -o-transition: -o-box-shadow 0.15s ease-in;
  transition: box-shadow 0.15s ease-in;
}

.window:hover {
  border: 1px solid #123456;
  box-shadow: 2px 2px 19px #444;
  -o-box-shadow: 2px 2px 19px #444;
  -webkit-box-shadow: 2px 2px 19px #444;
  -moz-box-shadow: 2px 2px 19px #fff;
  opacity: 0.9;
}

path,
.jtk-endpoint {
  cursor: pointer;
}
</style>
