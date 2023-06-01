import { defineStore } from 'pinia'
import { login, getUserInfo, loginOut, generateRoutes } from '@/api/admin'
import { ElMessage } from 'element-plus'
import router from '@/router'
import assembleRouter from '@/router/getMemuFormat.js'
export const useStore = defineStore('storeId', {
    state: () => {
        return {
            userInfo: {

            },
            memu: []
        }
    },
    getters:{},
    actions:{
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
        }
    }
})


export default useStore;
