<template>
    <div class="c-header-user">
        <el-dropdown>
            <el-avatar class="u-avatar" :src="avatar" :size="32">
                <img src="@/assets/img/common/avatar.png"
            /></el-avatar>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "HeaderUser",
    props: [],
    components: {},
    data: function () {
        return {
            avatar: "",
        };
    },
    computed: {},
    watch: {},
    methods: {},
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
