import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/packages/theme-chalk/src/index.scss';
import router from '@/router/index';
import store from '@/store';
import App from './App.vue';
import 'normalize.css';
import 'style/index.scss';

const app = createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(store);

if (process.env.NODE_ENV === 'development') {
  app.config.devtools = true;
}

app.mount('#app');
// // jsplumb
// import 'jsplumb/dist/js/jsplumb.min.js';
// import 'jsplumb/css/jsplumbtoolkit-defaults.css';

// // html2canvas
// import html2canvas from 'html2canvas';
