import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const router = new  VueRouter({
    mode:'history',
    routes:[
        {path:'/',redirect:'/login'},
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

router.beforeEach((to,from,next) => {
    if (to.path === '/login') return next()

    const tokenStr = window.localStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()

})

export default router
