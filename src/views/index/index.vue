<script setup>
    import { storeToRefs } from 'pinia'
    import { useStore } from '@/store';
    import { useOpenLoading, useCloseLoading } from '@/components/useLoading';
    import { onMounted } from 'vue';
    onMounted(_=>{
        // 过三秒后remove掉DOM
        setTimeout(_=>{
            useCloseLoading();
        },1000) 
    })
    const Store =  useStore();
    const { counter } = storeToRefs(Store);
    useOpenLoading();
    
    
</script>

<template>
    <div class="main">
    </div>
</template>

<style scoped>

</style>