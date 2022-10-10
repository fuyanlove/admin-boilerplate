<template>
    <div class="p-reset-pwd">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="large">
            <el-form-item label="新密码" prop="password1" required>
                <el-input v-model="form.password1" type="password" show-password placeholder="输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入" prop="password2" required>
                <el-input
                    v-model="form.password2"
                    type="password"
                    show-password
                    placeholder="再次输入新密码"
                ></el-input>
            </el-form-item>
            <el-form-item class="m-form-actions">
                <el-button type="primary" @click="submit" :loading="processing">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { updateAccountPassword } from "@/service/account";
export default {
    name: "ResetPwd",
    components: {},
    data() {
        return {
            form: {
                password1: "",
                password2: "",
            },
            rules: {
                password1: [
                    { required: true, message: "请输入新密码", trigger: "blur" },
                    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
                ],
                password2: [
                    { required: true, message: "再次输入新密码", trigger: "blur" },
                    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
                    { validator: this.checkPassword, trigger: "blur" },
                ],
            },
            processing: false,
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid, fields) => {
                if (valid) {
                    const data = {
                        password1: this.form.password1,
                        password2: this.form.password2,
                    };
                    this.processing = true;
                    updateAccountPassword(this.id, data)
                        .then(() => {
                            this.$message.success("修改成功");
                            // this.$router.push({ name: "AccountIndex" });
                            this.form = {
                                password1: "",
                                password2: "",
                                confirm_pwd: "",
                            };
                            this.$refs.form.resetFields();
                        })
                        .finally(() => {
                            this.processing = false;
                        });
                } else {
                    console.log("error submit!!", fields);
                }
            });
        },
        validateConfirmPwd(rule, value, callback) {
            if (value !== this.form.password1) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        },
    },
};
</script>
