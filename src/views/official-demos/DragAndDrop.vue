<template>
  <div class="jtk-demo">
    <div
      id="canvas"
      class="jtk-demo-canvas canvas-wide drag-drop-demo jtk-surface jtk-surface-nopan"
    >
      <div
        id="dragDropWindow1"
        class="window"
      >
        one<br><br>
        <a
          href="#"
          class="cmdLink hide"
          rel="dragDropWindow1"
        >toggle connections</a><br>
        <a
          href="#"
          class="cmdLink drag"
          rel="dragDropWindow1"
        >disable dragging</a><br>
        <a
          href="#"
          class="cmdLink detach"
          rel="dragDropWindow1"
        >detach all</a>
      </div>
      <div
        id="dragDropWindow2"
        class="window"
      >
        two<br><br>
        <a
          href="#"
          class="cmdLink hide"
          rel="dragDropWindow2"
        >toggle connections</a><br>
        <a
          href="#"
          class="cmdLink drag"
          rel="dragDropWindow2"
        >disable dragging</a><br>
        <a
          href="#"
          class="cmdLink detach"
          rel="dragDropWindow2"
        >detach all</a>
      </div>
      <div
        id="dragDropWindow3"
        class="window"
      >
        three<br><br>
        <a
          href="#"
          class="cmdLink hide"
          rel="dragDropWindow3"
        >toggle connections</a><br>
        <a
          href="#"
          class="cmdLink drag"
          rel="dragDropWindow3"
        >disable dragging</a><br>
        <a
          href="#"
          class="cmdLink detach"
          rel="dragDropWindow3"
        >detach all</a>
      </div>
      <div
        id="dragDropWindow4"
        class="window"
      >
        four<br><br>
        <a
          href="#"
          class="cmdLink hide"
          rel="dragDropWindow4"
        >toggle connections</a><br>
        <a
          href="#"
          class="cmdLink drag"
          rel="dragDropWindow4"
        >disable dragging</a><br>
        <a
          href="#"
          class="cmdLink detach"
          rel="dragDropWindow4"
        >detach all</a>
      </div>
      <div id="list" />
    </div>
  </div>
</template>
<script>
import { jsPlumb, jsPlumbUtil } from 'jsplumb';

