<template>
    <!-- 页面布局方案 -->
    <DefaultLayout>
        <template #header>
            <!-- 附加到公共头部分 -->
        </template>

        <template #sidebar>
            <!-- 附加到侧边栏部分 -->
        </template>

        <!-- 附加到内容部分 -->
    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default.vue";
import { mapMutations } from "vuex";
import { Local } from "@/utils/storage";
export default {
    name: "App",
    components: {
        DefaultLayout,
    },
    data: function () {
        return {};
    },
    created() {
        this.initSidebar();
    },
    methods: {
        ...mapMutations({
            setSidebarStatus: "app/SET_SIDEBAR_STATUS",
        }),
        initSidebar() {
            const sidebar = Local.get("sidebarStatus");
            if (window.innerWidth < 768) {
                this.setSidebarStatus(false);
            } else {
                this.setSidebarStatus(sidebar);
            }
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
