// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";

export const constantRoutes = [
    {
        path: "/",
        component: () => import("../views/Index.vue"),
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
];

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
