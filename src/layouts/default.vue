<template>
    <div class="l-default">
        <template v-if="hasPermission">
            <common-sidebar>
                <CommonNav></CommonNav>
                <slot name="sidebar"></slot>
            </common-sidebar>
            <common-header><slot name="header"></slot></common-header>
            <common-route :class="{ 'is-collapse': !isCollapse }"></common-route>
            <common-content :class="{ 'is-collapse': !isCollapse }">
                <template #prepend>
                    <common-breadcrumb></common-breadcrumb>
                </template>
                <router-view v-slot="{ Component, route }">
                    <transition name="slide-fade">
                        <component :is="Component" :key="route.path" />
                    </transition>
                </router-view>

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
import CommonHeader from "@/components/common/header/index.vue";
import CommonRoute from "@/components/common/route";
import CommonBreadcrumb from "@/components/common/breadcrumb";
import CommonContent from "@/components/common/content.vue";
import DefaultAdenoid from "@/components/error/default-adenoid.vue";

export default {
    name: "DefaultLayout",
    props: [],
    components: {
        CommonSidebar,
        CommonNav,
        CommonHeader,
        CommonRoute,
        CommonBreadcrumb,
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

<style lang="less">
@import "@/assets/css/layouts/default.less";
</style>
