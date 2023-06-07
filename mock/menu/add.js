export default [
    {
        url: '/menu/add',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: '新增成功',
                data: {}
            }
        }
    }
]
