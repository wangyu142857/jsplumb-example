<template>
  <div class="jtk-demo">
    <div class="jtk-demo-canvas canvas-wide perimeter-demo jtk-surface jtk-surface-nopan" id="canvas">
                <div class="shape" data-shape="Rectangle">Rectangle</div>
                <div class="shape" data-shape="Ellipse">Ellipse</div>
                <div class="shape" data-shape="Circle">Circle</div>
                <div class="shape" data-shape="Diamond">Diamond</div>
                <div class="shape" data-shape="Triangle" style="left:700px;top:380px;">Triangle</div>
                <div class="shape _90" data-shape="Triangle" data-rotation="90" style="left:60px;top:500px;">90&#176; rotation</div>
            </div>
  </div>
</template>
<script>
export default {
  name: "PerimeterAnchors",
  data() {
    return {};
  },
  mounted() {
    jsPlumb.ready(function () {

    var instance = jsPlumb.getInstance({
        Connector: "StateMachine",
        PaintStyle: { strokeWidth: 3, stroke: "#ffa500", "dashstyle": "2 4" },
        Endpoint: [ "Dot", { radius: 5 } ],
        EndpointStyle: { fill: "#ffa500" },
        Container: "canvas"
    });

    var shapes = jsPlumb.getSelector(".shape");
    // make everything draggable
    instance.draggable(shapes);

    // suspend drawing and initialise.
    instance.batch(function () {

        // loop through them and connect each one to each other one.
        for (var i = 0; i < shapes.length; i++) {
            for (var j = i + 1; j < shapes.length; j++) {
                instance.connect({
                    source: shapes[i],  // just pass in the current node in the selector for source
                    target: shapes[j],
                    // here we supply a different anchor for source and for target, and we get the element's "data-shape"
                    // attribute to tell us what shape we should use, as well as, optionally, a rotation value.
                    anchors: [
                        [ "Perimeter", { shape: shapes[i].getAttribute("data-shape"), rotation: shapes[i].getAttribute("data-rotation") }],
                        [ "Perimeter", { shape: shapes[j].getAttribute("data-shape"), rotation: shapes[j].getAttribute("data-rotation") }]
                    ]
                });
            }
        }
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);
});
  }
};
</script>

<style scoped>
.demo {
    /* for IE10+ touch devices */
    touch-action:none;
}

/** JSPLUMB ARTEFACTS **/
.jtk-connector {
    z-index:1;
}

/** COMMON ELEMENT PROPERTIES **/
.shape {
    z-index:2;
    opacity:0.7;
    position:absolute;
    cursor:pointer;
    text-align:center;
    color:#333;
    display:flex;
    align-items: center;
    justify-content: center;
}

/** SHAPES **/

[data-shape=Rectangle] {
    width:210px;
    height:70px;
    left:380px;
    top:505px;
    background-image:url(../../images/rectangle.png);
}

[data-shape=Ellipse] {
    width:210px;
    height:70px;
    left:250px;
    top:300px;
    background-image:url(../../images/ellipse.png);
}

[data-shape=Circle] {
    width:150px;
    height:150px;
    left:100px;
    top:60px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-image:url(../../images/circle.png);
}

[data-shape=Triangle] {
    width:150px;
    height:150px;
    background-image:url(../../images/triangle.png);
}

._90[data-shape=Triangle] {
    width:150px;
    height:150px;
    background-image:url(../../images/triangle_90.png);
}

[data-shape=Diamond] {
    width:150px;
    height:150px;
    left:550px;
    top:150px;
    background-image:url(../../images/diamond.png);
}
</style>