export default {
  name: 'DragAndDrop',
  data() {
    return {};
  },
  mounted() {
    const listDiv = document.getElementById('list');
    const showConnectionInfo = function (s) {
      listDiv.innerHTML = s;
      listDiv.style.display = 'block';
    };
    const hideConnectionInfo = function () {
      listDiv.style.display = 'none';
    };
    const connections = [];
    const updateConnections = function (conn, remove) {
      if (!remove) connections.push(conn);
      else {
        let idx = -1;
        for (let i = 0; i < connections.length; i++) {
          if (connections[i] === conn) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) connections.splice(idx, 1);
      }
      if (connections.length > 0) {
        let s = '<span><strong>Connections</strong></span><br/><br/><table><tr><th>Scope</th><th>Source</th><th>Target</th></tr>';
        for (let j = 0; j < connections.length; j++) {
          s = `${s
          }<tr><td>${
            connections[j].scope
          }</td>`
              + `<td>${
                connections[j].sourceId
              }</td><td>${
                connections[j].targetId
              }</td></tr>`;
        }
        showConnectionInfo(s);
      } else hideConnectionInfo();
    };

    jsPlumb.ready(() => {
      const instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { stroke: '#666' },
        EndpointHoverStyle: { fill: 'orange' },
        HoverPaintStyle: { stroke: 'orange' },
        EndpointStyle: { width: 20, height: 16, stroke: '#666' },
        Endpoint: 'Rectangle',
        Anchors: ['TopCenter', 'TopCenter'],
        Container: 'canvas',
      });

      // suspend drawing and initialise.
      instance.batch(() => {
        // bind to connection/connectionDetached events,
        //  and update the list of connections on screen.
        // eslint-disable-next-line no-unused-vars
        instance.bind('connection', (info, originalEvent) => {
          updateConnections(info.connection);
        });
        // eslint-disable-next-line no-unused-vars
        instance.bind('connectionDetached', (info, originalEvent) => {
          updateConnections(info.connection, true);
        });

        // eslint-disable-next-line no-unused-vars
        instance.bind('connectionMoved', (info, originalEvent) => {
          //  only remove here, because a 'connection' event is also fired.
          // in a future release of jsplumb this extra connection event will not
          // be fired.
          updateConnections(info.connection, true);
        });
        // eslint-disable-next-line no-unused-vars
        instance.bind('click', (component, originalEvent) => {
          alert('click!');
        });

        // configure some drop options for use by all endpoints.
        const exampleDropOptions = {
          tolerance: 'touch',
          hoverClass: 'dropHover',
          activeClass: 'dragActive',
        };

        /*
         first example endpoint.  it's a 25x21 rectangle (the size is provided in the 'style' arg to the Endpoint),
         and it's both a source and target.  the 'scope' of this Endpoint is 'exampleConnection', meaning any connection
         starting from this Endpoint is of type 'exampleConnection' and can only be dropped on an Endpoint target
         that declares 'exampleEndpoint' as its drop scope, and also that
         only 'exampleConnection' types can be dropped here.

         the connection style for this endpoint is a Bezier curve (we didn't provide one, so we use the default), with a strokeWidth of
         5 pixels, and a gradient.

         there is a 'beforeDrop' interceptor on this endpoint which is used to allow the user to decide whether
         or not to allow a particular connection to be established.
         */
        const exampleColor = '#00f';
        const exampleEndpoint = {
          endpoint: 'Rectangle',
          paintStyle: { width: 25, height: 21, fill: exampleColor },
          isSource: true,
          reattach: true,
          scope: 'blue',
          connectorStyle: {
            gradient: {
              stops: [[0, exampleColor], [0.5, '#09098e'], [1, exampleColor]],
            },
            strokeWidth: 5,
            stroke: exampleColor,
            dashstyle: '2 2',
          },
          isTarget: true,
          beforeDrop(params) {
            return `Connect ${params.sourceId} to ${params.targetId}?`;
          },
          dropOptions: exampleDropOptions,
        };

        //
        // the second example uses a Dot of radius 15 as the endpoint marker, is both a source and target,
        // and has scope 'exampleConnection2'.
        //
        const color2 = '#316b31';
        const exampleEndpoint2 = {
          endpoint: ['Dot', { radius: 11 }],
          paintStyle: { fill: color2 },
          isSource: true,
          scope: 'green',
          connectorStyle: { stroke: color2, strokeWidth: 6 },
          connector: ['Bezier', { curviness: 63 }],
          maxConnections: 3,
          isTarget: true,
          dropOptions: exampleDropOptions,
        };

        //
        // the third example uses a Dot of radius 17 as the endpoint marker, is both a source and target, and has scope
        // 'exampleConnection3'.  it uses a Straight connector, and the Anchor is created here (bottom left corner) and never
        // overriden, so it appears in the same place on every element.
        //
        // this example also demonstrates the beforeDetach interceptor, which allows you to intercept
        // a connection detach and decide whether or not you wish to allow it to proceed.
        //
        const example3Color = 'rgba(229,219,61,0.5)';
        const exampleEndpoint3 = {
          endpoint: ['Dot', { radius: 17 }],
          anchor: 'BottomLeft',
          paintStyle: { fill: example3Color, opacity: 0.5 },
          isSource: true,
          scope: 'yellow',
          connectorStyle: {
            stroke: example3Color,
            strokeWidth: 4,
          },
          connector: 'Straight',
          isTarget: true,
          dropOptions: exampleDropOptions,
          // eslint-disable-next-line no-unused-vars
          beforeDetach(conn) {
            return 'Detach connection?';
          },
          onMaxConnections(info) {
            alert(
              `Cannot drop connection ${
                info.connection.id
              } : maxConnections has been reached on Endpoint ${
                info.endpoint.id}`,
            );
          },
        };

        // setup some empty endpoints.  again note the use of the three-arg method to reuse all the parameters except the location
        // of the anchor (purely because we want to move the anchor around here; you could set it one time and forget about it though.)
        let e1 = instance.addEndpoint(
          'dragDropWindow1',
          { anchor: [0.5, 1, 0, 1] },
          exampleEndpoint2,
        );

        // setup some DynamicAnchors for use with the blue endpoints
        // and a function to set as the maxConnections callback.
        const anchors = [
          [1, 0.2, 1, 0],
          [0.8, 1, 0, 1],
          [0, 0.8, -1, 0],
          [0.2, 0, 0, -1],
        ];
        const maxConnectionsCallback = function (info) {
          alert(
            `Cannot drop connection ${
              info.connection.id
            } : maxConnections has been reached on Endpoint ${
              info.endpoint.id}`,
          );
        };

        e1 = instance.addEndpoint(
          'dragDropWindow1',
          { anchor: anchors },
          exampleEndpoint,
        );
        // you can bind for a maxConnections callback using a standard bind call, but you can also supply 'onMaxConnections' in an Endpoint definition - see exampleEndpoint3 above.
        e1.bind('maxConnections', maxConnectionsCallback);

        const e2 = instance.addEndpoint(
          'dragDropWindow2',
          { anchor: [0.5, 1, 0, 1] },
          exampleEndpoint,
        );
        // again we bind manually. it's starting to get tedious.  but now that i've done one of the blue endpoints this way, i have to do them all...
        e2.bind('maxConnections', maxConnectionsCallback);
        instance.addEndpoint(
          'dragDropWindow2',
          { anchor: 'RightMiddle' },
          exampleEndpoint2,
        );

        const e3 = instance.addEndpoint(
          'dragDropWindow3',
          { anchor: [0.25, 0, 0, -1] },
          exampleEndpoint,
        );
        e3.bind('maxConnections', maxConnectionsCallback);
        instance.addEndpoint(
          'dragDropWindow3',
          { anchor: [0.75, 0, 0, -1] },
          exampleEndpoint2,
        );

        const e4 = instance.addEndpoint(
          'dragDropWindow4',
          { anchor: [1, 0.5, 1, 0] },
          exampleEndpoint,
        );
        e4.bind('maxConnections', maxConnectionsCallback);
        instance.addEndpoint(
          'dragDropWindow4',
          { anchor: [0.25, 0, 0, -1] },
          exampleEndpoint2,
        );

        // make .window divs draggable
        instance.draggable(jsPlumb.getSelector('.drag-drop-demo .window'));

        // add endpoint of type 3 using a selector.
        instance.addEndpoint(
          jsPlumb.getSelector('.drag-drop-demo .window'),
          exampleEndpoint3,
        );

        const hideLinks = jsPlumb.getSelector('.drag-drop-demo .hide');
        instance.on(hideLinks, 'click', function (e) {
          instance.toggleVisible(this.getAttribute('rel'));
          jsPlumbUtil.consume(e);
        });

        const dragLinks = jsPlumb.getSelector('.drag-drop-demo .drag');
        instance.on(dragLinks, 'click', function (e) {
          const s = instance.toggleDraggable(this.getAttribute('rel'));
          this.innerHTML = s ? 'disable dragging' : 'enable dragging';
          jsPlumbUtil.consume(e);
        });

        const detachLinks = jsPlumb.getSelector('.drag-drop-demo .detach');
        instance.on(detachLinks, 'click', function (e) {
          instance.detachAllConnections(this.getAttribute('rel'));
          jsPlumbUtil.consume(e);
        });

        instance.on(document.getElementById('clear'), 'click', (e) => {
          instance.detachEveryConnection();
          showConnectionInfo('');
          jsPlumbUtil.consume(e);
        });
      });

      jsPlumb.fire('jsPlumbDemoLoaded', instance);
    });
  },
};
</script>

