import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import App from './App.vue';
import router from "./router/router";
import '@/plugins/element.js';
import '@/plugins/antd.js';
import {Message} from "element-ui";
import {getRequest} from './api/api'
import {postRequest} from './api/api'
import {deleteRequest} from './api/api'
import {putRequest} from './api/api'
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

Vue.config.productionTip = false
Vue.prototype.$message = Message

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
