import { $cms } from "@/utils/https.js";

function getActionLogs(params) {
    return $cms().get(`/api/cms/system/action/logs`, {
        params,
    });
}

export { getActionLogs };
