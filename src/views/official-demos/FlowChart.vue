<template>
  <div class="jtk-demo">
    <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">
      <div class="window jtk-node" id="flowchartWindow1">
        <strong>1</strong><br/><br/></div>
      <div class="window jtk-node" id="flowchartWindow2">
        <strong>2</strong><br/><br/></div>
      <div class="window jtk-node" id="flowchartWindow3">
        <strong>3</strong><br/><br/></div>
      <div class="window jtk-node" id="flowchartWindow4">
        <strong>4</strong><br/><br/></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chart",
  data() {
    return {};
  },
  mounted() {
    jsPlumb.ready(function() {
      var instance = (window.jsp = jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
          [
            "Arrow",
            {
              location: 1,
              visible: true,
              width: 11,
              length: 11,
              id: "ARROW",
              events: {
                click: function() {
                  alert("you clicked on the arrow overlay");
                }
              }
            }
          ],
          [
            "Label",
            {
              location: 0.1,
              id: "label",
              cssClass: "aLabel",
              events: {
                tap: function() {
                  alert("hey");
                }
              }
            }
          ]
        ],
        Container: "canvas"
      }));

      var basicType = {
        connector: "StateMachine",
        paintStyle: { stroke: "red", strokeWidth: 4 },
        hoverPaintStyle: { stroke: "blue" },
        overlays: ["Arrow"]
      };
      instance.registerConnectionType("basic", basicType);

      // this is the paint style for the connecting lines..
      var connectorPaintStyle = {
          strokeWidth: 2,
          stroke: "#61B7CF",
          joinstyle: "round",
          outlineStroke: "white",
          outlineWidth: 2
        },
        // .. and this is the hover style.
        connectorHoverStyle = {
          strokeWidth: 3,
          stroke: "#216477",
          outlineWidth: 5,
          outlineStroke: "white"
        },
        endpointHoverStyle = {
          fill: "#216477",
          stroke: "#216477"
        },
        // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
          endpoint: "Dot",
          paintStyle: {
            stroke: "#7AB02C",
            fill: "transparent",
            radius: 7,
            strokeWidth: 1
          },
          isSource: true,
          connector: [
            "Flowchart",
            {
              stub: [40, 60],
              gap: 10,
              cornerRadius: 5,
              alwaysRespectStubs: true
            }
          ],
          connectorStyle: connectorPaintStyle,
          hoverPaintStyle: endpointHoverStyle,
          connectorHoverStyle: connectorHoverStyle,
          dragOptions: {},
          overlays: [
            [
              "Label",
              {
                location: [0.5, 1.5],
                label: "Drag",
                cssClass: "endpointSourceLabel",
                visible: false
              }
            ]
          ]
        },
        // the definition of target endpoints (will appear when the user drags a connection)
        targetEndpoint = {
          endpoint: "Dot",
          paintStyle: { fill: "#7AB02C", radius: 7 },
          hoverPaintStyle: endpointHoverStyle,
          maxConnections: -1,
          dropOptions: { hoverClass: "hover", activeClass: "active" },
          isTarget: true,
          overlays: [
            [
              "Label",
              {
                location: [0.5, -0.5],
                label: "Drop",
                cssClass: "endpointTargetLabel",
                visible: false
              }
            ]
          ]
        },
        init = function(connection) {
          connection
            .getOverlay("label")
            .setLabel(
              connection.sourceId.substring(15) +
                "-" +
                connection.targetId.substring(15)
            );
        };

      var _addEndpoints = function(toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
          var sourceUUID = toId + sourceAnchors[i];
          instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
            anchor: sourceAnchors[i],
            uuid: sourceUUID
          });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
          var targetUUID = toId + targetAnchors[j];
          instance.addEndpoint("flowchart" + toId, targetEndpoint, {
            anchor: targetAnchors[j],
            uuid: targetUUID
          });
        }
      };

      // suspend drawing and initialise.
      instance.batch(function() {
        _addEndpoints(
          "Window4",
          ["TopCenter", "BottomCenter"],
          ["LeftMiddle", "RightMiddle"]
        );
        _addEndpoints(
          "Window2",
          ["LeftMiddle", "BottomCenter"],
          ["TopCenter", "RightMiddle"]
        );
        _addEndpoints(
          "Window3",
          ["RightMiddle", "BottomCenter"],
          ["LeftMiddle", "TopCenter"]
        );
        _addEndpoints(
          "Window1",
          ["LeftMiddle", "RightMiddle"],
          ["TopCenter", "BottomCenter"]
        );

        // listen for new connections; initialise them the same way we initialise the connections at startup.
        instance.bind("connection", function(connInfo, originalEvent) {
          init(connInfo.connection);
        });

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), {
          grid: [20, 20]
        });
        // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
        // method, or document.querySelectorAll:
        //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

        // connect a few up
        instance.connect({
          uuids: ["Window2BottomCenter", "Window3TopCenter"],
          editable: true
        });
        instance.connect({
          uuids: ["Window2LeftMiddle", "Window4LeftMiddle"],
          editable: true
        });
        instance.connect({
          uuids: ["Window4TopCenter", "Window4RightMiddle"],
          editable: true
        });
        instance.connect({
          uuids: ["Window3RightMiddle", "Window2RightMiddle"],
          editable: true
        });
        instance.connect({
          uuids: ["Window4BottomCenter", "Window1TopCenter"],
          editable: true
        });
        instance.connect({
          uuids: ["Window3BottomCenter", "Window1BottomCenter"],
          editable: true
        });
        //

        //
        // listen for clicks on connections, and offer to delete connections on click.
        //
        instance.bind("click", function(conn, originalEvent) {
          // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
          //   instance.detach(conn);
          conn.toggleType("basic");
        });

        instance.bind("connectionDrag", function(connection) {
          console.log(
            "connection " +
              connection.id +
              " is being dragged. suspendedElement is ",
            connection.suspendedElement,
            " of type ",
            connection.suspendedElementType
          );
        });

        instance.bind("connectionDragStop", function(connection) {
          console.log("connection " + connection.id + " was dragged");
        });

        instance.bind("connectionMoved", function(params) {
          console.log("connection " + params.connection.id + " was moved");
        });
      });

      jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });
  }
};
</script>

