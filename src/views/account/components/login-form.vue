<template>
    <div class="m-login-form">
        <el-form ref="formData" :model="formData" :rules="rules">
            <el-form-item prop="username">
                <el-input v-model="formData.username" size="small" placeholder="Please Input" :suffix-icon="User" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="formData.password"
                    type="password"
                    size="small"
                    placeholder="Please Input"
                    :suffix-icon="Lock"
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
                username: [{ required: true, message: "账户", trigger: "blur" }],
                password: [{ required: true, message: "密码", trigger: "blur" }],
            },
        };
    },
};
</script>
