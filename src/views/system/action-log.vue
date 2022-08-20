<template>
    <div class="p-action-log c-main">
        <!-- 标题和添加按钮 -->
        <el-row class="m-search" :gutter="20">
            <el-col :xs="12" :md="8" class="u-info">
                <el-select v-model="form.method" placeholder="选择请求方式" style="width: 100%" clearable>
                    <el-option v-for="item in methods" :key="item.value" :value="item.value" :label="item.label">
                        {{ item.label }} ({{ item.value }})
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="12" :md="8" class="u-info">
                <el-input v-model="form.source_id" class="u-user" placeholder="输入资源id">
                    <template #prepend>搜索</template>
                </el-input>
            </el-col>
            <el-col :xs="12" :md="8" class="u-info u-date-picker">
                <el-date-picker
                    class="u-date-item"
                    v-model="form.start_time"
                    type="datetime"
                    placeholder="选择开始时间"
                ></el-date-picker>
                <el-date-picker
                    class="u-date-item"
                    v-model="form.end_time"
                    type="datetime"
                    placeholder="选择结束时间"
                ></el-date-picker>
            </el-col>
            <!-- TODO: 需要搜索用户列表 -->
            <el-col :xs="12" :md="8" class="u-info">
                <el-input v-model="form.user_id" class="u-user" placeholder="输入用户id">
                    <template #prepend>搜索</template>
                </el-input>
            </el-col>
            <el-col :xs="12" :md="8" class="u-info">
                <el-input v-model="form.ip" class="u-user" placeholder="输入ip">
                    <template #prepend>搜索</template>
                </el-input>
            </el-col>
            <el-col :xs="24" :md="24" class="u-info">
                <!-- 从path,desc,ua中搜索 -->
                <el-input
                    v-model="form.search"
                    placeholder="从path/desc/ua中检索"
                    class="u-input"
                    @keyup.enter="loadData"
                    clearable
                >
                    <template #prepend>搜索</template>
                </el-input>
            </el-col>
        </el-row>
        <!-- 数据表格 -->
        <el-table :data="data" border style="width: 100%" v-loading="loading" stripe>
            <el-table-column
                v-for="header in tableHeader"
                :key="header.prop"
                :label="header.label"
                :prop="header.prop"
                :width="header.width"
            >
                <template #default="{ row }">
                    {{ header.formatter ? header.formatter(row) : row[header.prop] }}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-if="data.length"
            class="u-pagination"
            v-model:currentPage="pagination.page"
            background
            v-model:pageSize="pagination.limit"
            layout="prev, pager, next"
            :total="pagination.total"
        ></el-pagination>
    </div>
</template>

<script>
import { getActionLogs } from "@/service/system";
import actionLog from "./action-log";
import { removeEmpty } from "@/utils";
export default {
    name: "ActionLog",
    data() {
        return {
            form: {
                search: "",
                method: "",
                start_time: "",
                end_time: "",
                source_id: "",
                ip: "",
            },

            loading: false,
            data: [],

            pagination: {
                page: 1,
                limit: 10,
                total: 0,
            },
        };
    },
    computed: {
        tableHeader() {
            return actionLog.tableHeader;
        },
        methods() {
            return actionLog.methods;
        },
        params() {
            return removeEmpty({
                search: this.form.search,
                method: this.form.method,
                start_time: this.form.start_time,
                end_time: this.form.end_time,
                source_id: this.form.source_id,
                ip: this.form.ip,
                page: this.pagination.page,
                limit: this.pagination.limit,
            });
        },
    },
    watch: {
        params: {
            handler() {
                this.loadData();
            },
            deep: true,
        },
    },
    methods: {
        loadData: function () {
            this.loading = true;
            getActionLogs(this.params)
                .then((res) => {
                    this.data = res.data.data.list || [];
                    this.pagination.total = res.data.data.total || 0;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/views/system/action-log.less";
</style>
