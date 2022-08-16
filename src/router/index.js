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
import Layout from "@/layouts/default.vue";

// 2.Routes
import testRoutes from "./test";
export const constantRoutes = [
    {
        path: "/__redirect",
        name: "__redirect__",
        component: () => import("@/layouts/default.vue"),
        hidden: true, // 如果设置为true，则不会显示在菜单中
        children: [
            {
                path: "/__redirect/:path(.*)",
                component: () => import("@/views/_/index.vue"),
            },
        ],
    },
    {
        path: "/",
        name: "__root__",
        redirect: "/dashboard", // 重定向首页
        component: Layout,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: () => import("@/views/index/default.vue"),
                meta: {
                    title: "Dashboard",
                    icon: "dashboard",
                    affix: true,
                },
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/account/login.vue"),
        hidden: true,
    },
    ...testRoutes,
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
