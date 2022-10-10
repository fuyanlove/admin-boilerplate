import dayjs from "dayjs";
import { ElNotification } from "element-plus";

export function formatDate(value, mode = "date") {
    if (value) {
        if (mode === "date") {
            return dayjs(value).format("YYYY-MM-DD");
        }
        if (mode === "time") {
            return dayjs(value).format("HH:mm:ss");
        }
        if (mode === "datetime") {
            return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
        }
    }
}

/**
 * 去除对象空值
 * @param {*} obj
 * @returns
 */
export function removeEmpty(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

/**
 * 头像地址
 * @param {*} url
 */
export function avatarUrl(url) {
    if (url) {
        return url;
    }
    return require("../assets/img/common/logo.svg");
}

/**
 * 复制文本
 */
export function copyText(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        ElNotification({
            title: "复制成功",
            message: text,
            type: "success",
        });
    } else {
        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        ElNotification({
            title: "复制成功",
            message: text,
            type: "success",
        });
    }
}
