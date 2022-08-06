<template>
    <div class="l-default">
        <template v-if="hasPermission">
            <common-sidebar>
                <CommonNav></CommonNav>
                <slot name="sidebar"></slot>
            </common-sidebar>
            <common-header><slot name="header"></slot></common-header>
            <common-content class="c-common-content" :class="{ 'is-collapse': isCollapse }">
                <common-route></common-route>
                <router-view />
                <slot></slot>
            </common-content>
        </template>
        <template v-else>
            <default-adenoid />
        </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CommonSidebar from "@/components/common/sidebar";
import CommonNav from "@/components/common/nav";
import CommonHeader from "@/components/common/header.vue";
import CommonRoute from "@/components/common/route";
import CommonContent from "@/components/common/content.vue";
import DefaultAdenoid from "@/components/layouts/default-adenoid.vue";

export default {
    name: "DefaultLayout",
    props: [],
    components: {
        CommonSidebar,
        CommonNav,
        CommonHeader,
        CommonRoute,
        CommonContent,
        DefaultAdenoid,
    },
    data: function () {
        return {
            // TODO:权限逻辑
            hasPermission: true,
        };
    },
    computed: {
        ...mapGetters({
            sidebar: "sidebar",
        }),
        isCollapse() {
            return this.sidebar.opened;
        },
    },
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
@import "@/assets/css/layouts/default.less";
</style>
