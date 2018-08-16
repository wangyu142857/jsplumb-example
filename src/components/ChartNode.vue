<template>
  <div class="workplace-chart" :id="id" :style="nodeStyle" @dblclick="handleNodeDbclick">
    <i :class="[icon,type]"></i>
    <span>{{text}}</span>
    <div class="ep"></div>
  </div>
</template>
<script>
export default {
  name: "ChartNode",
  // props 验证
  props: {
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    nodeStyle: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    handleNodeDbclick() {
      this.$emit("edit")
    }
  }
};
</script>
<style lang="scss">
.workplace-chart {
  text-align: center;
  margin: 0;
  cursor: pointer;
  padding: 10px;
  i {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 20px;
    color: #409eff;
    cursor: pointer;
    margin-bottom: 5px;
    touch-action: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    &.circle {
      background-image: url(../images/circle.png);
      width: 60px;
      height: 60px;
      line-height: 60px;
      background-size: 100%;
    }
    &.diamond {
      background-image: url(../images/diamond.png);
      width: 60px;
      height: 60px;
      line-height: 60px;
      background-size: 100%;
    }
  }
  span {
    display: block;
  }
  .ep {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: 10px;
    background: #409eff;
    border-radius: 5px;
  }
  &:hover {
    .ep {
      opacity: 1;
    }
  }
  &.dragHover {
    .ep {
      opacity: 0;
    }
  }
}
</style>


