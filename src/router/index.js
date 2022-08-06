// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";

// 2.Routes

export const constantRoutes = [
    {
        path: "/",
        redirect: "/dashboard",
        meta: {
            title: "首页",
            icon: "home",
        },
        children: [
            {
                path: "dashboard",
                component: () => import("@/views/dashboard/index"),
                name: "Dashboard",
                meta: { title: "Dashboard", icon: "test", affix: true },
            },
        ],
    },
    {
        path: "/charts",
        name: "charts",
        component: () => import("@/views/charts/index"),
        meta: {
            title: "图标",
            icon: "logo",
        },
        children: [
            {
                path: "line",
                component: () => import("@/views/charts/index"),
                name: "line",
                meta: { title: "line", icon: "logo", affix: false },
            },
        ],
    },
];

export const asyncRoutes = [
    // chartsRouter,
];

// 4.Build An Instance
const router = createRouter({
    history: createWebHashHistory(), //hash
    // history: createWebHistory(),  //history api
    // base : '/rewrite root',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
});

export default router;
