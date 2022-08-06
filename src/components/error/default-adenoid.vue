<template>
    <div class="l-default-adenoid">
        <img class="u-img" src="@/assets/img/error/adenoid.svg" svg-inline />
        <div class="u-text">
            <div class="u-text-cn">抱歉，您没有权限访问该页面</div>
            <div class="u-text-en">Sorry, you don't have access to this page.</div>
            <el-button class="u-btn" type="primary" @click="go('/')">返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DefaultAdenoid",
    methods: {
        go(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped lang="less">
.l-default-adenoid {
    text-align: center;
    padding: 80px;
    .u-text {
        margin-top: 20px;
        font-size: 16px;
        line-height: 2;

        .u-text-en {
            color: #999;
        }
    }
    .u-btn {
        margin-top: 20px;
    }
}
</style>
