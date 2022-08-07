<template>
    <div id="tags-view-container" class="c-route layout-navbars-tagsview layout-navbars-tagsview-shadow">
        <scroll-pane ref="scrollPane" @scroll="handleScroll">
            <ul class="layout-navbars-tagsview-ul tags-style-five" v-if="visitedViews">
                <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :key="tag.path"
                    :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                    custom
                    v-slot="{ navigate }"
                >
                    <li
                        @click="navigate"
                        @contextmenu.prevent="openMenu(tag, $event)"
                        role="link"
                        class="layout-navbars-tagsview-ul-li"
                        :class="isActive(tag) ? 'is-active' : ''"
                    >
                        <span class="u-text">
                            {{ tag.title }}
                        </span>
                        <svg-icon
                            class="layout-navbars-tagsview-ul-li-icon layout-icon-three"
                            v-if="!isAffix(tag)"
                            name="ele-Close"
                            @click.prevent.stop="closeSelectedTag(tag)"
                        />
                    </li>
                </router-link>
            </ul>
        </scroll-pane>
        <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>

<script>
import ScrollPane from "./scroll-pane";
import path from "path";

export default {
    name: "routeIndex",
    components: { ScrollPane },
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            affixTags: [],
        };
    },
    computed: {
        visitedViews() {
            return this.$store.state.tagsView.visitedViews;
        },
        routes() {
            return this.$store.state.permission.routes;
        },
    },
    watch: {
        $route() {
            this.initTags();
            this.addTags();
            this.moveToCurrentTag();
        },
        visible(value) {
            if (value) {
                document.body.addEventListener("click", this.closeMenu);
            } else {
                document.body.removeEventListener("click", this.closeMenu);
            }
        },
    },
    mounted() {
        this.initTags();
        this.addTags();
    },
    methods: {
        isActive(route) {
            return route.path === this.$route.path;
        },
        isAffix(tag) {
            return tag.meta && tag.meta.affix;
        },
        filterAffixTags(routes, basePath = "/") {
            let tags = [];
            routes.forEach((route) => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path);
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta },
                    });
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(route.children, route.path);
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags];
                    }
                }
            });
            return tags;
        },
        initTags() {
            const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
            for (const tag of affixTags) {
                // Must have tag name
                if (tag.name) {
                    this.$store.dispatch("tagsView/addVisitedView", tag);
                }
            }
        },
        addTags() {
            const { name } = this.$route;
            if (name) {
                this.$store.dispatch("tagsView/addView", this.$route);
            }
            return false;
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag || [];
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag);
                        // when query is different then update
                        if (tag.to.fullPath !== this.$route.fullPath) {
                            this.$store.dispatch("tagsView/updateVisitedView", this.$route);
                        }
                        break;
                    }
                }
            });
        },
        refreshSelectedTag(view) {
            this.$store.dispatch("tagsView/delCachedView", view).then(() => {
                const { fullPath } = view;
                this.$nextTick(() => {
                    this.$router.replace({
                        path: "/redirect" + fullPath,
                    });
                });
            });
        },
        closeSelectedTag(view) {
            this.$store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
                if (this.isActive(view)) {
                    this.toLastView(visitedViews, view);
                }
            });
        },
        closeOthersTags() {
            this.$router.push(this.selectedTag);
            this.$store.dispatch("tagsView/delOthersViews", this.selectedTag).then(() => {
                this.moveToCurrentTag();
            });
        },
        closeAllTags(view) {
            this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
                if (this.affixTags.some((tag) => tag.path === view.path)) {
                    return;
                }
                this.toLastView(visitedViews, view);
            });
        },
        toLastView(visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
                this.$router.push(latestView.fullPath);
            } else {
                // now the default is to redirect to the home page if there is no tags-view,
                // you can adjust it according to your needs.
                if (view.name === "index") {
                    // to reload home page
                    this.$router.replace({ path: "/redirect" + view.fullPath });
                } else {
                    this.$router.push("/");
                }
            }
        },
        openMenu(tag, e) {
            const menuMinWidth = 105;
            const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
            const offsetWidth = this.$el.offsetWidth; // container width
            const maxLeft = offsetWidth - menuMinWidth; // left boundary
            const left = e.clientX - offsetLeft + 15; // 15: margin right

            if (left > maxLeft) {
                this.left = maxLeft;
            } else {
                this.left = left;
            }
            this.top = e.clientY - this.$el.getBoundingClientRect().top;
            this.visible = true;
            this.selectedTag = tag;
        },
        closeMenu() {
            this.visible = false;
        },
        handleScroll() {
            this.closeMenu();
        },
    },
};
</script>

