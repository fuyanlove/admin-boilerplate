import defaultSettings from "@/settings";

const title = defaultSettings.title || "admin-boilerplate";

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}
