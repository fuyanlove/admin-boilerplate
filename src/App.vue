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
export default {
    name: "App",
    components: {
        DefaultLayout,
    },
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
