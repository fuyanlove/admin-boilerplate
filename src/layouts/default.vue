<template>
    <div class="l-default">
        <template v-if="isLogin">
            <template v-if="hasPermission">
                <CommonSidebar>
                    <CommonNav></CommonNav>
                </CommonSidebar>
                <CommonHeader>
                    <CommonRoute></CommonRoute>
                </CommonHeader>
                <CommonContent>
                    <slot></slot>
                </CommonContent>
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
import CommonSidebar from "@/components/common/sidebar.vue";
import CommonNav from "@/components/common/nav.vue";
import CommonHeader from "@/components/common/header.vue";
import CommonRoute from "@/components/common/route.vue";

export default {
    name: "DefaultLayout",
    props: [],
    components: {
        CommonSidebar,
        CommonNav,
        CommonHeader,
        CommonRoute,
    },
    data: function () {
        return {
            isLogin: false,
            hasPermission: false,
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>
