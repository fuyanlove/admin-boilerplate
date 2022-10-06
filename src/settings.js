module.exports = {
    // document title
    Title: "Admin",

    // API
    API: {
        cms: "https://",
    },

    Menu: [
        {
            name: "Menu1",
            title: "Menu1",
            path: "/menu1",
        },
        {
            name: "Menu2",
            title: "Menu2",
            path: "/menu2",
            children: [
                {
                    name: "Menu2-1",
                    title: "Menu2-1",
                    path: "/menu2-1",
                },
                {
                    name: "Menu2-2",
                    title: "Menu2-2",
                    path: "/menu2-2",
                    children: [
                        {
                            name: "Menu2-2-1",
                            title: "Menu2-2-1",
                            path: "/menu2-2-1",
                        },
                    ],
                },
            ],
        },
        {
            name: "Menu3",
            title: "Menu3",
            path: "/menu3",
            disabled: true,
        },
    ],
};
