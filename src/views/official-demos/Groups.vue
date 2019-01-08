<template>
  <div class="jtk-demo">
    <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan"
         id="canvas">
      <div class="group-container"
           id="container1"
           group="one">
        <div class="title"></div>
        <ul>
          <li>Elements constrained to group (
            <strong>constrain:true</strong>)</li>
          <li>Elements are draggable to other groups </li>
          <li>Deletes group and children</li>
          <li>Not droppable (
            <strong>droppable:false</strong>)</li>
        </ul>
        <div class="del"
             delete-all></div>
        <div class="node-collapse"></div>
        <div id="c1_1"
             class="w"
             style="left:30px;top:35px">1.1</div>
        <div id="c1_2"
             class="w"
             style="left:160px;top:140px">1.2</div>
      </div>

      <div class="group-container"
           id="container2"
           group="two">
        <div class="title"></div>
        <ul>
          <li>Elements are reverted on drop outside (
            <strong>revert:true</strong>)</li>
          <li>Elements not draggable to other groups (
            <strong>dropOverride:true</strong>)</li>
          <li>Deletes group only</li>
        </ul>
        <div class="del"></div>
        <div class="node-collapse"></div>
        <div id="c2_1"
             class="w"
             style="left:30px;top:40px">2.1</div>
        <div id="c2_2"
             class="w"
             style="left:150px;top:160px">2.2</div>
      </div>

      <div class="group-container"
           id="container3"
           group="three">
        <div class="title"></div>
        <ul>
          <li>Elements may be dragged outside bounds (
            <strong>revert:false</strong>)</li>
          <li>Elements are draggable to other groups</li>
          <li>Deletes group only</li>
        </ul>
        <div class="del"></div>
        <div class="node-collapse"></div>
        <div id="c3_1"
             class="w"
             style="left:30px;top:35px">3.1</div>
        <div id="c3_2"
             class="w"
             style="left:80px;top:162px">3.2</div>
      </div>

      <div class="group-container"
           id="container4"
           group="four">
        <div class="title"></div>
        <ul>
          <li>Elements pruned on drop outside (
            <strong>prune:true</strong>)</li>
          <li>Elements are draggable to other groups</li>
          <li>Deletes group and children</li>
        </ul>
        <div class="del"
             delete-all></div>
        <div class="node-collapse"></div>
        <div id="c4_1"
             class="w"
             style="left:30px;top:35px">4.1</div>
        <div id="c4_2"
             class="w"
             style="left:110px;top:150px">4.2</div>
      </div>

      <div class="group-container"
           id="container5"
           group="five">
        <div class="title"></div>
        <ul>
          <li>Elements orphaned on drop outside (
            <strong>orphan:true</strong>)</li>
          <li>Elements are draggable to other groups</li>
          <li>Deletes group only</li>
          <li>Not droppable (
            <strong>droppable:false</strong>)</li>
        </ul>
        <div class="del"></div>
        <div class="node-collapse"></div>
        <div id="c5_1"
             class="w"
             style="left:30px;top:35px">5.1</div>
        <div id="c5_2"
             class="w"
             style="left:140px;top:130px">5.2</div>
      </div>

      <div class="group-container"
           id="container6"
           group="six">
        <div class="title"></div>
        <ul>
          <li>No connections shown when group collapsed (
            <strong>proxied:false</strong>)</li>
          <li>Elements are draggable to other groups</li>
          <li>Deletes group and children</li>
        </ul>
        <div class="del"
             delete-all></div>
        <div class="node-collapse"></div>
        <div id="c6_1"
             class="w"
             style="left:160px;top:45px">6.1</div>
        <div id="c6_2"
             class="w"
             style="left:30px;top:150px">6.2</div>
      </div>

      <div class="group-container"
           id="container7"
           group="seven">
        <div class="title"></div>
        <ul>
          <li>Elements are draggable to other groups, using ghost proxy (
            <strong>ghost:true</strong>)</li>
          <li>Deletes group and children</li>
        </ul>
        <div class="del"
             delete-all></div>
        <div class="node-collapse"></div>
        <div id="c7_1"
             class="w"
             style="left:30px;top:35px">7.1</div>
        <div id="c7_2"
             class="w"
             style="left:90px;top:150px">7.2</div>
      </div>

      <div class="w"
           id="standalone"
           style="left:455px;top:280px"
           title="drag me into a group. if you want to.">?</div>

      <div class="events">
        <h3>Events</h3>
        <div id="events"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Groups",
  data () {
    return {};
  },
  mounted () {
    jsPlumb.ready(function () {
      var j = (window.j = jsPlumb.getInstance({
        Container: canvas,
        Connector: "StateMachine",
        Endpoint: ["Dot", { radius: 3 }],
        Anchor: "Center"
      }));

      j.bind("connection", function (p) {
        p.connection.bind("click", function () {
          j.detach(this);
        });
      });

      var evts = document.querySelector("#events");
      var _appendEvent = function (name, detail) {
        evts.innerHTML =
          "<br/><strong>" +
          name +
          "</strong><br/> " +
          detail +
          "<br/>" +
          evts.innerHTML;
      };
      j.bind("group:addMember", function (p) {
        console.log(p)
        _appendEvent("group:addMember", p.group.id + " - " + p.el.id);
      });
      j.bind("group:removeMember", function (p) {
        _appendEvent("group:removeMember", p.group.id + " - " + p.el.id);
      });
      j.bind("group:expand", function (p) {
        _appendEvent("group:expand", p.group.id);
      });
      j.bind("group:collapse", function (p) {
        _appendEvent("group:collapse", p.group.id);
      });
      j.bind("group:add", function (p) {
        _appendEvent("group:add", p.group.id);
      });
      j.bind("group:remove", function (p) {
        _appendEvent("group:remove", p.group.id);
      });

      // connect some before configuring group
      j.connect({ source: c1_1, target: c2_1 });
      j.connect({ source: c2_1, target: c3_1 });
      j.connect({ source: c2_2, target: c6_2 });
      j.connect({ source: c3_1, target: c4_1 });
      j.connect({ source: c4_1, target: c5_1 });
      j.connect({ source: c1_1, target: c1_2 });
      j.connect({ source: c2_1, target: c2_2 });

      // NOTE ordering here. we make one draggable before adding it to the group, and we add the other to the group
      //before making it draggable. they should both be constrained to the group extents.
      j.draggable(c1_1);
      j.addGroup({
        el: container1,
        id: "one",
        constrain: true,
        anchor: "Continuous",
        endpoint: "Blank",
        droppable: false
      });
      j.addToGroup("one", c1_1);
      j.addToGroup("one", c1_2);
      j.draggable(c1_2);

      j.draggable(c2_1);
      j.addGroup({
        el: container2,
        id: "two",
        dropOverride: true,
        dropOptions: {
          drop(p) {
            console.log(p)
          }
        },
        endpoint: ["Dot", { radius: 3 }]
      }); //(the default is to revert)
      j.addToGroup("two", c2_1);
      j.addToGroup("two", c2_2);
      j.draggable(c2_2);

      j.draggable(c3_1);
      j.addGroup({
        el: container3,
        id: "three",
        revert: false,
        endpoint: ["Dot", { radius: 3 }]
      });
      j.addToGroup("three", c3_1);
      j.addToGroup("three", c3_2);
      j.draggable(c3_2);

      j.draggable(c4_1);
      j.addGroup({
        el: container4,
        id: "four",
        prune: true,
        endpoint: ["Dot", { radius: 3 }]
      });
      j.addToGroup("four", c4_1);
      j.addToGroup("four", c4_2);
      j.draggable(c4_2);

      j.draggable(c5_1);
      j.addGroup({
        el: container5,
        id: "five",
        orphan: true,
        droppable: false,
        endpoint: ["Dot", { radius: 3 }]
      });
      j.addToGroup("five", [c5_1, c5_2]);
      j.draggable(c5_2);

      j.draggable(c6_1);
      j.addGroup({
        el: container6,
        id: "six",
        proxied: false,
        endpoint: ["Dot", { radius: 3 }]
      });
      j.addToGroup("six", [c6_1, c6_2]);
      j.draggable(c6_2);

      j.draggable(c7_1);
      j.addGroup({
        el: container7,
        id: "seven",
        ghost: true,
        endpoint: ["Dot", { radius: 3 }]
      });
      j.addToGroup("seven", [c7_1, c7_2]);
      j.draggable(c7_2);

      // the independent element that demonstrates the fact that it can be dropped onto a group
      j.draggable("standalone");

      //... and connect others afterwards.
      j.connect({ source: c3_1, target: c3_2 });
      j.connect({ source: c4_1, target: c4_2 });
      j.connect({ source: c5_1, target: c5_2 });
      j.connect({ source: c5_1, target: c3_2 });
      j.connect({
        source: c5_1,
        target: container5,
        anchors: ["Center", "Continuous"]
      });
      j.connect({ source: c5_2, target: c6_1 });
      j.connect({ source: c6_2, target: c7_1 });

      // delete group button
      j.on(canvas, "click", ".del", function () {
        var g = this.parentNode.getAttribute("group");
        j.removeGroup(g, this.getAttribute("delete-all") != null);
      });

      // collapse/expand group button
      j.on(canvas, "click", ".node-collapse", function () {
        var g = this.parentNode.getAttribute("group"),
          collapsed = j.hasClass(this.parentNode, "collapsed");

        j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
        j[collapsed ? "expandGroup" : "collapseGroup"](g);
      });

      jsPlumb.fire("jsPlumbDemoLoaded", j);
    });
  }
};
</script>

