import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/store'

const onUpdatePassword = ()=>{
    const Store = useStore();
    ElMessageBox.prompt('请输入您的新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:
          /^\w+$/, // 验证由数字、26个英文字母或者下划线组成的字符串。 这块也是百度抄来的，可自行修改
        inputErrorMessage: 'Invalid PassWord',
    })
    .then(({ value }) => {
        Store.onPassWordChange(value)
    }).catch(e=>{

    })
}


export {
    onUpdatePassword
}

export default onUpdatePassword;