import Layout from "@/layouts/default.vue";

export default [
    {
        path: "/account",
        name: "account",
        component: Layout,
        redirect: "/account/list",
        meta: {
            title: "系统账号",
            icon: "account-admin",
        },
        children: [
            {
                path: "list",
                name: "account-list",
                component: () => import("@/views/account/list.vue"),
                meta: {
                    title: "账号管理",
                    icon: "account",
                },
            },
            {
                path: "add",
                name: "account-add",
                component: () => import("@/views/account/add.vue"),
                meta: {
                    title: "创建账号",
                    icon: "account-add",
                },
            },
            {
                path: "edit/:id",
                name: "account-edit",
                component: () => import("@/views/account/edit.vue"),
                hidden: true,
                meta: {
                    title: "编辑账号",
                    icon: "account-edit",
                    activeMenu: "/account/list",
                },
            },
        ],
    },
];
