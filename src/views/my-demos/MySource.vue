<template>
  <div class="jtk-demo">
    <div class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan" id="canvas">
      <div class="w" id="opened">BEGIN
        <div class="ep" action="begin"></div>
      </div>
      <div class="w" id="phone1">PHONE INTERVIEW 1
        <div class="ep" action="phone1"></div>
      </div>
      <div class="w" id="phone2">PHONE INTERVIEW 2
        <div class="ep" action="phone2"></div>
      </div>
      <div class="w" id="inperson">IN PERSON
        <div class="ep" action="inperson"></div>
      </div>
      <div class="w" id="rejected">REJECTED
        <div class="ep" action="rejected"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MySource",
  data() {
    return {};
  },
  mounted() {
    jsPlumb.ready(function() {
      // setup some defaults for jsPlumb.
      var instance = jsPlumb.getInstance({
        Endpoint: ["Dot", { radius: 2 }],
        Connector: "StateMachine",
        HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
        ConnectionOverlays: [
          [
            "Arrow",
            {
              location: 1,
              id: "arrow",
              length: 14,
              foldback: 0.8
            }
          ],
          ["Label", { label: "FOO", id: "label", cssClass: "aLabel" }]
        ],
        Container: "canvas"
      });

      instance.registerConnectionType("basic", {
        anchor: "Continuous",
        connector: "StateMachine"
      });

      window.jsp = instance;

      var canvas = document.getElementById("canvas");
      var windows = jsPlumb.getSelector(".statemachine-demo .w");

      // bind a click listener to each connection; the connection is deleted. you could of course
      // just do this: instance.bind("click", instance.deleteConnection), but I wanted to make it clear what was
      // happening.
      /* instance.bind("click", function(c) {
        instance.deleteConnection(c);
      }); */

      // bind a connection listener. note that the parameter passed to this function contains more than
      // just the new connection - see the documentation for a full list of what is included in 'info'.
      // this listener sets the connection's internal
      // id as the label overlay's text.
      instance.bind("connection", function(info) {
        info.connection.getOverlay("label").setLabel(info.connection.id);
      });

      // bind a double click listener to "canvas"; add new node when this occurs.
      jsPlumb.on(canvas, "dblclick", function(e) {
        newNode(e.offsetX, e.offsetY);
      });

      //
      // initialise element as connection targets and source.
      //
      var initNode = function(el) {
        // initialise draggable elements.
        instance.draggable(el);

        instance.makeSource(el, {
          filter: ".ep",
          // anchor: "Continuous",
          anchor: ["Perimeter",{shape:'Rectangle'}],
          connectorStyle: {
            stroke: "#5c96bc",
            strokeWidth: 2,
            outlineStroke: "transparent",
            outlineWidth: 4
          },
          connectionType: "basic",
          extract: {
            action: "the-action"
          },
          maxConnections: 2,
          onMaxConnections: function(info, e) {
            alert("Maximum connections (" + info.maxConnections + ") reached");
          }
        });

        instance.makeTarget(el, {
          dropOptions: { hoverClass: "dragHover" },
          anchor: ["Perimeter",{shape:'Rectangle'}],
          allowLoopback: true
        });

        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //
        instance.fire("jsPlumbDemoNodeAdded", el);
      };

      var newNode = function(x, y) {
        var d = document.createElement("div");
        var id = jsPlumbUtil.uuid();
        d.className = "w";
        d.id = id;
        d.innerHTML = id.substring(0, 7) + '<div class="ep"></div>';
        d.style.left = x + "px";
        d.style.top = y + "px";
        instance.getContainer().appendChild(d);
        initNode(d);
        return d;
      };

     

      jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });
  }
};
</script>

<style>
.w {
  padding: 16px;
  position: absolute;
  z-index: 4;
  border: 1px solid #2e6f9a;
  box-shadow: 2px 2px 19px #e0e0e0;
  -o-box-shadow: 2px 2px 19px #e0e0e0;
  -webkit-box-shadow: 2px 2px 19px #e0e0e0;
  -moz-box-shadow: 2px 2px 19px #e0e0e0;
  -moz-border-radius: 8px;
  border-radius: 8px;
  opacity: 0.8;
  cursor: move;
  background-color: white;
  font-size: 11px;
  -webkit-transition: background-color 0.25s ease-in;
  -moz-transition: background-color 0.25s ease-in;
  transition: background-color 0.25s ease-in;
}

.w:hover {
  background-color: #5c96bc;
  color: white;
}

.aLabel {
  -webkit-transition: background-color 0.25s ease-in;
  -moz-transition: background-color 0.25s ease-in;
  transition: background-color 0.25s ease-in;
}

.aLabel.jtk-hover,
.jtk-source-hover,
.jtk-target-hover {
  background-color: #1e8151;
  color: white;
}

.aLabel {
  background-color: white;
  opacity: 0.8;
  padding: 0.3em;
  border-radius: 0.5em;
  border: 1px solid #346789;
  cursor: pointer;
}

.ep {
  position: absolute;
  bottom: 37%;
  right: 5px;
  width: 1em;
  height: 1em;
  background-color: orange;
  cursor: pointer;
  box-shadow: 0 0 2px black;
  -webkit-transition: -webkit-box-shadow 0.25s ease-in;
  -moz-transition: -moz-box-shadow 0.25s ease-in;
  transition: box-shadow 0.25s ease-in;
}

.ep:hover {
  box-shadow: 0 0 6px black;
}

.statemachine-demo .jtk-endpoint {
  z-index: 3;
}

#opened {
  left: 10em;
  top: 5em;
}

#phone1 {
  left: 35em;
  top: 12em;
  width: 7em;
}

#inperson {
  left: 12em;
  top: 23em;
}

#phone2 {
  left: 28em;
  top: 24em;
}

#rejected {
  left: 10em;
  top: 35em;
}

.dragHover {
  border: 2px solid orange;
}

path,
.jtk-endpoint {
  cursor: pointer;
}
</style>
