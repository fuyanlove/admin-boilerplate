<template>
    <div class="c-header-user">
        <el-dropdown>
            <!-- <el-avatar class="u-avatar" :src="avatar" :size="32">
                <img src="@/assets/img/common/avatar.png"
            /></el-avatar> -->
            <span v-if="user" class="u-name">
                <el-icon><User /></el-icon>
                {{ user.username }}
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <!-- <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item divided disabled>Action 4</el-dropdown-item> -->
                    <el-dropdown-item @click="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>
import User from "@/utils/user";
export default {
    name: "HeaderUser",
    props: [],
    components: {},
    data: function () {
        return {
            avatar: "",
            user: User.getInfo(),
        };
    },
    methods: {
        logout() {
            User.logout();
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="less">
.c-header-user {
    padding: 0 20px;
    :deep(.u-avatar) {
        background-color: #fff;
        padding: 5px;
    }
    cursor: pointer;

    .u-name {
        color: #fff;
        margin-left: 10px;
        display: flex;
        align-items: center;
        i {
            .mr(5px);
        }
    }
}
</style>
