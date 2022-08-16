<template>
    <div class="m-login-mobile">
        <el-form :model="formData" :rules="rules" ref="formData">
            <el-form-item prop="mobile">
                <el-input v-model="formData.mobile" size="large" placeholder="手机号" prefix-icon="Iphone"></el-input>
            </el-form-item>
            <el-form-item prop="verification_code" class="m-verification-row">
                <el-input
                    v-model="formData.verification_code"
                    size="large"
                    placeholder="验证码"
                    prefix-icon="Message"
                ></el-input>
                <el-button size="large" @click="getVerificationCode">获取验证码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "loginMobile",
    data() {
        return {
            formData: {
                mobile: "",
                verification_code: "",
            },
            rules: {
                mobile: [{ required: true, message: "请输入手机号", trigger: "change" }],
                verification_code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            },
        };
    },
    methods: {
        validate() {
            return this.$refs.formData.validate((valid, fields) => {
                if (valid) {
                    this.$emit("submit", this.formData);
                } else {
                    console.log("error submit!!!", fields);
                }
            });
        },
        clearError() {
            this.$refs.formData.clearValidate();
        },
        getVerificationCode() {
            this.$refs.formData.validate((valid, fields) => {
                if (valid) {
                    // TODO: 获取验证码
                } else {
                    console.log("error submit!!!", fields);
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.m-login-mobile {
    .m-verification-row {
        :deep(.el-form-item__content) {
            flex-wrap: nowrap;
            gap: 10px;
        }
    }
}
</style>
