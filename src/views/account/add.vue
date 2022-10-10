<template>
    <div class="p-account-add">
        <h1 v-if="!account.id">创建账号</h1>
        <el-form :model="formData" :rules="rules" label-width="80px" size="large" ref="form">
            <!-- <el-form-item label="头像" prop="avatar">
                <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item> -->
            <el-form-item label="账号" prop="username" required>
                <el-input
                    v-model="formData.username"
                    placeholder="请输入登录用户名"
                    :disabled="!!account.id"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required v-if="!account.id">
                <el-input
                    v-model="formData.password"
                    type="password"
                    :minlength="6"
                    :maxlength="20"
                    show-password
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname" required>
                <el-input v-model="formData.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="用户组" prop="group">
                <el-select v-model="formData.group" placeholder="选择用户组" disabled style="width: 100%">
                    <el-option label="超管" :value="512"></el-option>
                </el-select>
            </el-form-item> -->
            <template v-if="account.id">
                <!-- <el-form-item label="状态" prop="status">
                    <el-input v-model="formData.status" disabled></el-input>
                </el-form-item> -->
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="formData.phone" placeholder="输入电话"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" placeholder="输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formData.remark" placeholder="输入备注"></el-input>
                </el-form-item>
            </template>
            <el-form-item class="m-form-actions">
                <el-button type="primary" @click="onSubmit" :loading="processing">提交</el-button>
                <el-button @click="onCancel" :disabled="processing">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { checkUsername, createAccount, updateAccount } from "@/service/account";
import { omit, pick } from "lodash";
export default {
    name: "AccountAdd",
    props: {
        account: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            formData: {
                username: "",
                password: "",
                nickname: "",
                group: 512,
                phone: "",
                email: "",
                status: 1,
                avatar: "",
                remark: "",
            },
            processing: false,
        };
    },
    computed: {
        rules() {
            const rules = {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" },
                    { message: "用户名已存在", trigger: "blur", validator: this.checkUsername },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
                ],
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
                ],
                phone: [{ pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }],
                email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }],
            };
            if (this.account.id) {
                delete rules.password;
                delete rules.username;
            }
            return rules;
        },
    },
    watch: {
        account: {
            immediate: true,
            deep: true,
            handler(val) {
                this.formData = Object.assign({}, this.formData, pick(val, Object.keys(this.formData)));
            },
        },
    },
    methods: {
        async checkUsername(rule, val, callback) {
            try {
                const params = {
                    search: val,
                };
                if (this.account.id) {
                    params.id = this.account.id;
                }
                const res = await checkUsername(params);
                if (res.data.data.is_exist) {
                    callback(new Error("用户名已存在"));
                } else {
                    callback();
                }
            } catch (error) {
                callback(new Error(error));
            }
        },
        onCancel() {
            this.$router.push({ name: "account-list" });
        },
        onSubmit() {
            this.$refs.form.validate((valid, fields) => {
                if (valid) {
                    this.processing = true;
                    if (this.account.id) {
                        const data = omit(this.formData, ["password", "username"]);
                        updateAccount(this.account.id, data)
                            .then(() => {
                                this.$message.success("修改成功");
                                this.$router.push({ name: "account-list" });
                            })
                            .finally(() => {
                                this.processing = false;
                            });
                    } else {
                        const data = pick(this.formData, ["username", "password", "nickname", "group"]);
                        createAccount(data)
                            .then(() => {
                                this.$message.success("添加成功");
                                this.$router.push({ name: "account-list" });
                            })
                            .finally(() => {
                                this.processing = false;
                            });
                    }
                } else {
                    console.log("error submit!!!", fields);
                }
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/account/add.less";
</style>
