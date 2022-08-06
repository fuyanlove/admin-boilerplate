<template>
    <div class="c-header">
        <div class="c-header-inner">
            <div class="c-header-logo">
                <a href="/" class="u-logo">
                    <svg-icon class="u-icon" name="logo" color="#fff" :w="32" :h="32"></svg-icon>
                    <span class="u-title">TITLE</span>
                </a>
            </div>
            <div class="c-header-notice">
                <!-- 公告 -->
            </div>
            <div class="c-header-menu">
                <!-- 菜单 -->
            </div>
        </div>
        <slot></slot>
        <div class="c-header-panel">
            <!-- 用户与国际化切换 -->
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonHeader",
    props: [],
    components: {},
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
    background-color: #262f3e;
}
.c-header-inner {
    display: flex;
    align-items: center;
    flex: 1;
}
.c-header-logo {
    height: @header-height;
    padding: 5px 8px;
    box-sizing: border-box;
    .u-logo {
        display: flex;
        height: 100%;
        align-items: center;
        .u-icon {
            max-height: 100%;
            margin-right: 5px;
        }
        .u-title {
            color: #fff;
        }
    }
}
</style>
