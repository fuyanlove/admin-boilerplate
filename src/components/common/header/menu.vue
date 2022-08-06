<template>
    <div class="c-header-menu">
        <!-- FIXME:element plus bug，全局变量无法正常穿透子菜单 -->
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            background-color="#262f3e"
            text-color="#fff"
            :active-text-color="lightblue"
        >
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { lightblue, headerBgColor } from "@/assets/css/var.less";
export default {
    name: "HeaderMenu",
    props: [],
    components: {},
    data: function () {
        return {
            activeIndex: "",

            lightblue,
            headerBgColor,
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSelect() {
            // console.log(key,path)
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less" scoped>
:deep(.el-menu) {
    height: @header-height;
    border-bottom: none;
}
</style>
