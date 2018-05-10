<template>
  <div id="app">
    <el-container class="container">
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      
    </el-container>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
export default {
  name: "App",
  components:{
    MyHeader
  }
};
</script>

