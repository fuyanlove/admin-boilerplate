import { tokenExpires } from "../settings";
class User {
    static TOKEN_KEY = "Admin_TOKEN";
    static LAST_AUTH = "LAST_AUTH_Admin";
    constructor() {
        this.profile = {};

        this.anonymous = {
            id: 0,
            username: "anonymous",
            nickname: "匿名用户",
            avatar: "",
        };
        // 30天
        this.expires = tokenExpires;
        this.created_at = 0;
    }

    // 检查当前状态
    check() {
        if (this.isLogin()) {
            this.profile.id = localStorage && localStorage.getItem("uid");
            this.profile.group = (localStorage && localStorage.getItem("group")) || 1;
            this.profile.token = localStorage && localStorage.getItem("token");
            this.profile.username = localStorage && localStorage.getItem("username");
            this.profile.status = localStorage && localStorage.getItem("status");
        } else {
            this.profile = this.anonymous;
        }
        return this;
    }

    /**
     * 更新用户信息
     * @param {Object} data 用户信息
     * @memberof User
     */
    update(data) {
        return new Promise((resolve, reject) => {
            try {
                this._save(data);
                resolve(data);
            } catch (error) {
                //如果localStorage不存在或已满
                if (localStorage) {
                    localStorage.clear();
                    this._save(data);
                    resolve(this);
                } else {
                    reject(new Error("localStorage不可用"));
                }
            }
        });
    }

    /**
     * 保存用户信息到本地
     * @param {Object} data 用户信息
     * @memberof User
     */
    _save(data) {
        this.userData = data;
        localStorage.setItem(User.TOKEN_KEY, data.token);
        localStorage.setItem(User.LAST_AUTH, Date.now());
        localStorage.setItem("uid", data.id);
        localStorage.setItem("group", data.group);
        localStorage.setItem("username", data.username);
        localStorage.setItem("status", data.status);
        localStorage.setItem("avatar", data.avatar);
    }

    /**
     * 注销
     * @memberof User
     */
    logout() {
        localStorage.removeItem(User.TOKEN_KEY);
        localStorage.removeItem(User.LAST_AUTH);
    }

    /**
     * 获取令牌
     * @returns {String} 令牌
     * @memberof User
     */
    getToken() {
        return localStorage.getItem(User.TOKEN_KEY);
    }

    // 获取用户基础缓存信息
    getInfo() {
        this.check();
        return this.profile;
    }

    /**
     * 是否已登录
     * @returns {Boolean} 是否已登录
     * @memberof User
     */
    isLogin() {
        this.created_at = !localStorage.getItem(User.LAST_AUTH) ? -Infinity : localStorage.getItem(User.LAST_AUTH);
        return this.getToken() && Date.now() - this.created_at < this.expires;
    }

    /**
     * 前往登录
     * @param {String} redirect 登录后跳转的地址
     * @memberof User
     */
    toLogin(redirect) {
        redirect = redirect ? encodeURIComponent(redirect) : encodeURIComponent(location.href);
        location.href = "/login?redirect=" + redirect;
    }

    /**
     * 更新指定缓存字段
     *
     * @param {String} key 缓存字段
     * @param {String} value 缓存值
     * @returns {*}
     * @memberof User
     */
    updateCache(key, value) {
        return localStorage.setItem(key, value);
    }
}

export default new User();
