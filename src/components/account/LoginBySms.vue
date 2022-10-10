<template>
    <el-form class="m-account-form m-login-sms" ref="form" :model="form" :rules="rules" @keyup.enter="submit">
        <!-- 手机号 -->
        <el-form-item size="large" prop="phone">
            <el-input
                class="u-input u-phone"
                v-model="form.phone"
                placeholder="手机号"
                clearable
                size="large"
                prefix-icon="Iphone"
                autocomplete="on"
            />
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item size="large" prop="code">
            <el-input
                class="u-input u-code"
                v-model="form.code"
                placeholder="验证码"
                clearable
                size="large"
                prefix-icon="Key"
            >
                <template #append
                    ><el-button @click="apply" :disabled="!!countdown || !form.phone || loading"
                        >获取验证码<span class="u-countdown" v-if="countdown">({{ countdown }})</span></el-button
                    ></template
                >
            </el-input>
        </el-form-item>
        <el-button class="u-btn" type="primary" @click="submit" icon="SwitchButton" :loading="loading">{{
            登录
        }}</el-button>
    </el-form>
</template>

<script>
import { authenticateSms, getVerificationCode } from "@/service/account";
export default {
    name: "LoginBySms",
    emit: ["success"],
    data: function () {
        return {
            form: {
                phone: "",
                code: "",
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "手机号不能为空",
                        trigger: "blur",
                    },
                ],
                code: [
                    {
                        required: true,
                        message: "验证码不能为空",
                        trigger: "blur",
                    },
                ],
            },

            // 验证码倒计时
            countdown: 0,
            interval: 60,
            loading: false,
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid, fields) => {
                if (valid) {
                    this.loading = true;
                    authenticateSms(this.form)
                        .then((data) => {
                            this.$emit("success", data?.accessToken);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!", fields);
                }
            });
        },
        apply() {
            // 获取验证码
            this.loading = true;
            getVerificationCode(this.form.phone).finally(() => {
                this.loading = false;
                this.countdown = this.interval;
                const timer = setInterval(() => {
                    this.countdown--;
                    if (this.countdown <= 0) {
                        clearInterval(timer);
                    }
                }, 1000);
            });
        },
    },
};
</script>
