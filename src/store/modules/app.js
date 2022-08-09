import { Local } from "@/utils/storage";

const state = {
    sidebar: {
        opened: true,
        withoutAnimation: false,
    },
    device: "desktop",
    size: Local.get("size") || "medium",
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
        console.log(status);
        state.sidebar.opened = status;
        if (status) {
            Local.set("sidebarStatus", 1);
        } else {
            Local.set("sidebarStatus", 0);
        }
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
