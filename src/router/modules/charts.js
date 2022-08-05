const chartsRouter = {
    path: "/charts",
    name: "charts",
    component: () => import("@/views/Index"),
    meta: {
        title: "图标",
        icon: "logo",
    },
    children: [
        {
            path: "line",
            component: () => import("@/views/charts/index"),
            name: "line",
            meta: { title: "line", icon: "logo", affix: true },
        },
    ],
};

export default chartsRouter;
