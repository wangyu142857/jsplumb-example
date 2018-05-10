<template>
  <div class="container">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to My Vue.js + JsPlumb.js App"
    };
  },
  mounted() {
    
  }
};
</script>
<style scoped>
h1{
  line-height: 160px;
  text-align: center;
  color: #41B883;
  font-weight: normal;
  font-size: 48px;
}
</style>


