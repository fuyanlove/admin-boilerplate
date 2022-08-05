// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Modules
import router from "./router/index";
app.use(router);

import store from "./store/index";
app.use(store);

import { createHead } from "@vueuse/head";
const head = createHead();
app.use(head);

import "./permission";

// 3.Components
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

import svgIcon from "@/utils/svgIcon";
app.use(svgIcon);

// 3.Mount DOM
app.mount("#app");
