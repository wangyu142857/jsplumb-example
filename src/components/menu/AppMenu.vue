<template>
  <el-menu
    class="app-menu"
    :router="true"
    :unique-opened="true"
    :default-active="defaultRoute"
  >
    <SubMenu
      v-for="item in menu"
      :key="item.path"
      :menu="item"
    />
  </el-menu>
</template>

<script>
import menu from '@/utils/menu';
import SubMenu from './SubMenu.vue';

export default {
  name: 'AppMenu',
  components: { SubMenu },
  data() {
    return {
      menu,
    };
  },
  computed: {
    defaultRoute() {
      return this.$route.path;
    },
  },
};
</script>
