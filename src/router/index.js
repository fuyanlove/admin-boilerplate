/*=========================================================*/
// route.hidden 如果设置为true，则不会显示在tabs菜单中，侧边栏也不会展示
// route.meta.affix 如果设置为true，则标签不可关闭
/*=========================================================*/

// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";
import { filter, flatten } from "lodash";

// 2.Routes
const files = require.context("./", true, /\.js$/);
const routesModules = files.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = files(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});
export const constantRoutes = [
    ...flatten(
        filter(routesModules, (module) => {
            return module;
        })
    ),
];

// 3.Permission
export const asyncRoutes = [];

// 4.Build An Instance
const router = createRouter({
    history: createWebHashHistory(), //hash
    // history: createWebHistory(),  //history api
    // base : '/rewrite root',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
});

export default router;
