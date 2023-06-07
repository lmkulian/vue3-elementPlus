<template>
    <div class="flex">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            text-color="#fff"
            :collapse="isCollapse"
        >
            <el-sub-menu 
                v-for="(item,index) in memu" 
                :index="item.id" 
                :key="index"
            >
                <template #title>
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                    <el-menu-item 
                        v-for="items in item.children"
                        :key="items.id"
                        @click="openItems(items)"
                        :route="items"
                        :index="items.id">
                        <el-icon>
                            <component :is="items.icon" />
                        </el-icon>
                        {{ items.name }}
                    </el-menu-item>
            </el-sub-menu>
        </el-menu>
        <div class="right">
            <user-head></user-head>
            <router-view v-slot="{ Component }">
                <keep-alive :max="10">
                    <component class="router" :is="Component" />
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>
<script setup>
    import userHead from './userHead/index.vue';
    import useStore from '@/store';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    import { ref, computed } from 'vue';
    const Store =  useStore();
    const router = useRouter()
    const { memu } = storeToRefs(Store);

    let isCollapse = ref(false)
    let iconCollapse = computed(()=>{
        return {
            icon: isCollapse.value? 'Expand' : 'Fold',
            width: isCollapse.value? '65px' : '180px'
        }
    })
    const openItems = (row)=>{
        router.push(row.path)
    }
</script>
<style scoped lang="less">
.right{
    flex: 1;
    width: 100%;
    background: #f4f4f4;
}
.router{
    padding: 20px;
}
    :deep(.el-menu){
        height: 100vh;
        overflow: hidden;
        width: 180px;
    }
</style>