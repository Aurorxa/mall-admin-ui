import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

// 公开的路由表
const publicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录页面'
        },
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/',
        component: () => import('@/views/Layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: () => import('@/views/Home/index.vue')
            },
            {
                path: '404',
                name: '404',
                component: () => import('@/views/404/index.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: () => {
            return {name: '404'}
        },
    },
]

// 私有的路由表
const privateRoutes: Array<RouteRecordRaw> = [
    {
        path: '/system',
        component: () => import('@/views/Layout/index.vue'),
        redirect: '/system/user',
        meta: {
            title: '系统设置',
            icon: ''
        },
        children: [
            {
                path: '/system/user',
                name: 'user',
                component: () => import( '@/views/System/User/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: ''
                }
            },
            {
                path: '/system/role',
                name: 'role',
                component: () => import( '@/views/System/Role/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: ''
                }
            },
        ]
    },
]

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: [...publicRoutes, ...privateRoutes]
})


// 暴露路由
export default router
