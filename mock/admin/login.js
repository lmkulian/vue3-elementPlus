import  Mock  from 'mockjs';

export default [
    {
        url: '/admin/login',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: 'success',
                data: Mock.mock({
                    'token': 'xxxxxxxxxxxxxxxxxxxxx'
                })
            }
        }
    }
]
