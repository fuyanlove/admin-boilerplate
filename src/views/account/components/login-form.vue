<template>
    <div class="m-login-form">
        <el-form ref="formData" :model="formData" :rules="rules">
            <el-form-item prop="username" required>
                <el-input v-model="formData.username" size="large" placeholder="帐户" prefix-icon="User" />
            </el-form-item>
            <el-form-item prop="password" required>
                <el-input
                    v-model="formData.password"
                    type="password"
                    size="large"
                    placeholder="密码"
                    prefix-icon="Lock"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "loginForm",
    data() {
        return {
            formData: {
                username: "",
                password: "",
            },
            rules: {
                username: [{ required: true, message: "请输入帐户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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
    },
};
</script>
