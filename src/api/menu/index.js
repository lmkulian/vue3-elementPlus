import request from '@/api/axios';
const del = (data) => {
    return request({
        url: '/menu/del',
        method: 'post',
        data
    })
}

const add = (data) => {
    return request({
        url: '/menu/add',
        method: 'post',
        data
    })
}

const update = (data) => {
    return request({
        url: '/menu/update',
        method: 'post',
        data
    })
}

export {
    del,
    add,
    update
}