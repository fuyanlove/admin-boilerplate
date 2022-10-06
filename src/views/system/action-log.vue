<template>
    <div class="p-action-log c-main">
        <!-- 标题和添加按钮 -->
        <el-row class="m-search" :gutter="20">
            <!-- TODO: 需要搜索用户列表 -->
            <el-col :xs="24" :md="12" class="u-info">
                <div class="u-user">
                    <el-input v-model="form.user_id" class="u-user" placeholder="请选择">
                        <template #prepend>用户</template>
                    </el-input>
                </div>
                <div class="u-action">
                    <el-select v-model="form.method" placeholder="动作" clearable>
                        <el-option v-for="item in methods" :key="item.value" :value="item.value" :label="item.label">
                            {{ item.label }} ({{ item.value }})
                        </el-option>
                    </el-select>
                </div>
                <el-input v-model="form.source_id" class="u-user" placeholder="">
                    <template #prepend>资源ID</template>
                </el-input>
            </el-col>
            <el-col :xs="24" :md="12" class="u-time">
                <span class="u-label">时间范围：</span>
                <el-date-picker
                    class="u-date"
                    v-model="form.start_time"
                    type="datetime"
                    placeholder="选择开始时间"
                ></el-date-picker>
                <span class="u-div">-</span>
                <el-date-picker
                    class="u-date"
                    v-model="form.end_time"
                    type="datetime"
                    placeholder="选择结束时间"
                ></el-date-picker>
            </el-col>

            <el-col :xs="24" :md="24" class="u-info">
                <el-input
                    v-model="form.search"
                    placeholder="从IP／用户代理(UA)／描述／路径中检索"
                    class="u-input"
                    @keyup.enter="loadData"
                    clearable
                >
                    <template #prepend>搜索</template>
                </el-input>
            </el-col>
        </el-row>
        <!-- 数据表格 -->
        <el-table :data="data" border v-loading="loading" stripe>
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
            class="m-pagination"
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
            immediate: true,
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
