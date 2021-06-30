<template>
  <el-container class="container">
    <el-header>
      <span class="title">Jsplumb Admin</span>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <AppMenu />
      </el-aside>
      <el-main class="container">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMenu from '@/components/menu/AppMenu.vue';

export default {
  name: 'Layout',
  components: { AppMenu },
};
</script>
