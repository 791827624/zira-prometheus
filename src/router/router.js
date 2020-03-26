import Vue from "vue";
import VueRouter from 'vue-router'
import('../components/mainpage.vue')
import('../components/login.vue')
Vue.use(VueRouter);

const router = new  VueRouter({
    routes:[
        {
            path:'/login',
            component:()=>import('../components/login.vue')
        },
        {
            path:'/main-page',
            component:()=>import('../components/mainpage.vue')
        },
        {
            path:'/',
            component:()=>import('../components/login.vue')
        }
    ]
})

export default router