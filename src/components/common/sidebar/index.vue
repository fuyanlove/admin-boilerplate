<template>
    <div class="c-sidebar" :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scroll wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in permission_routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scroll>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "./logo.vue";
import variables from "@/assets/css/var.less";
import sidebarItem from "./sidebarItem";
export default {
    name: "CommonSidebar",
    props: [],
    components: {
        logo,
        sidebarItem,
    },
    data: function () {
        return {};
    },
    computed: {
        ...mapGetters(["sidebar"]),
        showLogo() {
            return true;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
        variables() {
            return variables;
        },
    },
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>
