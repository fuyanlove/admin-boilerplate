export default [
    {
        path: "/test1",
        name: "test1",
        component: () => import("@/layouts/default.vue"),
        redirect: "/test1/square",
        children: [
            {
                path: "square",
                name: "square",
                component: () => import("@/views/test/index.vue"),
                meta: {
                    title: "Square",
                    icon: "test",
                    affix: false,
                },
            },
        ],
    },
    {
        path: "/test2",
        name: "test2",
        meta: {
            title: "Test2",
            icon: "test",
        },
        component: () => import("@/layouts/default.vue"),
        redirect: "/test2/line",
        children: [
            {
                path: "line",
                name: "line",
                component: () => import("@/views/test/index.vue"),
                meta: {
                    title: "Line",
                    icon: "test",
                    affix: false,
                },
            },
            {
                path: "circle",
                name: "circle",
                component: () => import("@/views/test/index.vue"),
                meta: {
                    title: "Circle",
                    icon: "test",
                    affix: false,
                },
            },
        ],
    },
    /* {
        path: "/test3",
        name: "test3",
        component: Layout,
        meta: {
            title: "Test3",
            icon: "test",
        },
        redirect: "/test3/square",
        children: [
            {
                path: "square",
                name: "square",
                component: test,
                meta: {
                    title: "Square",
                    icon: "test",
                    affix: false,
                },
            },
        ],
        hidden: true,
    }, */
];
