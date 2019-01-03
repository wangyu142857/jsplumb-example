<template>
	<div id="header">

		<el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="/">首页</el-menu-item>
			<el-submenu index="2">
				<template slot="title">官方demo</template>
				<el-menu-item index="/flow-chart">FlowChart</el-menu-item>
				<el-menu-item index="/chart">Hierarchical Chart</el-menu-item>
				<el-menu-item index="/state-machine">state machine</el-menu-item>
				<el-menu-item index="/perimeter-anchors">perimeter-anchors</el-menu-item>
				<el-menu-item index="/drag-and-drop">drag and drop</el-menu-item>
				<el-menu-item index="/dynamic-anchors">dynamic anchors</el-menu-item>
				<el-menu-item index="/groups">groups</el-menu-item>
				<el-menu-item index="/sources-and-targets">sources and targets</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">my demo</template>
				<el-menu-item index="/my-hello">demo-hello-world</el-menu-item>
				<el-menu-item index="/my-drag">my-drag</el-menu-item>
				<el-menu-item index="/my-overlay">my-overlay</el-menu-item>
				<el-menu-item index="/my-source">my-source</el-menu-item>
				<el-menu-item index="/my-groups">my-groups</el-menu-item>
			</el-submenu>
			<el-menu-item index="/drag-to-workplace">drag to workplace</el-menu-item>
			<el-menu-item index="/demo-chart">demo-chart</el-menu-item>
		</el-menu>
	</div>
</template>


<script>
export default {
  name: "MyHeader",
  data() {
    return {
    };
  },
  mounted() {
    console.log();
    
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
