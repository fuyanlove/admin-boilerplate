<template>
    <div class="p-index">
        <DefaultLayout> </DefaultLayout>
    </div>
</template>

<script>
import DefaultLayout from "@/layouts/default.vue";
export default {
    name: "IndexPage",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
    created: function () {},
    components: {
        DefaultLayout,
    },
};
</script>

<style scoped lang="less">
@import "@/assets/css/index.less";
</style>
