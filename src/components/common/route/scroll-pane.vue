<template>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container">
        <slot />
    </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
    name: "ScrollPane",
    emits: ["scroll"],
    computed: {
        scrollWrapper() {
            return this.$refs.scrollContainer.$refs.wrap$;
        },
    },
    mounted() {
        this.scrollWrapper.addEventListener("scroll", this.emitScroll, true);
    },
    beforeUnmount() {
        this.scrollWrapper.removeEventListener("scroll", this.emitScroll);
    },
    methods: {
        emitScroll() {
            this.$emit("scroll");
        },
        // 移动到指定位置
        moveToTarget(currentTag) {
            const $container = this.$refs.scrollContainer.$el;
            const $containerWidth = $container.offsetWidth;
            const $scrollWrapper = this.scrollWrapper;
            const tagList = this.$parent.$refs.tag;

            let firstTag = null;
            let lastTag = null;

            // find first tag and last tag
            if (tagList.length > 0) {
                firstTag = tagList[0];
                lastTag = tagList[tagList.length - 1];
            }

            if (firstTag === currentTag) {
                $scrollWrapper.scrollLeft = 0;
            } else if (lastTag === currentTag) {
                $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
            } else {
                // find preTag and nextTag
                const currentIndex = tagList.findIndex((item) => item === currentTag);
                const prevTag = tagList[currentIndex - 1];
                const nextTag = tagList[currentIndex + 1];

                // the tag's offsetLeft after of nextTag
                const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

                // the tag's offsetLeft before of prevTag
                const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

                if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
                    $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
                } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
                    $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
                }
            }
        },
    },
};
</script>

<style lang="less" scoped>
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    :deep(.el-scrollbar__bar) {
        bottom: 0;
    }
}
</style>
