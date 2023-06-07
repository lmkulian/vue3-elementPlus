export default [
    {
        url: '/menu/update',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: '更新成功',
                data: {}
            }
        }
    }
]
