<template>
    <div class="head flex">
        <div>
            <!-- 面包屑 -->
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item
                    v-for="(item, index) in list"
                    :key="index"
                    :replace="index === list.length"
                    :to="{ path: item.path }"
                    >{{ item.name }}</el-breadcrumb-item
                >
            </el-breadcrumb>
        </div>
        <div>
            <!-- 头像选择区域 -->
            <el-dropdown>
                <img
                    :src="userInfo.avatar || '../public/userHead.png'"
                    alt="用户头像"
                    class="userHead"
                />
                <template #dropdown>
                    <el-dropdown-menu>
                        <div v-permission="'passWord'">
                            <el-dropdown-item @click="update">修改密码</el-dropdown-item>
                        </div>
                        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>


    <div class="history">
        <!-- 历史记录 -->
        <el-tag 
            effect="dark"
            closable
            hit
            @close="closeTag(item)"
            @click="onOpen(item)"
            :style="tagStyle(item)"
            v-for="item in adminRouters"
            :key="item.path">{{ item.name }}</el-tag>
    </div>

</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { loginOut, updatePassword } from '@/common';
import router from '@/router'

const Store = useStore();
const { userInfo, adminRouters } = storeToRefs(Store);

const route = useRoute();
let list = ref([]);
let matched = JSON.parse(JSON.stringify(route.matched));
list.value = matched.splice(1, matched.length);

watch(
    () => route.path,
    (val) => {
        let matched = JSON.parse(JSON.stringify(route.matched));
        list.value = matched.splice(1, matched.length);
    }
);

const update = ()=>{
    updatePassword();
}

const tagStyle = (item)=>{
    let status = item.path === route.path
    let color = status ? '#409eff' : '#fff'
    let background = status ? '#ecf5ff' : '#409eff'
    return {
        color,
        background
    }
}

const closeTag = (item)=>{
    Store.onPushRouters(item, true).then(res=>{
        const { delRoute, adminRouters } = res;
        if(delRoute.path === route.path){
            router.push(adminRouters.at(-1).path)
        }
    })
}

const onOpen = (item)=>{
    if(item.path !== route.path){
        router.push(item.path)
    }
}
</script>

<style scoped lang="less">
@import url("./index.css");
</style>