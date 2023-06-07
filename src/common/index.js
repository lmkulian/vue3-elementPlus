import { useStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router';
import onUpdatePassword from './updatePass';

const getToken = () => {
    if (useStore().userInfo.token || localStorage.getItem('token')) return true;
    return false;
}

// 退出登录
const loginOut = () => {
    const Store = useStore();
    ElMessageBox.confirm(
        '确定退出当前账号登录？',
        '确认消息',
        {
            confirmButtonText: '确定',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
    .then(() => {
        Store.onLogOut().then(()=>{
            ElMessage({
                type: 'success',
                message: '成功登出',
            })
            setTimeout(_=>{
                router.push('/login')
            }, 500)
        })
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: '取消登出',
        })
    })
}



export {
    getToken,
    loginOut,
    onUpdatePassword as updatePassword
}