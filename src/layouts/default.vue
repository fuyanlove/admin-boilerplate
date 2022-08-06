<template>
    <div class="l-default">
        <template v-if="isLogin">
            <template v-if="hasPermission">
                <CommonSidebar>
                    <CommonNav></CommonNav>
                </CommonSidebar>
                <CommonHeader> </CommonHeader>
                <common-content class="c-common-content" :class="{ 'is-collapse': isCollapse }">
                    <CommonRoute></CommonRoute>
                    <router-view />
                </common-content>
            </template>
            <template v-else>
                <div class="l-default-adenoid">权限不足</div>
            </template>
        </template>

        <template v-else>
            <div class="l-default-logout">请先登录</div>
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

export default {
    name: "DefaultLayout",
    props: [],
    components: {
        CommonSidebar,
        CommonNav,
        CommonHeader,
        CommonRoute,
        CommonContent,
    },
    data: function () {
        return {
            isLogin: true,
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

<style lang="less" scoped>
.c-common-content {
    margin-left: 0;
    &.is-collapse {
        margin-left: @aside-width - 30px;
    }
}
</style>
