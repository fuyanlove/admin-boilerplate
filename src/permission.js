import router from "./router";
import store from "./store";
import getPageTitle from "./utils/getPageTitle";

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title);

    const accessRoutes = await store.dispatch("permission/generateRoutes", to.meta.roles || []);

    router.addRoute(accessRoutes);

    next();
});
