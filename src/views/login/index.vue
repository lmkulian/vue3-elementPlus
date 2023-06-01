<template>
    <div class="main">
        <div class="loginView">
            <div class="title">欢迎登录</div>
            <el-form :model="form" :rules="rules" ref="ruleFormRef">
                <el-form-item prop="userName">
                    <el-input 
                        :prefix-icon="User" 
                        v-model="form.userName" 
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input 
                        show-password 
                        :prefix-icon="Unlock" 
                        type="password"
                        v-model="form.passWord" 
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onLogin(ruleFormRef)" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import {  User, Unlock } from '@element-plus/icons-vue';
    import { useRouter } from 'vue-router';
    import useStore from '@/store';
    import { ElMessage  } from 'element-plus';
    const router = useRouter();
    const mainStore = useStore();
    let form = reactive({
        userName: '',
        passWord: ''
    });
    let ruleFormRef = ref(null);
    let rules = reactive({
        userName:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 0, max: 11, message: '用户名需要11位', trigger: 'blur' },
        ],
        userName:[
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
    });

    const onLogin = (formEL)=>{
        if(!formEL) return;
        formEL.validate((valid,e)=>{
            if(valid){
                mainStore.onUseLogin(form).then(res=>{
                    ElMessage.success('登录成功')
                    router.push('/')
                })
            }else{
                console.log(e);
            }
        })
    }
</script>

<style scoped lang="less">
@import url('./index.css');
</style>