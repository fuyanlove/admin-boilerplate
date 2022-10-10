import router from "./router";
import store from "./store";
import { getPageTitle } from "./utils/common";

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
// TODO:权限判定
router.beforeEach(async (to) => {
    // 设置文档标题
    document.title = getPageTitle(to.meta.title);

    await store.dispatch("permission/generateRoutes", to.meta.roles || []);
});