<style scoped>
.w {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  font-size: 12px;
  border-radius: 3px;
  text-align: center;
  background-color: WhiteSmoke;
  opacity: 0.7;
  z-index: 10;
  color: black;
  cursor: move;
}

.w:hover {
  background-color: #629f8d;
}

.group-container {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background-color: WhiteSmoke;
  font-size: 12px;
  cursor: move;
}

.group-container ul {
  margin-left: 25px;
  padding: 0;
}

.group-container ul li {
  list-style-type: circle;
  margin-bottom: 7px;
}

.large {
  width: 600px;
  height: 600px;
}

.group-container.collapsed {
  height: 40px;
}

.title {
  background-color: #abc1bb;
  padding-right: 16px;
  font-size: 13px;
  height: 30px;
}

#container1 {
  left: 20px;
  top: 50px;
}
#container2 {
  left: 250px;
  top: 50px;
}
#container3 {
  left: 480px;
  top: 50px;
}
#container4 {
  left: 710px;
  top: 50px;
}
#container5 {
  left: 600px;
  top: 340px;
}
#container6 {
  left: 370px;
  top: 340px;
}
#container7 {
  left: 140px;
  top: 340px;
}

.del,
.node-collapse {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: white;
  padding: 1px;
  cursor: pointer;
  font-size: 13px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  display: block;
}

.del:after {
  content: "X";
}

.node-collapse {
  right: 29px;
  text-align: center;
}

.node-collapse:after {
  content: "-";
}

.group-container.collapsed .node-collapse:after {
  content: "+";
}

.del[delete-all] {
  background-color: pink;
}

.jtk-connector path {
  stroke-width: 1;
}

.jtk-group-collapsed .w,
.jtk-group-collapsed ul,
.jtk-group-collapsed .container,
.jtk-group-collapsed .name {
  display: none;
}

.jtk-drag-hover {
  outline: 4px solid cornflowerblue;
}

.katavorio-ghost-proxy {
  outline: 2px solid red;
}

.events {
  position: absolute;
  right: 0;
  top: 0;
  border-left: 4px solid #58775d;
  bottom: 0;
  width: 156px;
  font-size: 11px;
  padding-left: 11px;
  background-color: white;
}

#events {
  position: absolute;
  right: 0;
  top: 0;
  border-left: 1px solid #58775d;
  bottom: 0;
  width: 256px;
  font-size: 11px;
  padding-left: 11px;
  background-color: white;
}

.events h3 {
  font-size: 20px;
  margin-top: 10px;
}
</style>