<style scoped>
/** ELEMENT POSITIONS **/
#dragDropWindow1 {
  top: 76px;
  left: 100px;
}
#dragDropWindow2 {
  top: 148px;
  left: 600px;
}
#dragDropWindow3 {
  top: 340px;
  left: 100px;
}
#dragDropWindow4 {
  top: 416px;
  left: 600px;
}

/** ELEMENTS **/
.drag-drop-demo .window {
  font-family: serif;
  font-style: italic;
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
  padding-top: 5px;
  width: 140px;
  height: 120px;
  line-height: 12px;
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

.drag-drop-demo a,
.drag-drop-demo a:visited {
  color: #057d9f;
}

.drag-drop-demo a:hover {
  color: orange;
}

/** LINKS IN WINDOWS **/
.drag-locked {
  border: 1px solid red;
}
.cmdLink {
  font-size: 0.8em;
}

/** DRAG/DROP CLASSES **/
.dragActive {
  border: 2px dotted orange;
}
.dropHover {
  border: 1px dotted red;
}

/** INFO WINDOW **/
#list {
  text-align: center;
  display: none;
  font-size: 90%;
  position: absolute;
  width: 500px;
  left: 50%;
  margin-left: -250px;
  top: 100px;
  background-color: white;
  padding: 5px;
  border: 1px solid #456;
  opacity: 0.8;
  border-radius: 8px;
  color: #444;
}
#list table {
  width: 100%;
}
#list table th,
#list strong {
  color: black;
  font-size: 12px;
  text-align: center;
}

path,
.jtk-endpoint {
  cursor: pointer;
}
</style>
