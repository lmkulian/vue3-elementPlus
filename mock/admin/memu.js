
const list = [
    {
        name:'系统管理',
        id: '0',
        path: '/admin',
        icon: 'Monitor',
        redirect: '/admin/memu',
        children: [
            {
                name: '菜单管理',
                path: '/admin/memu',
                component: '/admin/memu/memu',
                id: '1',
                icon: 'Operation'
            },
            {
                name: '用户管理',
                path: '/admin/user',
                component: '/admin/user/index',
                id: '2',
                icon: 'UserFilled'
            }
        ]
    }
];

export default [
    {
        url: '/admin/memu',
        method: 'post',
        response: ()=>{
            return {
                code: 200,
                message: 'success',
                data:list
            }
        }
    }
];
