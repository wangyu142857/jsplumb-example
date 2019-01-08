<template>
  <div class="workplace-group"
       :id="id"
       :style="nodeStyle"
       :group="'g_' + id">
    <span class="title">{{text}}</span>
    <div class="ep"></div>
    <div class="content"></div>
    <div class="resize top"
         @mousedown.stop="resize($event, 'top')"></div>
    <div class="resize left"
         @mousedown.stop="resize($event, 'left')"></div>
    <div class="resize bottom"
         @mousedown.stop="resize($event, 'bottom')"></div>
    <div class="resize right"
         @mousedown.stop="resize($event, 'right')"></div>
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
  data () {
    return {
      isMove: false,
    };
  },
  mounted () {

  },
  methods: {
    /**
     * 缩放回调函数
     * @param {Event} e 
     * @param {str} 方向 left right top bottom
     */
    resize (e, type) {
      e.preventDefault();
      let _self = this
      this.isMove = true;

      //设置最小宽度。
      const minWidth = 200;
      const minHeight = 240;

      //获得父元素对象。
      let parent = e.target.parentNode;
      let pWidth = parent.offsetWidth
      let pHeight = parent.offsetHeight
      let top = parseInt(parent.style.top);
      let left = parseInt(parent.style.left);

      //获得当前鼠标位置。
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      document.onmousemove = function (docEvent) {
        if (_self.isMove) {
          //获得鼠标移动后的坐标。
          let currentMouseX = docEvent.clientX;
          let currentMouseY = docEvent.clientY;

          //计算出移动后的坐标。
          let moveWidth = currentMouseX - mouseX;
          let moveHeight = currentMouseY - mouseY;

          //计算宽高增加或减少的值，增加的量等于鼠标移位的量。
          let width;
          let height;

          switch (type) {
            case 'top':
              height = pHeight - moveHeight;
              if (height > minHeight) {
                parent.style.top = top + moveHeight + "px";
                parent.style.height = height + "px";
              }
              break;
            case 'right':
              width = pWidth + moveWidth;
              if (width > minWidth) {
                parent.style.width = width + "px";
              }
              break;
            case 'bottom':
              height = pHeight + moveHeight;
              if (height > minHeight) {
                parent.style.height = height + "px";
              }
              break;
            case 'left':
              width = pWidth - moveWidth;
              if (width > minWidth) {
                parent.style.left = left + moveWidth + "px";
                parent.style.width = width + "px";
              }
              break;

            default:
              break;
          }
          _self.$emit('resize',parent)


        }
      }
      document.onmouseup = function (event) {
        _self.isMove = false;
        document.onmousemove = function () { return; }
      }
    },
  }
};
</script>
<style lang="scss">
.workplace-group {
  margin: 0;
  cursor: pointer;
  border: 1px solid #ccc;
  position: absolute;
  padding-top: 24px;
  min-width: 200px;
  min-height: 250px;

  .title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 24px;
    line-height: 24px;
    padding-left: 10px;
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
  .content {
    width: 100%;
    height: 100%;
  }
  &:hover {
    .ep {
      opacity: 1;
    }
    .workplace-chart .ep {
      opacity: 0;
    }
  }
  &.dragHover {
    .ep {
      opacity: 0;
    }
    .workplace-chart .ep {
      opacity: 0;
    }
  }
  .workplace-chart:hover .ep {
    opacity: 0;
  }
  .resize {
    width: 8px;
    height: 8px;
    background-color: #ddd;
    border: 1px solid #000;
    position: absolute;
    &.left {
      top: 50%;
      left: -4px;
      cursor: ew-resize;
    }
    &.right {
      top: 50%;
      right: -4px;
      cursor: ew-resize;
    }
    &.top {
      top: -4px;
      left: 50%;
      margin-left: -4px;
      cursor: ns-resize;
    }
    &.bottom {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
      cursor: ns-resize;
    }
  }
}
</style>


