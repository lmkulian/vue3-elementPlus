import router from './index'
// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// token判断方法
import { getToken } from '@/common';
// 从状态库中取出状态
import { useStore } from '@/store';

NProgress.configure({ showSpinner: false })
// 白名单
const whiteList = ['/login', '/404']

// 路由守卫
router.beforeEach((to, from, next) => {
    // 进度条
    NProgress.start()
    // 具体业务逻辑判断
    if (getToken()) {
        // 已登录且要跳转的页面是登录页
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            // 是否存在token
            if (useStore().memu.length === 0) {
                // 没有拉取用户信息
                useStore().onGetUserInfo().then(() => {
                    // 获取菜单列表
                    useStore().onGenerateRoutes().then((accessRoutes)=> {
                        // 根据roles权限生成可访问的路由表
                        if(from.query.redirect){
                            next({ path: from.query.redirect})
                        }
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                    })
                })
                    .catch((error) => {
                        // 获取用户信息失败 登出并重定向/
                        useStore().onLogOut().then(() => {
                            next({ path: '/' })
                        })
                    })
            } else {
                //路由、菜单加载ok
                useStore().onPushRouters(to)
                next()
            }
        }

    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            //白名单直接跳转
            next()
        } else {
            // 其他菜单跳转值登录界面
            next(`/login?redirect=${to.fullPath}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
})

