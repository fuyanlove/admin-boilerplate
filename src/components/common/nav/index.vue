<template>
    <div class="c-nav">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu" :unique-opened="false" :collapse-transition="false" mode="vertical">
                <nav-item v-for="route in permissionRoutes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavItem from "./nav-item.vue";
export default {
    name: "CommonNav",
    props: [],
    components: {
        NavItem,
    },
    computed: {
        ...mapGetters(["permissionRoutes"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
    },
};
</script>

<style scoped lang="less">
.c-nav {
    height: 100%;
}
</style>
