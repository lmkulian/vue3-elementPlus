import axios from 'axios'

const request = (url, options) => {
    // 创建 axios 实例
    const service = axios.create({
        baseURL: "", // api base_url
        timeout: 6000 // 请求超时时间
    });
    // 请求拦截
    service.interceptors.request.use(config => {
        // 这里可设置请求头等信息
        if (options && options.body) {
            config.data = options.body;
        }
        return config;
    });


    // 返回拦截
    service.interceptors.response.use(response => {
        // 这里可进行返回数据的格式化等操作
        return response.data;
    });
    return service(url, options);
}

export default request;