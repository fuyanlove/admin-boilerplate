// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";

// 2.Routes
import testRoutes from "./test";
export const constantRoutes = [
    {
        path: "/redirect",
        component: () => import("@/layouts/default.vue"),
        hidden: true,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect"),
            },
        ],
    },
    {
        path: "/",
        name: "index",
        // redirect: "/dashboard", // 重定向首页
        component: () => import("@/views/index/default.vue"),
        meta: {
            title: "Dashboard",
            icon: "dashboard",
            affix: true,
        },
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
