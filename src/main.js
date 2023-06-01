import { createApp } from 'vue';
import '@/style.css';
import '@/assets/style/global.less';
import App from '@/App.vue';
import 'element-plus/dist/index.css'


import { createPinia } from 'pinia';
import router from '@/router';
import '@/router/permission.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia());
app.use(router);
app.mount('#app');

