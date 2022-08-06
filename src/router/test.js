const dashboard = () => import("@/views/dashboard/index.vue");

export default [
    {
        path: "/test1",
        name: "test1",
        component: dashboard,
        meta: {
            title: "Test1",
            icon: "test",
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: dashboard,
                meta: { title: "Dashboard", icon: "test", affix: true },
            },
        ],
    },
    {
        path: "/test2",
        name: "test2",
        meta: {
            title: "Test1",
            icon: "logo",
        },
        component: dashboard,
        children: [
            {
                path: "line",
                name: "line",
                component: dashboard,
                meta: { title: "Line", icon: "logo", affix: false },
            },
            {
                path: "circle",
                name: "circle",
                component: dashboard,
                meta: { title: "Circle", icon: "logo", affix: false },
            },
        ],
    },
];
