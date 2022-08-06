<template>
    <div class="c-header">
        <div class="c-header-inner">
            <div class="c-header-logo">
                <a href="/" class="c-header-logo-link">
                    <svg-icon class="c-header-logo-icon" name="logo" :w="40" :h="40"></svg-icon>
                </a>
            </div>
            <div class="c-header-nav">
                <slot></slot>
            </div>
        </div>
        <slot name="rightContent"></slot>
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

    .c-header-inner {
        display: flex;
        align-items: center;
        flex: 1;
    }
}
</style>