<style scoped>



.flowchart-demo .window {
  border: 1px solid #346789;
  box-shadow: 2px 2px 19px #aaa;
  -o-box-shadow: 2px 2px 19px #aaa;
  -webkit-box-shadow: 2px 2px 19px #aaa;
  -moz-box-shadow: 2px 2px 19px #aaa;
  -moz-border-radius: 0.5em;
  border-radius: 0.5em;
  opacity: 0.8;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  z-index: 20;
  position: absolute;
  background-color: #eeeeef;
  color: black;
  font-family: helvetica, sans-serif;
  padding: 0.5em;
  font-size: 0.9em;
  -webkit-transition: -webkit-box-shadow 0.15s ease-in;
  -moz-transition: -moz-box-shadow 0.15s ease-in;
  -o-transition: -o-box-shadow 0.15s ease-in;
  transition: box-shadow 0.15s ease-in;
}

.flowchart-demo .window:hover {
  box-shadow: 2px 2px 19px #444;
  -o-box-shadow: 2px 2px 19px #444;
  -webkit-box-shadow: 2px 2px 19px #444;
  -moz-box-shadow: 2px 2px 19px #444;
  opacity: 0.6;
}

.flowchart-demo .active {
  border: 1px dotted green;
}

.flowchart-demo .hover {
  border: 1px dotted red;
}

#flowchartWindow1 {
  top: 34em;
  left: 5em;
}

#flowchartWindow2 {
  top: 7em;
  left: 36em;
}

#flowchartWindow3 {
  top: 27em;
  left: 48em;
}

#flowchartWindow4 {
  top: 23em;
  left: 22em;
}

.flowchart-demo .jtk-connector {
  z-index: 4;
}

.flowchart-demo .jtk-endpoint,
.endpointTargetLabel,
.endpointSourceLabel {
  z-index: 21;
  cursor: pointer;
}

.flowchart-demo .aLabel {
  background-color: white;
  padding: 0.4em;
  font: 12px sans-serif;
  color: #444;
  z-index: 21;
  border: 1px dotted gray;
  opacity: 0.8;
  cursor: pointer;
}

.flowchart-demo .aLabel.jtk-hover {
  background-color: #5c96bc;
  color: white;
  border: 1px solid white;
}

.window.jtk-connected {
  border: 1px solid green;
}

.jtk-drag {
  outline: 4px solid pink !important;
}

path,
.jtk-endpoint {
  cursor: pointer;
}

.jtk-overlay {
  background-color: transparent;
}
</style>
