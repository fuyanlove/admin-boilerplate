<template>
    <div class="p-login">
        <main class="main">
            <el-tabs v-model="activeTab" @tab-change="handleTabChange">
                <el-tab-pane v-for="item in tabs" :key="item.component" :name="item.component" :label="item.name" lazy>
                    <!-- <keep-alive> -->
                    <component
                        class="m-login-component"
                        :ref="item.component"
                        :is="item.component"
                        :params="item.params"
                        @submit="submit"
                    ></component>
                    <!-- </keep-alive> -->
                </el-tab-pane>
            </el-tabs>
            <div class="m-login-actions">
                <div class="m-login-setting">
                    <el-checkbox>自动登录</el-checkbox>
                    <el-button link type="primary">忘记密码</el-button>
                </div>
                <el-button class="u-login-btn" type="primary" @click="handleSubmitClick">登录</el-button>
            </div>
        </main>
    </div>
</template>

<script>
import loginForm from "@/views/account/components/login-form.vue";
import loginMobile from "@/views/account/components/login-mobile.vue";
export default {
    name: "AccountLogin",
    components: {
        AccountLoginForm: loginForm,
        AccountLoginMobile: loginMobile,
    },
    data: function () {
        return {
            tabs: [
                {
                    name: "账号密码登录",
                    component: "AccountLoginForm",
                },
                {
                    name: "手机号登录",
                    component: "AccountLoginMobile",
                },
            ],
            activeTab: "AccountLoginForm",
        };
    },
    methods: {
        handleSubmitClick() {
            this.$refs[this.activeTab][0].validate();
        },
        submit(formData) {
            // TODO: 提交表单
            console.log(formData);
        },
        handleTabChange() {
            // 清空错误信息
            const other = this.tabs.filter((item) => item.component !== this.activeTab)[0];
            this.$refs[other.component][0].clearError();
        },
    },
};
</script>

<style lang="less" scoped>
.p-login {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;

    .main {
        min-width: 260px;
        width: 368px;
        // margin: 0 auto;

        :deep(.el-tabs__nav-scroll) {
            display: flex;
            justify-content: center;
        }
        :deep(.el-tabs__nav-wrap::after) {
            display: none;
        }

        .m-login-component {
            margin-top: 10px;
        }
        .m-login-actions {
            .m-login-setting {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
            }
            .u-login-btn {
                margin: 20px 0;
                width: 100%;
            }
        }
    }
}
</style>
