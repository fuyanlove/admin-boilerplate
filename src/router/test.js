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
        children: [
            {
                path: "square",
                name: "square",
                component: test,
                meta: { title: "Square", icon: "test", affix: false },
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
        children: [
            {
                path: "line",
                name: "line",
                component: test,
                meta: { title: "Line", icon: "test", affix: false },
            },
            {
                path: "circle",
                name: "circle",
                component: test,
                meta: { title: "Circle", icon: "test", affix: false },
            },
        ],
    },
];
