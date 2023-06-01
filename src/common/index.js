import { useStore } from '@/store'

const getToken = ()=> {
    if(useStore().userInfo.token  || localStorage.getItem('token')) return true;
    return false;
}


export {
    getToken
}