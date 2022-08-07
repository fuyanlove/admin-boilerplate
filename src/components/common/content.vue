<template>
    <div class="c-content">
        <slot name="prepend"></slot>
        <slot></slot>
        <slot name="append"></slot>
    </div>
</template>

<script>
export default {
    name: "CommonContent",
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

<style scoped lang="less">
.c-content {
    background-color: @bg-light;
    min-height: calc(100vh - @header-height);
    padding-top: @route-height;
    margin-left: @aside-width;

    transition: margin-left 0.3s ease-in-out;
}
</style>
