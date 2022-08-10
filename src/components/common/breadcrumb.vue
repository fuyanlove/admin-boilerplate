<template>
    <div class="c-breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item class="u-root" :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: item.path }" v-for="item in routePath" :key="item">
                {{ item.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import { ArrowRight } from "@element-plus/icons-vue";
import { markRaw } from "vue";
export default {
    name: "CommonBreadcrumb",
    props: [],
    components: {},
    data: function () {
        return {
            ArrowRight: markRaw(ArrowRight),
        };
    },
    computed: {
        routePath: function () {
            return this.$route.meta?.breadcrumbs || [];
        },
    },
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.c-breadcrumb {
    padding: 20px;
    // .u-root {
    //     :deep(.el-breadcrumb__separator) {
    //         display: none;
    //     }
    // }
}
</style>
