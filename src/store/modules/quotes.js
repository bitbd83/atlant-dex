// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as Quotes from 'services/api/quotes';
import {serverNotification} from 'services/notification';

export default {
  state: {
    info: [],
  },
  mutations: {
    setQuotesInfo(state, data) {
      state.info = data;
    },
  },
  actions: {
    getQuotesInfo({commit}, {period, currencies}) {
      return Quotes.coinsInfo({
        period,
        currencies,
      }).then((res) => {
        commit('setQuotesInfo', res.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
  },
  namespaced: true,
};
