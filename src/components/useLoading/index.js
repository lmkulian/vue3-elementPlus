import loading from './index.vue'
import { createApp } from 'vue';
let instance, unmount;
const loadView= (View)=>{
    const app = createApp(View);
    const root = document.createElement('div');
    document.body.append(root);
    return {
        instance: app.mount(root),
        unmount() {
            document.body.removeChild(root);
        },
    };
};

const open = ()=>{
    ({ instance, unmount } = loadView(loading));
}

const close = ()=>{
    instance && unmount();
}


export {
    open as useOpenLoading,
    close as useCloseLoading,
};

export default open;