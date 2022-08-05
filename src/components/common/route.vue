<template>
    <div class="c-route">
        <el-scrollbar ref="scrollbarRef">
            <ul class="m-route-ul" ref="tagsUlRef">
                <!-- <li v-for="(v, k) in "></li> -->
            </ul>
        </el-scrollbar>
    </div>
</template>

<script>
import Session from "@/utils/storage";
export default {
    name: "CommonRoute",
    props: [],
    components: {},
    data: function () {
        return {
            tagViewList: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
        addBrowserSetSession(tagsViewList) {
            Session.set("tagsViewList", tagsViewList);
        },
    },
};
</script>
