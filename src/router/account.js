export default [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/account/login.vue"),
        hidden: true,
    },
];
