import { Local, Session } from "@/utils/storage";
import { getGroupList } from "@/service/account";

const state = {
    sidebar: {
        opened: true,
        withoutAnimation: false,
    },
    device: "desktop",
    size: Local.get("size") || "medium",

    userGroup: [], // 用户组
};

const mutations = {
    TOGGLE_SIDEBAR: (state) => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
        if (state.sidebar.opened) {
            Local.set("sidebarStatus", 1);
        } else {
            Local.set("sidebarStatus", 0);
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Local.set("sidebarStatus", 0);
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device;
    },
    SET_SIZE: (state, size) => {
        state.size = size;
        Local.set("size", size);
    },
    SET_SIDEBAR_STATUS: (state, status) => {
        state.sidebar.opened = status;
        if (status) {
            Local.set("sidebarStatus", 1);
        } else {
            Local.set("sidebarStatus", 0);
        }
    },
    SET_USER_GROUP: (state, userGroup) => {
        state.userGroup = userGroup;
    },
};

const actions = {
    toggleSideBar({ commit }) {
        commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    toggleDevice({ commit }, device) {
        commit("TOGGLE_DEVICE", device);
    },
    setSize({ commit }, size) {
        commit("SET_SIZE", size);
    },
    loadGroupList({ commit }, refresh) {
        // 需要重新加载
        if (refresh) {
            Session.remove("groupList");
        }
        try {
            const groupList = Session.get("groupList");
            if (groupList) {
                commit("SET_USER_GROUP", groupList);
            } else {
                getGroupList().then((res) => {
                    commit("SET_USER_GROUP", res.data.data);
                    Session.set("groupList", res.data.data);
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
