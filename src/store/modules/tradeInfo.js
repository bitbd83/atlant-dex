// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as TradeInfo from 'services/api/tradeInfo';
import {serverNotification} from 'services/notification';
// import resolutions from '@/store/staticData/resolutions';

export default {
  state: {
    pair: 'BTC_USD',
    limit: 23,
    pairs: {},
    pairInfo: {
      ask: 0,
      bid: 0,
      change: 0,
      high: 0,
      highChange: 0,
      last: 0,
      low: 0,
      lowChange: 0,
      makerFee: 0,
      takerFee: 0,
      volume: 0,
    },
    ohlc: {
      close: 0,
      high: 0,
      low: 0,
      change: 0,
    },
  },
  getters: {
    baseCurrency(state) {
      return state.pair.split('_')[0];
    },
    quoteCurrency(state) {
      return state.pair.split('_')[1];
    },
    getPairName: (state, getters) => ({base = getters.baseCurrency, quote = getters.quoteCurrency}) => {
      return `${base}_${quote}`;
    },
  },
  mutations: {
    setPairs(state, data) {
      state.pairs = data;
    },
    setPairInfo(state, data) {
      state.pairInfo = data;
    },
    setPair(state, pair) {
      state.pair = pair;
    },
    setOHLC(state, data) {
      state.ohlc.high = data.high;
      state.ohlc.low = data.low;
      state.ohlc.close = data.last;
      state.ohlc.change = data.change;
    },
    addNewPrices(state, prices) {
      state.volume = prices[0];
      state.change = prices[1];
      state.bid = prices[2];
      state.ask = prices[3];
    },
  },
  actions: {
    getPairs({commit}) {
      return TradeInfo.exchangePairs().then((res) => {
        commit('setPairs', res.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    getPairInfo({getters, commit}) {
      return TradeInfo.exchangePairInfo({
        baseCurrency: getters.baseCurrency,
        quoteCurrency: getters.quoteCurrency,
      }).then((res) => {
        commit('setPairInfo', res.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    changeBaseCurrency({commit, dispatch, getters, rootState}, currency) {
      const pair = getters.getPairName({
        base: currency,
      });
      dispatch('setPair', pair);
      dispatch('chart/invokeNewCandle');
      dispatch('chart/loadChart', null, {root: true});
    },
    changeQuoteCurrency({commit, dispatch, getters}, currency) {
      const pair = getters.getPairName({
        quote: currency,
      });
      dispatch('setPair', pair);
      dispatch('chart/invokeNewCandle');
      dispatch('chart/loadChart', null, {root: true});
    },
    setPair({commit, dispatch, getters, state}, pair) {
      const pairArr = pair.split('_');
      const baseCurrency = pairArr[0];
      const quoteCurrency = pairArr[1];

      if (state.pairs[baseCurrency].includes(quoteCurrency)) {
        commit('setPair', pair);
      } else {
        commit('setPair', [baseCurrency, state.pairs[baseCurrency][0]].join('_'));
      }
    },
  },
  namespaced: true,
};
