<template>
    <div>
        <el-button @click="select">
            <el-icon>
                <component :is="icon" />
            </el-icon>
        </el-button>

        <el-dialog title="选择ICON" v-model="showDialog">
            <el-tabs v-model="activeName">
                <el-tab-pane
                    v-for="(item, index) in list"
                    :key="index"
                    :label="item.label"
                    :name="item.label"
                >
                    <div class="flex">
                        <div
                            v-for="(items, indexs) in item.children"
                            :key="indexs"
                            @click="iconClick(items, indexs)"
                            class="icon"
                        >
                            <el-icon size="2em">
                                <component :is="items.label" />
                            </el-icon>
                            <div>
                                {{ items.label }}
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import list from "./list";
const emits = defineEmits(["update:icon"]);
let activeName = ref("System");
let showDialog = ref(false);

const props = defineProps({
    icon: {
        type: String,
        default: "Plus",
    },
});

const select = () => {
    showDialog.value = true;
};

const iconClick = (row, index)=> {
    showDialog.value = false;
    emits('update:icon', row.label);
}

</script>

<style scoped>
@import url("./index.less");
</style>