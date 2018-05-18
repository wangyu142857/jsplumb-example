<template>
  <div class="container">
    <h1>{{msg}}</h1>
    <div class="block">
      <!-- <ul class="list">
        <li>github:<a href="https://github.com/wangyu142857/flow-chart">https://github.com/wangyu142857/flow-chart</a></li>
        <li>docs:<a href="https://github.com/wangyu142857/flow-chart/tree/master/docs">https://github.com/wangyu142857/flow-chart/tree/master/docs</a></li>
        <li>jsplumb:<a href="https://jsplumbtoolkit.com">https://jsplumbtoolkit.com</a></li>
      </ul> -->
      <img src="../images/logo.png" alt="">

    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to My Vue.js + JsPlumb.js App",
      currentPage: 5
    };
  },
  mounted() {},
  methods: {
    
  }
};
</script>
<style scoped lang="scss">
.block {text-align: center;}
h1 {
  line-height: 160px;
  text-align: center;
  color: #41b883;
  font-weight: normal;
  font-size: 42px;
}
.list {
  width: 600px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  color: #41b883;
}
</style>


