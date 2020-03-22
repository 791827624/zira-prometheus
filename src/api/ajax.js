import axios from 'axios'
/*import router from '@/router/index.js'
import Vue from 'vue'*/
import { message } from 'ant-design-vue';
/*let that = {};
new Vue({
  router,
  data () {
    that = this;
    return {}
  }
});*/
/**
 * 配置拦截器
 */
axios.interceptors.response.use(res => {
    // 对响应数据做些什么
    return res
}, err => {
    // 对响应错误做些什么
    err.response.status === 404 && message.destroy() && message.error('请求异常，请检查网络!');
    err.response.status.toString().startsWith('5') && message.destroy() && message.error('服务器出错，请检查服务器状态!');
    return err
});
/**
 * 导出封装ajax函数对象
 * @param url
 * @param data
 * @param method
 * @param token
 * @param responseType
 * @returns {Promise<unknown>}
 */
export default function ajax (url, data = null, method = 'GET', token, responseType) {
    return new Promise((resolve, reject) => {
        let promise = {};
        const ajaxObj = {};

        !!url && ajaxObj.defineProperty('url', { value: url });
        !!data && ajaxObj.defineProperty('data', { value: data });
        !!method && ajaxObj.defineProperty('method', { value: method});
        !!token && ajaxObj.defineProperty('headers', { value: {   'Authorization':`Bearer ${token}` }});
        !!responseType && ajaxObj.defineProperty('responseType', { value: responseType});

        promise = axios(ajaxObj);

        promise.then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })

    })
}
