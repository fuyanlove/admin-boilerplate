<template>
    <div v-if="!item.hidden">
        <template
            v-if="
                hasOneShowingChild(item.children, item) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                !item.alwaysShow
            "
        >
            <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
                <div class="m-nav-item" :title="onlyOneChild.meta.title">
                    <template v-if="onlyOneChild.meta.icon || (item.meta && item.meta.icon)">
                        <svg-icon :name="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"></svg-icon>
                    </template>
                    <span v-if="onlyOneChild.meta.title">{{ onlyOneChild.meta.title }}</span>
                </div>
            </el-menu-item>
        </template>

        <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template #title>
                <div v-if="item.meta" class="m-nav-item">
                    <template v-if="item.meta && item.meta.icon">
                        <svg-icon :name="item.meta && item.meta.icon"></svg-icon>
                    </template>
                    <span v-if="item.meta.title">{{ item.meta.title }}</span>
                </div>
            </template>
            <nav-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-sub-menu>
    </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
export default {
    name: "SidebarItem",
    props: {
        // route object
        item: {
            type: Object,
            required: true,
        },
        isNest: {
            type: Boolean,
            default: false,
        },
        basePath: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            onlyOneChild: null,
        };
    },
    methods: {
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter((item) => {
                if (item.hidden) {
                    return false;
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true;
                }
            });

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true;
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
                return true;
            }

            return false;
        },
        resolvePath(routePath) {
            if (isExternal(routePath)) {
                return routePath;
            }
            if (isExternal(this.basePath)) {
                return this.basePath;
            }
            return path.resolve(this.basePath, routePath);
        },
    },
};
</script>

<style lang="less" scoped>
.m-nav-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
