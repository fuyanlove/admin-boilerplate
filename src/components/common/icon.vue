<template>
    <svg class="i-svg-icon" :width="w" :height="h" :style="{ fill: color }">
        <use v-bind="{ 'xlink:href': `#icon-${name}` }" />
    </svg>
</template>

<script>
export default {
    name: "SvgIcon",
    props: {
        name: {
            type: String,
            required: true,
        },
        w: {
            type: Number,
            default: 20,
        },
        h: {
            type: Number,
            default: 20,
        },
        color: {
            type: String,
            default: "currentColor",
        },
    },
};
</script>
