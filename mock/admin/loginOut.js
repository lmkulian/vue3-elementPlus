export default [
    {
        url: '/admin/loginOut',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: '登出成功',
                data: {}
            }
        }
    }
]
