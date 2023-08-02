<template>
    <div class="mask" @click="onClickMask"></div>
	<div class="loading">
            <div
                aria-label="Orange and tan hamster running in a metal wheel"
                role="img"
                class="wheel-and-hamster"
            >
                <div class="wheel"></div>
                <div class="hamster">
                    <div class="hamster__body">
                        <div class="hamster__head">
                            <div class="hamster__ear"></div>
                            <div class="hamster__eye"></div>
                            <div class="hamster__nose"></div>
                        </div>
                        <div class="hamster__limb hamster__limb--fr"></div>
                        <div class="hamster__limb hamster__limb--fl"></div>
                        <div class="hamster__limb hamster__limb--br"></div>
                        <div class="hamster__limb hamster__limb--bl"></div>
                        <div class="hamster__tail"></div>
                    </div>
                </div>
                <div class="spoke"></div>
            </div>
        </div>
</template>
<script setup>
import { defineExpose } from 'vue';
	const onClickMask = (root)=>{
	}


	const onCloseLoading = (root) =>{
		document.body.removeChild(root);
	}

defineExpose({
	onCloseLoading
})
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>