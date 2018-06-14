export default {
  state: {
    name: '',
    data: {},
  },
  mutations: {
    open(state, name) {
      state.name = name;
    },
    close(state) {
      state.name = '';
      state.data = {};
    },
  },
  getters: {
    isOpened: (state) => (name) => {
      return (name) ? (state.name === name) : (state.name !== '');
    },
    currentPage: (state) => state.name,
    isProfileOpened(state) {
      return state.name !== '';
    },
    isProfilePageOpened(state) {
      return state.name === 'accountInformation' || state.name === 'verification';
    },
    isSettingPageOpened(state) {
      return state.name === 'securitySettings' || state.name === 'securityLog';
    },
    isPageHistoryOpened(state) {
      return state.name === 'transactionHistory' || state.name === 'myOrders';
    },
  },
  actions: {
    getOpenPage({commit}, name) {
      commit('open', name);
      commit('misc/hiddenSidebar', null, {root: true});
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
