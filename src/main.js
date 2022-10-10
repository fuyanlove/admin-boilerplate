// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Modules
import router from "./router/index";
app.use(router);

import store from "./store/index";
app.use(store);

import LoadScript from "vue-plugin-load-script";
app.use(LoadScript);

// 3.Permission
import "./permission";

// 4.Components
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
app.use(ElementPlus, {
    locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

import svgIcon from "@/utils/svgIcon";
app.use(svgIcon);

// 5.Mount DOM
app.mount("#app");
