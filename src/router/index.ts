import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

// 路由表
const publicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/',
        component: () => import('@/views/Layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
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

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: [...publicRoutes]
})

// 暴露路由
export default router
