<!--
 * @Description: 本模块用于
 * @Author: wangyu
 * @Date: 2019-07-18 14:10:34
 * @LastEditors: wangyu
 * @LastEditTime: 2019-07-18 15:53:04
 -->
<template>
  <el-submenu
    v-if="menu.children && menu.children.length > 0"
    :key="menu.path"
    :index="menu.path"
  >
    <template #title>
      <i :class="'menu-icon fa fa-fw ' + menu.icon" />
      <span>{{ menu.title }}</span>
    </template>
    <SubMenu
      v-for="item in menu.children"
      :key="item.path"
      :menu="item"
    />
  </el-submenu>
  <el-menu-item
    v-else
    :key="menu.path"
    :index="`/layout${menu.path}`"
  >
    <i :class="'menu-icon fa fa-fw ' + menu.icon" />
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    menu: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
