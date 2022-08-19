import { $cms } from "@/utils/https.js";

function getActionLogs(params) {
    return $cms(`/api/cms/system/action-logs`, {
        params,
    });
}

export { getActionLogs };
