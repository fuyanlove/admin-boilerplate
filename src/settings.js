module.exports = {
    // document title
    Title: "Admin",

    // API
    API: {
        cms: "https://",
    },

    Menu: [
        {
            title: "Menu1",
            path: "/menu1",
        },
        {
            title: "Menu2",
            path: "/menu2",
            children: [
                {
                    title: "Menu2-1",
                    path: "/menu2-1",
                },
                {
                    title: "Menu2-2",
                    path: "/menu2-2",
                    children: [
                        {
                            title: "Menu2-2-1",
                            path: "/menu2-2-1",
                        },
                    ],
                },
            ],
        },
        {
            title: "Menu3",
            path: "/menu3",
            disabled: true,
        },
    ],
};
