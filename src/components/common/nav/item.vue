<template>
    <div class="m-nav-item">
        <template v-if="icon">
            <svg-icon :name="icon"></svg-icon>
        </template>
        <span v-if="title">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: "MenuItem",
    props: {
        icon: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
.m-nav-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
