// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export default {
  state: {
    name: 'alertsList',
    data: {},
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
  mutations: {
    open(state, name) {
      state.name = name;
    },
    close(state) {
      state.name = '';
      state.data = {};
    },
  },
  actions: {
    getOpenPage({commit}, name) {
      commit('open', name);

      // Hidden Sidebar
      commit('misc/hiddenSidebar', null, {root: true});
      // Hidden Modals
      commit('modal/close', null, {root: true});
    },
  },
  namespaced: true,
};
