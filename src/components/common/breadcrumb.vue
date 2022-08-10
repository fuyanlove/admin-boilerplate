<template>
    <div class="c-breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item class="u-root" :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: item.path }" v-for="item in levelList" :key="item">
                {{ item.meta.title }}
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
            levelList: [],
        };
    },
    computed: {
        routePath: function () {
            return this.$route.meta?.breadcrumbs || [];
        },
    },
    watch: {
        $route(route) {
            if (route.path.startsWith("/__redirect/")) {
                return;
            }
            this.getBreadcrumb();
        },
    },
    methods: {
        getBreadcrumb() {
            // only show routes with meta.title
            let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
            const first = matched[0];

            if (first?.path === "/") {
                this.levelList = [];
            } else {
                this.levelList = matched.filter(
                    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
                );
            }
        },
    },
    created: function () {
        this.getBreadcrumb();
    },
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
