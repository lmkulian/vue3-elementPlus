export default [
    {
        url: '/admin/passWordChange',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: 'success',
                data: {}
            }
        }
    }
]
