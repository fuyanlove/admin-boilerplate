<template>
    <div class="c-header-notice">
        <div class="u-text">头部公告区</div>
    </div>
</template>

<script>
export default {
    name: "HeaderNotice",
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
.c-header-notice {
    color: #c1c6c8;
    font-size: 12px;
    height: @header-height;
    .u-text {
        line-height: @header-height;
    }

    margin-right: 20px;
    padding-right: 20px;

    position: relative;
    &:after {
        content: "";
        position: absolute;
        left: 100%;
        top: 20px;
        bottom: 20px;
        width: 1px;
        background-color: rgba(124, 135, 142, 0.5);
    }
}
</style>
