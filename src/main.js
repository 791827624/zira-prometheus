import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import App from './App.vue';
import router from "./router/router";
import '@/plugins/element.js';
import '@/plugins/antd.js';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
