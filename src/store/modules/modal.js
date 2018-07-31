// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export default {
  state: {
    name: 'fiat',
    data: {
      isDeposit: false,
      currency: 'USD',
    },
  },
  mutations: {
    open(state, {name, data}) {
      state.data = data;
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
  },

  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