<style lang="less" scoped>
.c-route {
    position: fixed;
    top: @header-height;
    left: @aside-width;
    right: 0;
    z-index: 99;
    height: @route-height;

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }

    &.is-collapse {
        left: 65px;
    }
}
.layout-navbars-tagsview {
    background-color: #fff;
    border-bottom: 1px solid #f1f2f3;
    // position: relative;

    :deep(.el-scrollbar__wrap) {
        overflow-x: auto !important;
    }
    &-ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 34px;
        display: flex;
        align-items: center;
        color: #606266;
        font-size: 12px;
        white-space: nowrap;
        padding: 0 15px;
        &-li {
            height: 26px;
            line-height: 26px;
            display: flex;
            align-items: center;
            border: 1px solid #ebeef5;
            padding: 0 15px;
            margin-right: 5px;
            border-radius: 2px;
            position: relative;
            z-index: 0;
            cursor: pointer;
            justify-content: space-between;
            box-sizing: border-box;
            outline: none;
            &:hover {
                background-color: #ebf5ff;
                color: #409eff;
                border-color: #9fceff;
            }
            &-iconfont {
                position: relative;
                left: -5px;
                font-size: 12px;
            }
            &-icon {
                border-radius: 100%;
                position: relative;
                height: 14px;
                width: 14px;
                text-align: center;
                line-height: 14px;
                right: -5px;
                &:hover {
                    color: #fff;
                    background-color: #79bbff;
                }
            }
            .layout-icon-active {
                display: block;
            }
            .layout-icon-three {
                display: none;
            }
            .u-text {
                user-select: none;
            }
        }
        .is-active {
            color: #fff;
            background: #409eff;
            border-color: #409eff;
            transition: border-color 3s ease;
        }
    }
    .tags-style-five {
        align-items: flex-end;
        .tags-style-five-svg {
            -webkit-mask-box-image: url("data:image/svg+xml,%3Csvg width='68' height='34' viewBox='0 0 68 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='m27,0c-7.99582,0 -11.95105,0.00205 -12,12l0,6c0,8.284 -0.48549,16.49691 -8.76949,16.49691l54.37857,-0.11145c-8.284,0 -8.60908,-8.10146 -8.60908,-16.38546l0,-6c0.11145,-12.08445 -4.38441,-12 -12,-12l-13,0z' fill='%23409eff'/%3E%3C/svg%3E")
                12 27 15;
        }
        .layout-navbars-tagsview-ul-li {
            padding: 0 5px;
            border-width: 15px 27px 15px;
            border-style: solid;
            border-color: transparent;
            margin: 0 -15px;
            .layout-icon-active,
            .layout-navbars-tagsview-ul-li-iconfont,
            .layout-navbars-tagsview-ul-li-refresh {
                display: none;
            }
            .layout-icon-three {
                display: block;
            }
            &:hover {
                .tags-style-five-svg;
                background: #ecf5ff;
                color: unset;
            }
        }
        .is-active {
            .tags-style-five-svg;
            background: #ecf5ff !important;
            color: #409eff !important;
            z-index: 1;
        }
    }
}
.layout-navbars-tagsview-shadow {
    box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
}
</style>
