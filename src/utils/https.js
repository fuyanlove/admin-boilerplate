/*
 * @Author: iRuxu
 * @Date: 2022-06-16 18:32:38
 * @LastEditTime: 2022-07-13 18:27:30
 * @Description: 通用请求器
 */

import { installStandardInterceptors } from "./interceptors.js";
import axios from "axios";
const { API, tokenKey } = require("@/settings.js");
import User from "./user";

// cms通用请求接口
function $cms(options) {
    let domain = (options && options.domain) || API.cms;
    let config = {
        // 同时发送cookie和basic auth
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + User.getToken(),
        },
        baseURL: process.env.NODE_ENV === "production" ? domain : "/",
    };

    // 创建实例
    const ins = axios.create(config);

    // 指定拦截器
    installStandardInterceptors(ins, options);

    return ins;
}

export { $cms };
