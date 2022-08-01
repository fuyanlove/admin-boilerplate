import defaultSettings from "@/settings";

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
};

const mutations = {
    CHANGE_SETTINGS: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value;
        }
    },
};

const actions = {
    changeSettings: ({ commit }, data) => {
        commit("CHANGE_SETTINGS", data);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
