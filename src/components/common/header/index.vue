<template>
    <div class="c-header">
        <div class="c-header-inner">
            <!-- LOGO -->
            <header-logo />
            <!-- 公告 -->
            <header-notice />
            <!-- 头部菜单 -->
            <header-menu />
        </div>
        <slot></slot>
        <div class="c-header-panel">
            <!-- 用户与国际化切换 -->
        </div>
    </div>
</template>

<script>
import HeaderMenu from "./menu.vue";
import HeaderNotice from "./notice.vue";
import HeaderLogo from "./logo.vue";
export default {
    name: "CommonHeader",
    props: [],
    components: {
        HeaderMenu,
        HeaderNotice,
        HeaderLogo,
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

<style lang="less" scoped>
.c-header {
    height: @header-height;
    display: flex;
    align-items: center;
    background-color: @header-bgcolor;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
}
.c-header-inner {
    display: flex;
    align-items: center;
    flex: 1;
}
</style>
