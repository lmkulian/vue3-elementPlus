import { defineStore } from 'pinia'
import { login, getUserInfo, loginOut, generateRoutes, passWordChange } from '@/api/admin'
import { ElMessage } from 'element-plus'
import router from '@/router'
import assembleRouter from '@/router/getMemuFormat.js'
export const useStore = defineStore('storeId', {
    state: () => {
        return {
            userInfo: {

            },
            memu: [],
            adminRouters: []
        }
    },
    getters:{},
    actions:{
        onPushRouters(router, Del = false){
            return new Promise((resolve,reject)=>{
                let status = null;
                // path 为唯一值
                this.adminRouters.forEach((item,index)=>{
                    if(item.path === router.path){
                        status = index;
                        return;
                    }
                })
                if(Del){
                    const delRoute = this.adminRouters[status]
                    this.adminRouters.splice(status, 1)
                    resolve({
                        delRoute, 
                        adminRouters: this.adminRouters
                    })
                }else if(!Del && status === null ){
                    if(this.adminRouters.length >= 10){
                        // 最大页面栈
                        // 先删后增
                        this.adminRouters.splice(0, 1)
                        this.adminRouters.push(router)
                        return;
                    }
                    this.adminRouters.push(router)
                }
            })
        },
        async onLogOut(){
            await loginOut().then(res=>{
                if(res.code !== 200){
                    ElMessage(res.message);
                }
                this.userInfo = {};
                this.memu = [];
                localStorage.removeItem('token');
            })
        },
        // 登录
        onUseLogin(data){
            return new Promise((resolve,reject)=>{
                login(data).then(res=>{
                    if(res.code !== 200){
                        ElMessage(res.message);
                        reject();
                    }
                    localStorage.setItem('token', res.data.token);
                    resolve(res.data);
                })
            }) 
        },
        // 获取用户信息
        onGetUserInfo(){
            return new Promise((resolve,reject)=>{
                getUserInfo().then(res=>{
                    if(res.code !== 200){
                        ElMessage(res.message);
                        reject();
                    }
                    this.userInfo = res.data;
                    sessionStorage.setItem('roles', res.data.roles);
                    resolve(res.data)
                })
            }); 
        },
        // 获取用户权限菜单
        onGenerateRoutes(){
            return new Promise((resolve,reject)=>{
                generateRoutes().then(res=>{
                    if(res.code !== 200){
                        ElMessage(res.message);
                        reject();
                    }
                    this.memu = res.data;
                    assembleRouter(res.data).forEach(item=>{
                        router.addRoute('layout',item);
                    })
                    resolve(res.data)
                })
            }) 
        },
        onPassWordChange(value){
            return new Promise((resolve,reject)=>{
                passWordChange({pass: value}).then(res=>{
                    if(res.code !== 200){
                        ElMessage(res.message);
                        reject();
                    }
                    ElMessage.success(res.message);
                    resolve(res.data)
                })
            })
        }
    }
})


export default useStore;
