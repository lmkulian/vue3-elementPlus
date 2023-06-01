import  Mock  from 'mockjs';

export default [
    {
        url: '/admin/userInfo',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: 'success',
                data: Mock.mock({
                    'name': "@cname",
                    'userID': Mock.Random.id(),
                    'roles|3-10': [1,2] 
                })
            }
        }
    }
]
