export default [
    {
        url: '/menu/del',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: '删除成功',
                data: {}
            }
        }
    }
]
