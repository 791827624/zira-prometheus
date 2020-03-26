import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import App from './App.vue';
// import mainpage from './components/mainpage.vue';
// import login from './components/login.vue';
import router from "./router/router";
import '@/plugins/element.js';
import '@/plugins/antd.js';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
// new Vue({
//   router,
//   render: h => h(login),
//   template:"<App/>",
// }).$mount('#app-2')
