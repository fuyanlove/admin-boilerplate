const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
    //❤️ Multiple pages ~
    // pages: {
    //     index: {
    //         title: "Home",
    //         entry: "src/main.js",
    //         template: "public/index.html",
    //         filename: "index.html",
    //     },
    //     $project: {
    //         title: "Project",
    //         entry: "src/core/$project/index.js",
    //         template: "public/$project/index.html",
    //         filename: "$project/index.html",
    //     },
    // },

    //⚛️ Proxy ~
    devServer: {
        proxy: {
            // "/api/cms": {
            //     target: process.env["DEV_SERVER"] == "true" ? "localhost" : "remote",
            // },
        },
    },

    //❤️ define path for static files ~
    publicPath: process.env.NODE_ENV === "development" ? "/" : process.env.STATIC_PATH,

    //❤️ Webpack configuration
    chainWebpack: (config) => {
        //💝 in-line small imgs ~
        config.module.rule("images").set("parser", {
            dataUrlCondition: {
                maxSize: 4 * 1024, // 4KiB
            },
        });

        config.module
            .rule("svg")
            .exclude.add(path.join(__dirname, "src/assets/img/icon")) // 排除自定义svg目录
            .end();
        config.module
            .rule("icons") // 新规则
            .test(/\.svg$/)
            .include.add(path.join(__dirname, "src/assets/img/icon")) // 新规则应用于我们存放svg的目录
            .end()
            .use("svg-sprite-loader") // 用sprite-loader接卸
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();

        //💝 in-line svg imgs ~
        config.module.rule("vue").use("vue-svg-inline-loader").loader("vue-svg-inline-loader");

        //💖 import common less var * mixin ~
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        types.forEach((type) => addStyleResource(config.module.rule("less").oneOf(type)));

        config.plugin("node-polyfill").use(NodePolyfillPlugin);
    },
};

function addStyleResource(rule) {
    var preload_styles = [];
    preload_styles.push(
        path.resolve(__dirname, "./node_modules/csslab/base.less"),
        path.resolve(__dirname, "./src/assets/css/var.less")
    );
    rule.use("style-resource").loader("style-resources-loader").options({
        patterns: preload_styles,
    });
}
