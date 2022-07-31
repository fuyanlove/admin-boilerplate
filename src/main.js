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

// 3.Components
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);

import Icon from "./components/common/icon.vue";
app.component("SvgIcon", Icon);

// 3.Mount DOM
app.mount("#app");
