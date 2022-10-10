<template>
    <div class="p-account-list">
        <section class="m-search">
            <el-input
                v-model="search"
                placeholder="从用户名／邮箱／电话／昵称 / 备注中检索"
                class="u-input"
                @keyup.enter="handleSearch"
                clearable
                @clear="handleSearch"
            >
                <template #prepend>搜索</template>
            </el-input>
        </section>

        <main class="m-table">
            <el-table :data="tableData" stripe border v-loading="loading">
                <el-table-column label="用户名" prop="username" class-name="u-username">
                    <template #default="{ row }">
                        <img class="u-avatar" :src="avatarUrl(row.avatar)" :alt="row.username" />
                        <span>{{ row.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="nickname" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column label="用户组" prop="group"></el-table-column> -->
                <el-table-column label="电话" prop="phone" show-overflow-tooltip></el-table-column>
                <el-table-column label="邮箱" prop="email" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column label="状态" prop="status"></el-table-column> -->
                <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" prop="created_at">
                    <template #default="{ row }">
                        <span>{{ formatDate(row.created_at) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="{ row }">
                        <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
                        <el-button size="small" @click="handleDelete(row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                v-if="tableData.length"
                v-model:currentPage="pagination.page"
                v-model:page-size="pagination.limit"
                background
                layout="prev, pager, next, sizes"
                :total="pagination.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                class="m-pagination"
            ></el-pagination>
        </main>
    </div>
</template>

<script>
import { getAccountList, deleteAccount } from "@/service/account";
import { formatDate, avatarUrl } from "@/utils";
export default {
    name: "AccountList",
    data() {
        return {
            tableData: [],
            search: "",
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
            },
            loading: false,
        };
    },
    computed: {
        params() {
            const _params = {
                page: this.pagination.page,
                limit: this.pagination.limit,
            };
            if (this.search) {
                _params.search = this.search;
            }
            return _params;
        },
    },
    mounted() {
        this.getData();
    },
    methods: {
        handleSizeChange: function (val) {
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.getData();
        },
        handleCurrentChange: function (val) {
            this.pagination.page = val;
            this.getData();
        },
        getData() {
            this.loading = true;
            getAccountList(this.params)
                .then((res) => {
                    this.tableData = res.data.data.list;
                    this.pagination.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleSearch() {
            this.pagination.page = 1;
            this.getData();
        },
        handleDelete(row) {
            this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                deleteAccount(row.id).then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.pagination.page = 1;
                    this.getData();
                });
            });
        },
        handleEdit(row) {
            this.$router.push({
                name: "account-edit",
                params: {
                    id: row.id,
                },
            });
        },
        formatDate(val) {
            return formatDate(val, "datetime");
        },
        avatarUrl,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/account/list.less";
</style>
