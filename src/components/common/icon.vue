<template>
    <img
        class="i-svg-icon"
        :class="`i-svg-${name}`"
        :src="getIcon(name)"
        svg-inline
        :fill="color"
        :width="w"
        :height="h"
        :ref="name"
    />
</template>

<script>
export default {
    name: "SvgIcon",
    props: ["name", "color", "w", "h"],
    methods: {
        getIcon: function () {
            return require(`../../assets/img/icon/${this.name}.svg`);
        },
    },
};
</script>
