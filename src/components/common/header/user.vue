<template>
    <div class="c-header-user">
        <el-dropdown @command="handleCommand">
            <el-avatar class="u-avatar" :src="avatar" :size="32">
                <img src="@/assets/img/common/avatar.png"
            /></el-avatar>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="(item, i) in Panel"
                        :key="i"
                        :disabled="item.disabled"
                        :command="item.path"
                        >{{ item.title }}</el-dropdown-item
                    >
                    <el-dropdown-item divided icon="SwitchButton" @click="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>
import { Panel } from "@/settings";
import User from "@/utils/user";
export default {
    name: "HeaderUser",
    props: [],
    components: {},
    data: function () {
        return {
            avatar: "",
            Panel,
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleCommand(path) {
            window.open(path, "_blank");
        },
        exit() {
            User.destroy();
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.c-header-user {
    padding: 0 10px;
    :deep(.u-avatar) {
        background-color: #fff;
        padding: 5px;
    }
    cursor: pointer;
}
</style>
