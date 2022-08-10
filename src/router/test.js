const test = () => import("@/views/test/index.vue");

export default [
    {
        path: "/test1",
        name: "test1",
        component: test,
        meta: {
            title: "Test1",
            icon: "test",
        },
        redirect: "/test1/square",
        children: [
            {
                path: "square",
                name: "square",
                component: test,
                meta: {
                    title: "Square",
                    icon: "test",
                    affix: false,
                    breadcrumbs: [
                        { name: "测试1", path: "/test1" },
                        { name: "方形", path: "/test1/square" },
                    ],
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
        component: test,
        redirect: "/test2/line",
        children: [
            {
                path: "line",
                name: "line",
                component: test,
                meta: {
                    title: "Line",
                    icon: "test",
                    affix: false,
                    breadcrumbs: [
                        { name: "测试2", path: "/test2" },
                        { name: "线形", path: "/test2/line" },
                    ],
                },
            },
            {
                path: "circle",
                name: "circle",
                component: test,
                meta: {
                    title: "Circle",
                    icon: "test",
                    affix: false,
                    breadcrumbs: [
                        { name: "测试2", path: "/test2" },
                        { name: "圆形", path: "/test2/circle" },
                    ],
                },
            },
        ],
    },
];
