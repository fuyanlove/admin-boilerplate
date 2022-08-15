<template>
    <div class="p-login">
        <el-tabs>
            <el-tab-pane v-for="item in tabs" :key="item.component" lazy>
                <keep-alive>
                    <component :is="item.component" :params="item.params"></component>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
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
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>
