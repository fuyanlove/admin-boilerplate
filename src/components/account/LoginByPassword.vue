<template>
    <el-form class="m-account-form m-login-pwd" ref="form" :model="form" :rules="rules" @keyup.enter="submit">
        <!-- 账号 -->
        <el-form-item size="large" prop="username">
            <el-input
                class="u-input u-username"
                v-model="form.username"
                placeholder="用户名"
                clearable
                size="large"
                prefix-icon="User"
                autocomplete="username"
                :autofocus="true"
            />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item size="large" prop="password">
            <el-input
                class="u-input u-password"
                v-model="form.password"
                placeholder="密码"
                clearable
                size="large"
                prefix-icon="Lock"
                type="password"
                show-password
                autocomplete="current-password"
            />
        </el-form-item>
        <el-button
            class="u-btn"
            type="primary"
            @click="submit"
            icon="SwitchButton"
            :disabled="loading"
            :loading="loading"
            >登录</el-button
        >
    </el-form>
</template>

<script>
import { authenticatePassword } from "@/service/account";
export default {
    name: "LoginByPassword",
    emit: ["success"],
    data: function () {
        return {
            form: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "密码长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                ],
            },
            loading: false,
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid, fields) => {
                if (valid) {
                    this.loading = true;
                    authenticatePassword(this.form)
                        .then((res) => {
                            this.$emit("success", res.data.data);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!!", fields);
                }
            });
        },
    },
};
</script>
