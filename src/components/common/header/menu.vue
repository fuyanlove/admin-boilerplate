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
            <template v-for="(group, groupIndex) in Menu" :key="'group' + groupIndex">
                <el-sub-menu v-if="group.children" :index="group.path">
                    <template #title>{{ group.title }}</template>
                    <template v-for="(subgroup, subgroupIndex) in group.children" :key="'subgroup' + subgroupIndex">
                        <el-sub-menu v-if="subgroup.children" :index="subgroup.path">
                            <template #title>{{ subgroup.title }}</template>
                            <el-menu-item
                                v-for="(item, itemIndex) in subgroup.children"
                                :key="'item-' + itemIndex"
                                :index="item.path"
                            >
                                {{ item.title }}</el-menu-item
                            >
                        </el-sub-menu>
                        <el-menu-item v-else :index="subgroup.path">{{ subgroup.title }}</el-menu-item>
                    </template>
                </el-sub-menu>
                <el-menu-item v-else :index="group.path" :disabled="group.disabled">{{ group.title }}</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { lightblue, headerBgColor } from "@/assets/css/var.less";
import { Menu } from "@/settings.js";
export default {
    name: "HeaderMenu",
    props: [],
    components: {},
    data: function () {
        return {
            activeIndex: "",

            lightblue,
            headerBgColor,

            Menu,
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSelect(path) {
            window.open(path, "_blank");
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
.el-menu-item:not(.is-disabled):hover,
.el-sub-menu .el-sub-menu__title:hover {
    color: #79bbff !important;
}
@media screen and (max-width: @phone) {
    .c-header-menu {
        display: none;
    }
}
</style>
