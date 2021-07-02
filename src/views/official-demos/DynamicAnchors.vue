<template>
  <div class="jtk-demo">
    <div
      id="canvas"
      class="jtk-demo-canvas canvas-wide dynamic-demo jtk-surface jtk-surface-nopan"
    >
      <div
        id="dynamicWindow1"
        class="window"
      >
        <strong>1</strong><br><br>
      </div>
      <div
        id="dynamicWindow2"
        class="window"
      >
        <strong>2</strong><br><br>
      </div>
      <div
        id="dynamicWindow3"
        class="window"
      >
        <strong>3</strong><br><br>
      </div>
      <div
        id="dynamicWindow4"
        class="window"
      >
        <strong>4</strong><br><br>
      </div>
      <div
        id="dynamicWindow5"
        class="window"
      >
        <strong>5</strong><br><br>
      </div>
      <div
        id="dynamicWindow6"
        class="window"
      >
        <strong>6</strong><br><br>
      </div>
    </div>
  </div>
</template>
<script>
import { jsPlumb } from 'jsplumb';

export default {
  name: 'DynamicAnchors',
  data() {
    return {};
  },
  mounted() {
    jsPlumb.ready(() => {
      const sourceAnchors = [
        [0.2, 0, 0, -1, 0, 0, 'foo'],
        [1, 0.2, 1, 0, 0, 0, 'bar'],
        [0.8, 1, 0, 1, 0, 0, 'baz'],
        [0, 0.8, -1, 0, 0, 0, 'qux'],
      ];
      const targetAnchors = [
        [0.6, 0, 0, -1],
        [1, 0.6, 1, 0],
        [0.4, 1, 0, 1],
        [0, 0.4, -1, 0],
      ];
      const exampleColor = '#00f';
      const exampleDropOptions = {
        tolerance: 'touch',
        hoverClass: 'dropHover',
        activeClass: 'dragActive',
      };
      const connector = [
        'Bezier',
        { cssClass: 'connectorClass', hoverClass: 'connectorHoverClass' },
      ];
      const connectorStyle = {
        gradient: {
          stops: [[0, exampleColor], [0.5, '#09098e'], [1, exampleColor]],
        },
        strokeWidth: 5,
        stroke: exampleColor,
      };
      const hoverStyle = {
        stroke: '#449999',
      };
      const overlays = [['Diamond', { fill: '#09098e', width: 15, length: 15 }]];
      const endpoint = [
        'Dot',
        {
          cssClass: 'endpointClass',
          radius: 10,
          hoverClass: 'endpointHoverClass',
        },
      ];
      const endpointStyle = { fill: exampleColor };
      const anEndpoint = {
        endpoint,
        paintStyle: endpointStyle,
        hoverPaintStyle: { fill: '#449999' },
        isSource: true,
        isTarget: true,
        maxConnections: -1,
        connector,
        connectorStyle,
        connectorHoverStyle: hoverStyle,
        connectorOverlays: overlays,
      };

      const instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        Container: 'canvas',
      });

      // suspend drawing and initialise.
      instance.batch(() => {
        const connections = {
          dynamicWindow1: ['dynamicWindow4'],
          dynamicWindow3: ['dynamicWindow1'],
          dynamicWindow5: ['dynamicWindow3'],
          dynamicWindow6: ['dynamicWindow5'],
          dynamicWindow2: ['dynamicWindow6'],
          dynamicWindow4: ['dynamicWindow2'],
        };
        const endpoints = {};
        // ask jsPlumb for a selector for the window class
        const divsWithWindowClass = jsPlumb.getSelector('.dynamic-demo .window');

        // add endpoints to all of these - one for source, and one for target, configured so they don't sit
        // on top of each other.
        for (let i = 0; i < divsWithWindowClass.length; i++) {
          const id = instance.getId(divsWithWindowClass[i]);
          endpoints[id] = [
            // note the three-arg version of addEndpoint; lets you re-use some common settings easily.
            instance.addEndpoint(id, anEndpoint, { anchor: sourceAnchors }),
            instance.addEndpoint(id, anEndpoint, { anchor: targetAnchors }),
          ];
        }
        // then connect everything using the connections map declared above.
        for (const e in endpoints) {
          if (connections[e]) {
            for (let j = 0; j < connections[e].length; j++) {
              instance.connect({
                source: endpoints[e][0],
                target: endpoints[connections[e][j]][1],
              });
            }
          }
        }

        // bind click listener; delete connections on click
        instance.bind('click', (conn) => {
          instance.detach(conn);
        });

        // bind beforeDetach interceptor: will be fired when the click handler above calls detach, and the user
        // will be prompted to confirm deletion.
        instance.bind('beforeDetach', (conn) => confirm('Delete connection?'));

        //
        // configure ".window" to be draggable. 'getSelector' is a jsPlumb convenience method that allows you to
        // write library-agnostic selectors; you could use your library's selector instead, eg.
        //
        // $(".window")  		jquery
        // $$(".window") 		mootools
        // Y.all(".window")		yui3
        //
        instance.draggable(divsWithWindowClass);

        jsPlumb.fire('jsPlumbDemoLoaded', instance);
      });
    });
  },
};
</script>

<style scoped>
.demo {
  /* for IE10+ touch devices */
  touch-action: none;
}

/** ELEMENTS **/
.dynamic-demo .window {
  width: 5em;
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
}

/** ELEMENT POSITIONS **/
#dynamicWindow1 {
  top: 5em;
  left: 2em;
}

#dynamicWindow2 {
  top: 8em;
  left: 43em;
}

#dynamicWindow3 {
  top: 28em;
  left: 2em;
}

#dynamicWindow4 {
  top: 16em;
  left: 22em;
}

#dynamicWindow5 {
  top: 34em;
  left: 26em;
}

#dynamicWindow6 {
  top: 23em;
  left: 56em;
}

#dynamicWindow7 {
  top: 18em;
  left: 40em;
}

#dynamicWindow8 {
  left: 63em;
  top: 32em;
}

/** JSPLUMB ARTEFACTS **/
.jtk-connector {
  z-index: 4;
}

.jtk-endpoint {
  z-index: 5;
}

.window {
  z-index: 24;
  background-color: white;
  border: 1px solid #346789;
  border-radius: 0.5em;
  position: absolute;
  cursor: pointer;
  box-shadow: 2px 2px 19px #aaa;
  -o-box-shadow: 2px 2px 19px #aaa;
  -webkit-box-shadow: 2px 2px 19px #aaa;
  -moz-box-shadow: 2px 2px 19px #aaa;
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

.window a {
  font-family: helvetica, sans-serif;
}

path,
.jtk-endpoint {
  cursor: pointer;
}
</style>
