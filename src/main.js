import { createApp } from 'vue';
import '@/style.css';
import '@/assets/style/global.less';
import App from '@/App.vue';
import 'element-plus/dist/index.css'

import * as directives from '@/directives'
import { createPinia } from 'pinia';
import router from '@/router';
import '@/router/permission.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

Object.keys(directives).forEach(key => {  //Object.keys() 返回一个数组，值是所有可遍历属性的key名
    app.directive(key, directives[key])  //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
})

app.use(createPinia());
app.use(router);
app.mount('#app');

