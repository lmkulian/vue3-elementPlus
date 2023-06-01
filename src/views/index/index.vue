<script setup>
    import { storeToRefs } from 'pinia'
    import { useStore } from '@/store';
    const Store =  useStore();
    const { counter } = storeToRefs(Store);
</script>

<template>
    <div class="main">
        {{ counter }}
        <el-button type="success">1</el-button>
    </div>
</template>

<style scoped>

</style>