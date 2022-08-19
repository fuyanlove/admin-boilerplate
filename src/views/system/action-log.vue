<template>
    <div class="p-action-log c-main">
        <!-- 标题和添加按钮 -->
        <div class="m-search">
            <div class="u-info">
                <el-input v-model="form.user_id" class="u-user">
                    <template #prepend>搜索</template>
                </el-input>
            </div>

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
        </div>
    </div>
</template>

<script>
import { getActionLogs } from "@/service/system";
export default {
    name: "ActionLog",
    data() {
        return {
            form: {
                search: "",
                method: "",
                start_time: "",
                end_time: "",
            },

            loading: false,
            data: {
                list: [],
                total: 0,
                page: 1,
                limit: 10,
            },
        };
    },
    computed: {},
    methods: {
        loadData: function () {
            this.loading = true;
            getActionLogs(this.params)
                .then((res) => {
                    this.data.list = res.data.data.list || [];
                    this.data.total = res.data.data.total || 0;
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
