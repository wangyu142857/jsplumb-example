<template>
  <div class="jtk-demo">
    <div class="jtk-demo-canvas canvas-wide drag-drop-demo jtk-surface jtk-surface-nopan" id="canvas">
      <div class="window" id="dragDropWindow2">two
      </div>
      <div class="window" id="dragDropWindow3">three
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyDrag",
  data() {
    return {};
  },
  mounted() {
    jsPlumb.ready(function() {
      var instance = jsPlumb.getInstance({
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        PaintStyle: { stroke: "#666" },
        EndpointHoverStyle: { fill: "orange" },
        HoverPaintStyle: { stroke: "orange" },
        EndpointStyle: { width: 20, height: 16, stroke: "#666" },
        Endpoint: "Rectangle",
        Anchors: ["TopCenter", "TopCenter"],
        Container: "canvas"
      });

      // suspend drawing and initialise.
      instance.batch(function() {
       instance.bind("click", function(component, originalEvent) {
          alert("click!");
        });

        // configure some drop options for use by all endpoints.
        var exampleDropOptions = {
          tolerance: "touch",
          hoverClass: "dropHover",
          activeClass: "dragActive"
        };

        // the second example uses a Dot of radius 15 as the endpoint marker, is both a source and target,
        // and has scope 'exampleConnection2'.
        //
        var color2 = "#316b31";
        var exampleEndpoint2 = {
          endpoint: ["Dot", { radius: 11 }],
          paintStyle: { fill: color2 },
          isSource: true,
          scope: "green",
          connectorStyle: { stroke: color2, strokeWidth: 6 },
          connector: ["Bezier", { curviness: 63 }],
          maxConnections: 3,
          isTarget: true,
          dropOptions: exampleDropOptions
        };

        instance.addEndpoint(
          "dragDropWindow2",
          { anchor: "RightMiddle" },
          exampleEndpoint2
        );

        instance.addEndpoint(
          "dragDropWindow3",
          { anchor: "RightMiddle" },
          exampleEndpoint2
        );

        // make .window divs draggable
        instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));
      });

      jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });
  }
};
</script>

<style scoped>
/** ELEMENT POSITIONS **/
#dragDropWindow2 { top:300px; left:600px; }
#dragDropWindow3 { top:300px; left:100px; }

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
    border-radius: 0.5em;
    position: absolute;
    color: black;
    padding-top: 5px;
    width: 140px;
    height: 120px;
    line-height: 12px;
    transition: box-shadow 0.15s ease-in;
}

.window:hover {
    border:1px solid #123456;
    box-shadow: 2px 2px 19px #444;
    -o-box-shadow: 2px 2px 19px #444;
    -webkit-box-shadow: 2px 2px 19px #444;
    -moz-box-shadow: 2px 2px 19px #fff;
    opacity:0.9;
}


.drag-drop-demo a, .drag-drop-demo a:visited {
    color:#057D9F;
}

.drag-drop-demo a:hover {
    color:orange;
}

/** LINKS IN WINDOWS **/
.drag-locked { border:1px solid red; }
.cmdLink { font-size:0.80em;}

/** DRAG/DROP CLASSES **/
.dragActive { border:2px dotted orange; }
.dropHover { border:1px dotted red; }

path, .jtk-endpoint { cursor:pointer; }

</style>
