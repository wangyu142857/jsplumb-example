// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// axios
import axios from 'axios'
Vue.prototype.$axios = axios;

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// style
import './style/index.scss';
import './style/jsplumb-demo.scss';
// jsplumb
import 'jsplumb/dist/js/jsplumb.min.js';
import 'jsplumb/dist/css/jsplumbtoolkit-defaults.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
