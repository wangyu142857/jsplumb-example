<template>
  <div class="container">
    <h1>{{msg}}</h1>
    <div class="block">
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    }
  }
};
</script>
<style scoped>
h1 {
  line-height: 160px;
  text-align: center;
  color: #41b883;
  font-weight: normal;
  font-size: 42px;
}
</style>


