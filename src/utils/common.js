// 获取文档标题
import settings from "@/settings";
const { Title } = settings;
export function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${Title}`;
    }
    return Title || "Admin";
}
