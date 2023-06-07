// permission.ts

// 引入vue中定义的指令对应的类型定义
export const permission = {
    // mounted是指令的一个生命周期
    mounted(el, binding) {
        // value 获取用户使用自定义指令绑定的内容
        const { value } = binding
        // 获取用户所有的权限按钮
        const permissionBtn = sessionStorage.getItem('roles')
        // 判断用户使用自定义指令，是否使用正确了
        if (value) {
            if(permissionBtn.includes(value)){
                return true
            }else{
                el.style.display = 'none'
            }
        } else {
            throw new Error('need roles! Like v-permission="admin"')
        }
    }
}

// 注意，我们这里写的自定义指令，传递内容是一个数组，也就说，按钮权限可能是由
// 多个因素决定的，如果你的业务场景只由一个因素决定，自定义指令也可以不传递一个数组，
// 只传递一个字符串就可以了
