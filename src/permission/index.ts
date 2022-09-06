import {NavigationGuardNext, RouteLocationNormalized} from "vue-router"
import router from "@/router";
import {useAdminStore} from '@/store/ums/admin'

// 白名单
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const {saToken} = useAdminStore()
    if (saToken) { // 如果用户已经登录，则不允许进去登录页面，主要为了防止重复登录
        if (to.path == '/login') {
            next({name: 'home'}) // 强制进入首页
        } else {
            // TODO 此处还可以向后端发送请求获取用户的信息，并存储到 store 中
            next()
        }
    } else { // 如果用户没有登录，则只允许进入登录页面
        if (whiteList.includes(to.path)) { // 判断请求路径是否在白名单
            next() // 放行
        } else {
            next('/login')
        }
    }
})

export default router
