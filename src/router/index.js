import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { 
        path: '/', 
        name: 'layout',
        component: ()=> import('@/views/layout/index.vue'),
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: '首页',
                component: ()=> import('@/views/index/index.vue')
            }
        ]
    },
    { 
        path: '/login', 
        component: ()=> import('@/views/login/index.vue')
    },
]


const router = createRouter({
    history: createWebHistory('/'),
    routes,
    // 滚动行为，切换页面就置顶
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
});

export default router;