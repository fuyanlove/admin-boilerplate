<template>
    <aside
        class="c-sidebar"
        :class="{
            'c-sidebar--opened': isCollapse,
            'c-sidebar--closed': !isCollapse,
            'without-bread': withoutBread,
        }"
    >
        <div class="c-sidebar-inner">
            <slot></slot>
        </div>

        <div class="c-sidebar-footer">
            <slot name="footer"></slot>
        </div>

        <span class="c-sidebar-toggle" @click="toggleCollapse">
            <svg-icon class="u-toggle-icon" name="expand" :class="{ collapse: isCollapse }" :w="20" :h="20"></svg-icon>
        </span>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "CommonSidebar",
    props: {
        withoutBread: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            // isCollapse: false,
        };
    },
    computed: {
        ...mapGetters({
            sidebar: "sidebar",
        }),
        isCollapse() {
            return this.sidebar.opened;
        },
    },
    methods: {
        ...mapActions({
            toggleSidebar: "app/toggleSideBar",
        }),
        toggleCollapse() {
            this.toggleSidebar();
        },
    },
};
</script>

<style lang="less" scoped>
.c-sidebar {
    .w(@aside-width);
    box-sizing: border-box;
    // padding: 10px;
    .pf;
    .z(600);
    left: 0;
    top: @header-height;
    bottom: 0;
    background-color: #fff;
    border-right: 1px solid #eee;

    &.without-bread {
        top: @header-height;
    }

    &-toggle {
        .pa;
        .rb(0);
        .size(20px);
        .pointer;
        padding: 10px;
        .u-toggle-icon {
            cursor: pointer;
        }
        .collapse {
            transform: rotate(180deg);
        }
    }

    &--closed {
        width: 65px;
        transition: 0.2s ease-in-out;
        transform: translateX(0);

        .c-sidebar-toggle {
            transition: 0.2s ease-in-out;
            transform: translateX(100%);
        }
    }

    &--opened {
        transition: 0.2s ease-in-out;
        transform: translateX(0);

        .c-sidebar-toggle {
            transition: 0.2s ease-in-out;
            transform: translateX(0);
        }
    }
}
.c-sidebar-inner {
    height: calc(100% - 80px);
}
.c-sidebar-footer {
    height: 80px;
    overflow: hidden;
}
</style>
