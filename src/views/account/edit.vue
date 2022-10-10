<template>
    <div class="p-account-add p-account-edit">
        <h1>编辑账号</h1>
        <el-tabs v-model="current">
            <el-tab-pane label="账号信息" name="account" lazy>
                <account-add :account="data" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="password" lazy>
                <reset-pwd />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import AccountAdd from "./add";
import ResetPwd from "./reset-pwd";
import { getAccountDetail } from "@/service/account";
export default {
    name: "AccountEdit",
    components: {
        AccountAdd,
        ResetPwd,
    },
    data() {
        return {
            current: "account",

            data: {},
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                val && this.getData();
            },
        },
    },
    methods: {
        getData() {
            getAccountDetail(this.id).then((res) => {
                this.data = res.data.data;
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/account/add.less";
</style>
