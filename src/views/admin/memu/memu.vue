<template>
    <div>
        <el-card>
            <template #header>
                <div class="searchHead">
                    <div class="flex">
                        <el-icon><Search /></el-icon>
                        <div class="title">筛选条件</div>
                    </div>
                    <div>
                        <el-button @click="addRow" size="small" type="primary"
                            >添加</el-button
                        >
                        <el-button @click="getList" size="small" type="success"
                            >查询</el-button
                        >
                        <el-button size="small">重置</el-button>
                    </div>
                </div>
                <div>
                    <el-form :model="form" inline>
                        <el-form-item label="关键字">
                            <el-input
                                clearable
                                v-model="form.keyWord"
                                placeholder="请输入关键字"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="角色">
                            <el-select
                                v-model="form.role"
                                placeholder="请选择角色"
                                clearable
                            >
                                <el-option label="管理员" value="1" />
                                <el-option label="用户" value="2" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <el-table :data="tableList" border row-key="id">
                <el-table-column prop="id" label="ID" align="center" />
                <el-table-column prop="name" label="名称" align="center" />
                <el-table-column prop="path" label="path" align="center" />
                <el-table-column
                    prop="component"
                    label="组件位置"
                    align="center"
                />
                <el-table-column label="iCON" align="center">
                    <template #default="scope">
                        <component :is="scope.row.icon" class="icon" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="success" link>新增</el-button>
                        <el-button
                            type="primary"
                            link
                            @click="update(scope.row)"
                            >编辑</el-button
                        >
                        <el-button type="danger" link @click="delRow(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                layout="prev, pager, next, sizes"
                v-model:page-size="pagination.size"
                v-model:current-page="pagination.page"
                :total="pagination.total"
                @size-change="sizeChange"
                @current-change="pageChange"
                class="pagination"
            />
        </el-card>
        <el-dialog
            :title="dialogObj.title"
            v-model="dialogObj.visible"
            @close="dialogClose"
            width="70%"
        >
            <el-form
                :model="dialogForm"
                label-width="100"
                ref="formEl"
                :rules="rules"
            >
                <el-form-item label="名称" prop="name">
                    <el-input
                        placeholder="请输入菜单名称"
                        v-model="dialogForm.name"
                    ></el-input>
                </el-form-item>
                <el-form-item label="前端路径" prop="path">
                    <el-input
                        placeholder="请输入菜单路径"
                        v-model="dialogForm.path"
                    ></el-input>
                </el-form-item>
                <el-form-item label="组件位置" prop="component">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="PS:/admin/memu/memu"
                        placement="top-start"
                    >
                        <el-input
                            placeholder="请输入组件位置"
                            v-model="dialogForm.components"
                        ></el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="icon">
                    <icons v-model:icon="dialogForm.icon" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="confirm" type="primary">确定</el-button>
                <el-button @click="dialogObj.visible = false">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { del, add, update as updates } from "@/api/menu";
import { generateRoutes } from "@/api/admin";
import { ElMessage } from "element-plus";
import icons from "@/components/icons/index.vue";

const formEl = ref(null)

let rules = {
    name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
};

let form = reactive({
    keyWord: "",
    role: null,
});

let dialogForm = reactive({
    name: "",
    path: "",
    components: "",
    icon: "",
});

let dialogObj = reactive({
    title: "",
    visible: false,
    status: "",
});

let pagination = reactive({
    page: 1,
    size: 10,
    total: 0,
});

let tableList = ref([]);

const confirm = () => {
    formEl.value.validate((valid, fields) => {
        if (valid) {
            const fn = {
                add,
                updates
            }
            fn[dialogObj.status](dialogForm).then(res=>{
                if(res.code !== 200){
                    ElMessage({
                        type: "info",
                        message: res.message,
                    });
                    return;
                }
                ElMessage({
                    type: "success",
                    message: res.message,
                });
                dialogObj.visible = false;
                getList();
            })
        } else {
            console.log("error submit!", fields);
        }
    });
};

const addRow = () => {
    dialogObj.visible = true;
    dialogObj.title = "添加菜单";
    dialogObj.status = "add";
};

const update = (row) => {
    Object.assign(dialogForm, row);
    dialogObj.title = "编辑菜单";
    dialogObj.status = "updates";
    dialogObj.visible = true;
};

const delRow = () => {
    ElMessageBox.confirm("删除当前菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            del().then((res) => {
                if (res.code !== 200) {
                    ElMessage({
                        type: "info",
                        message: res.message,
                    });
                    return;
                }
                ElMessage({
                    type: "success",
                    message: res.message,
                });
                getList();
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "Delete canceled",
            });
        });
};

const sizeChange = (value) => {
    pagination.size = value;
    pagination.page = 1;
    getList();
};

const pageChange = (value) => {
    pagination.page = value;
    getList();
};

const dialogClose = () => {
    dialogForm.name = "";
    dialogForm.path = "";
    dialogForm.icon = "";
    dialogForm.components = "";
};

const getList = (data = {}) => {
    const datas = Object.assign(pagination, form, data);
    generateRoutes(datas).then((res) => {
        if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
        }
        tableList.value = res.data;
    });
};

getList();
</script>

<style scoped>
@import url("./index.less");
</style>