<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Local } from "@/utils/storage";
export default {
    name: "App",
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
