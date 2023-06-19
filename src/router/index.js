import {createRouter,createWebHashHistory} from 'vue-router';
import { showFailToast} from 'vant';
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {//默认路由：直接引入首页
            path:'/',
            component:() => import('../views/home/index.vue')
        },
        {
            path:'/home',
            component:() => import('../views/home/index.vue')
        },
        {
            path:'/cart',
            component:() => import('../views/cart/index.vue'),
            meta:{
                //需要路由守卫
                isAuth:true
            }
        },
        {
            path:'/order',
            component:() => import('../views/order/index.vue'),
            meta:{
                //需要路由守卫
                isAuth:true
            }
        },
        {
            path:'/my',
            component:() => import('../views/my/index.vue'),
            meta:{
                //需要路由守卫
                isAuth:true
            }
        },
        {
            path:'/store',
            component:() => import('../views/store/index.vue')
        },
        {
            path:'/createOrder',
            component:() => import('../views/createOrder/index.vue'),
            meta:{
                //需要路由守卫
                isAuth:true
            }
        },
        {
            path:'/address',
            component:() => import('../views/address/index.vue'),
            meta:{
                //需要路由守卫
                isAuth:true
            }
        },
        {
            path:'/addressedit',
            component:() => import('../views/addressEdit/index.vue'),
            meta:{
                //需要路由守卫
                isAuth:true
            }
        },
        {
            path:'/userinfoedit',
            component:() => import('../views/userinfoedit/index.vue'),
            meta:{
                //需要路由守卫
                isAuth:true
            }
        },
        {
            path:'/login',
            component:() => import('../views/login/index.vue')
        },
        {
            path:'/register',
            component:() => import('../views/register/index.vue')
        }
    ]
})
//路由守卫
router.beforeEach((to,from,next) => {
    //如果需要先登录
    if(to.meta.isAuth){
        //登录成功
        if(localStorage.isLogin === 'login'){
            //直接跳转
            next()
        //强制跳回登录页
        }else{
            next('/login');
            showFailToast('请先去登录');
        }
    //不需要登录
    }else{
        //直接跳转
        next();
    }
})
export default router