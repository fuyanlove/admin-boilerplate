export default [
    {
        path: "/system",
        name: "system",
        meta: {
            title: "系统管理",
            icon: "system",
        },
        component: () => import("@/layouts/default.vue"),
        redirect: "/system/action-log",
        children: [
            {
                path: "action-log",
                name: "action-log",
                component: () => import("@/views/system/action-log.vue"),
                meta: {
                    title: "操作日志",
                    icon: "log",
                },
            },
            {
                path: "upload-log",
                name: "upload-log",
                component: () => import("@/views/system/action-log.vue"),
                meta: {
                    title: "上传记录",
                    icon: "log2",
                },
            },
        ],
    },
];
