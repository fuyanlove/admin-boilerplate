<template>
    <a href="/" class="c-header-logo">
        <i class="u-logo">
            <img src="@/assets/img/common/logo.svg" svg-inline fill="#fff" />
        </i>
        <span class="u-title">{{ Title }}</span>
    </a>
</template>

<script>
import { Title } from "@/settings.js";
export default {
    name: "HeaderLogo",
    props: [],
    components: {},
    data: function () {
        return {
            Title,
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.c-header-logo {
    height: @header-height;
    padding: 5px 20px 5px 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-right: 20px;
    .u-logo {
        display: block;
        margin-right: 8px;
        svg,
        img {
            max-height: 100%;
            width: 38px;
        }
    }
    .u-title {
        color: #fff;
    }
    &:hover {
        .u-title {
            color: @lightblue;
        }
        .u-logo {
            svg,
            img {
                fill: @lightblue;
            }
        }
    }
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
