import request from '@/api/axios.js';

const login = (data)=>{
    return request({
        url: '/admin/login',
        method: 'post',
        data
    })
}

const getUserInfo = ()=>{
    return request({
        url: '/admin/userInfo',
        method: 'post'
    })
}

const loginOut = ()=>{
    return request({
        url: '/admin/loginOut',
        method: 'post'
    })
}

const generateRoutes = ()=>{
    return request({
        url: '/admin/memu',
        method: 'post'
    })
}

const passWordChange = (data)=>{
    return request({
        url: '/admin/passWordChange',
        method: 'post',
        data
    })
}

export {
    login,
    getUserInfo,
    loginOut,
    generateRoutes,
    passWordChange
}