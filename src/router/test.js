const test = () => import("@/views/test/index.vue");
import Layout from "@/layouts/default.vue";

export default [
    {
        path: "/test1",
        name: "test1",
        component: Layout,
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
        component: Layout,
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
