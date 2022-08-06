import router from "./router";
import store from "./store";
import getPageTitle from "./utils/getPageTitle";

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
// 权限判定
router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title);

    const accessRoutes = await store.dispatch("permission/generateRoutes", to.meta.roles || []);

    router.addRoute(accessRoutes);

    next();
});

// 未登录
const isAuthenticated = true;
router.beforeEach(async (to) => {
    if (
        // 检查用户是否已登录
        !isAuthenticated &&
        // ❗️ 避免无限重定向
        to.name !== "login"
    ) {
        // 将用户重定向到登录页面
        return { name: "login" };
    }
});
