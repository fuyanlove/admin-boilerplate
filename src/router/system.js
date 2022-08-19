const ActionLog = () => import("@/views/system/action-log.vue");
import Layout from "@/layouts/default.vue";

export default [
    {
        path: "/system",
        name: "system",
        meta: {
            title: "系统管理",
            icon: "system",
        },
        component: Layout,
        redirect: "/system/action-log",
        children: [
            {
                path: "action-log",
                name: "action-log",
                component: ActionLog,
                meta: {
                    title: "操作日志",
                    icon: "log",
                },
            },
            {
                path: "upload-log",
                name: "upload-log",
                component: ActionLog,
                meta: {
                    title: "上传记录",
                    icon: "log2",
                },
            },
        ],
    },
];
