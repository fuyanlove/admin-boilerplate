import { $cms } from "@/utils/https";

// 账密登录
export function authenticatePassword(credentials) {
    return $cms().post(`/api/cms/account/admin/login`, credentials);
}

// 验证码登录
export function authenticateSms(credentials) {
    return $cms().post(
        `/api/user/login/verificationCode`,
        {},
        {
            params: {
                phoneNumber: credentials.phone,
                code: credentials.code,
            },
        }
    );
}

// 获取验证码
export function getVerificationCode(phone) {
    return $cms().get(`/api/user/login/verificationCode`, {
        params: {
            phoneNumber: phone,
        },
    });
}

/**
 * 查询账号是否可用
 * @param {Object} params 参数
 * @param {String} params.username 用户名
 * @param {String} [params.id] 邮箱
 */
export function checkUsername(params) {
    return $cms().get(`/api/cms/account/admin/check`, {
        params,
    });
}

/**
 * 创建管理员账号
 * @param {Object} data 参数
 */
export function createAccount(data) {
    return $cms().post(`/api/cms/account/admin`, data);
}

/**
 * 获取管理员账号列表
 * @param {Object} params 参数
 */
export function getAccountList(params) {
    return $cms().get(`/api/cms/account/admin`, {
        params,
    });
}

/**
 * 删除管理员账号
 * @param {string} id 账号id
 */
export function deleteAccount(id) {
    return $cms().delete(`/api/cms/account/admin/${id}`);
}

/**
 * 获取管理员账号详情
 * @param {string} id 账号id
 */
export function getAccountDetail(id) {
    return $cms().get(`/api/cms/account/admin/${id}`);
}

/**
 * 更新管理员账号
 * @param {string} id 账号id
 * @param {Object} data 参数
 */
export function updateAccount(id, data) {
    return $cms().put(`/api/cms/account/admin/${id}/profile`, data);
}

/**
 * 更新管理员账号密码
 * @param {string} id 账号id
 * @param {Object} data 参数
 */
export function updateAccountPassword(id, data) {
    return $cms().put(`/api/cms/account/admin/${id}/password`, data);
}

/**
 * 获取用户组列表
 */
export function getGroupList() {
    return $cms().get(`/api/cms/account/user/group`);
}
