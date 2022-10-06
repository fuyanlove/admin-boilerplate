export default [
    {
        path: "/",
        name: "__root__",
        redirect: "/dashboard", // 重定向首页
        component: () => import("@/layouts/default.vue"),
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
    // { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/_/NotFound.vue") },
    // { path: "/forbidden", name: "NotAuthenticated", component: () => import("@/views/_/NotAuthenticated.vue") },
];
