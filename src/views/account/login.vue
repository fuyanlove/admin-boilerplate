<template>
    <div class="p-account-login">
        <main class="m-container">
            <!-- LOGO与标题 -->
            <header class="m-header">
                <div class="u-logo"><img src="@/assets/img/common/logo.svg" alt="logo" /></div>
                <h1 class="u-title">admin boilerplate</h1>
                <div class="u-desc">Admin Manage System</div>
            </header>
            <section class="m-body">
                <!-- 已登录 -->
                <div class="m-logout" v-if="isAuthenticated">
                    <p class="u-msg">您已登入。</p>
                    <el-button class="u-btn" type="danger" @click="exit" icon="SwitchButton">退出</el-button>
                    <el-button class="u-btn" plain @click="back" icon="ArrowLeft">返回</el-button>
                </div>
                <!-- 登录表单 -->
                <!-- <el-tabs v-model="tab" v-else>
                    <el-tab-pane label="密码登录" name="pwd">
                    </el-tab-pane>
                    <el-tab-pane label="短信登录" name="sms">
                        <login-by-sms @success="success"></login-by-sms>
                    </el-tab-pane>
                </el-tabs> -->
                <login-by-password v-else @success="success"></login-by-password>
            </section>
        </main>
    </div>
</template>

<script>
import LoginByPassword from "@/components/account/LoginByPassword.vue";
// import LoginBySms from "@/components/account/LoginBySms.vue";
import User from "@/utils/user";
export default {
    name: "AccountLogin",
    components: {
        LoginByPassword,
        // LoginBySms,
    },
    data: function () {
        return {
            tab: "pwd",
            isAuthenticated: User.isLogin(),
        };
    },
    methods: {
        // 跳转回来源地址
        redirect() {
            const url = this.$route.query.redirect || "/";
            location.href = decodeURIComponent(url);
        },
        // 登入
        success(data) {
            User.update(data).then(() => {
                this.$message({
                    message: "登录成功",
                    type: "success",
                });
                this.redirect();
            });
        },
        // 登出
        exit() {
            User.logout();
            this.isAuthenticated = false;
        },
        // 后退
        back() {
            window.history.length ? this.$router.go(-1) : this.$router.push("/");
        },
    },
    beforeCreate() {
        // 动画
        this.$loadScript("/animation/particles.min.js").then(() => {
            // eslint-disable-next-line no-undef
            particlesJS.load("particles-js", "/animation/particlesjs-config.json");
        });
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/login.less";
</style>
