// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

import * as Orders from 'services/api/orders';

export default {
  state: {
    book: {
      status: 0,
      bids: [],
      asks: [],
    },
    dashboardOrdersType: 'open',
    orderFilter: '',
    accountOrders: {
      orders: [],
    },
    orders: [],
    limit: 23,
    trades: [],
  },
  getters: {
    getActiveOrders(state) {
      return state.orders.filter((order) => {
        return order.status === 0 || order.status === 1;
      });
    },
    getClosedOrders(state) {
      return state.orders.filter((order) => {
        return order.status === 2 || order.status === 3;
      });
    },
    getAccountOrders(state) {
      return state.accountOrders.orders;
    },
    getAccountOrderFilter(state) {
      return state.orderFilter;
    },
    getAccountOrdersItems(state) {
      return state.accountOrders.totalItems;
    },
    getLastTrades(state) {
      return state.trades;
    },
  },
  mutations: {
    setDashboardOrdersType(state, data) {
      state.dashboardOrdersType = data;
    },
    setOrdersAsks(state, data) {
      const asks = data;
      state.book.asks = asks;
    },
    setOrdersBids(state, data) {
      const bids = data;
      state.book.bids = bids;
    },
    setAccountOrders(state, data) {
      data.orders.forEach((e) => {
        e.trades = {};
      });
      state.accountOrders = data;
    },
    setBook(state, data) {
      state.book = data;
    },
    setOrderFilter(state, status) {
      state.orderFilter = status;
    },
    setOrders(state, data) {
      state.orders = data;
    },
    cleanOrders(state) {
      state.orders = [];
      state.accountOrders = {
        orders: [],
      };
    },
    setCancelledOrder(state, id) {
      state.orders.find((item) => item.id === id).status = 3;
    },
    addActiveOrder(state, obj) {
      state.orders.unshift(obj);
      state.book.status = 1;
    },
    changeOrderStatus(state, obj) {
      let order = state.orders.find((item) => item.id === obj.id);
      if (order) {
        order.leavesQuantity = obj.leavesQuantity;
        order.status = obj.status;
      }
      state.book.status = 1;
    },
    setTradesForOrder(state, data) {
      let arr = state.accountOrders.orders;
      arr.find((item) => item.id === data.orderId).trades = data.trades.trades;
      state.accountOrders.orders = arr;
    },
    setTradeHistory(state, trades) {
      state.trades = trades.data;
    },
    addNewTrade(state, obj) {
      state.trades.unshift(obj);
      state.trades.splice(-1, 1);
    },
  },
  actions: {
    getAccountOrders({state, commit}, {page, limit, sortBy, ascending}) {
      return Orders.getOrders({
        page,
        limit,
        sortBy,
        ascending,
        statuses: state.orderFilter,
      }).then((response) => {
        commit('setAccountOrders', response.data);
      });
    },
    getOrders({state, commit, rootState}) {
      return Orders.getOrders({
        pair: rootState.tradeInfo.pair,
        sortby: 'datetime',
        ascending: false,
        limit: 20,
      }).then((response) => {
        commit('setOrders', response.data.orders);
      });
    },
    getOrderBook({rootGetters, commit}, {limit}) {
      return Orders.getOrderBook({
        baseCurrency: rootGetters['tradeInfo/baseCurrency'],
        quoteCurrency: rootGetters['tradeInfo/quoteCurrency'],
        limit,
      }).then((response) => {
        commit('setBook', response.data);
      });
    },
    placeOrder({commit, dispatch}, {isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity, isQuantityInBaseCurrency}) {
      return new Promise((resolve, reject) => {
        Orders.placeOrder({
          isMarketOrder,
          isSellOrder,
          baseCurrency,
          quoteCurrency,
          price,
          quantity,
          isQuantityInBaseCurrency,
        }).then((response) => {
          return resolve();
        });
      });
    },
    cancelOrder({commit}, orderId) {
      return Orders.cancelOrder({orderId}).then((res) => {
        commit('setCancelledOrder', orderId);
      });
    },
    getTradesForOrder({state, commit}, orderId) {
      return Orders.getTradesForOrder(orderId).then((response) => {
        let data = {
          trades: response.data,
          orderId,
        };
        commit('setTradesForOrder', data);
      });
    },
    getTradeHistory({rootState, commit}) {
      return Orders.getTradeHistory(
        {
          Pair: rootState.tradeInfo.pair,
          CurrencyPairValid: true,
          Page: 1,
          Limit: 20,
        },
      ).then((response) => {
        commit('setTradeHistory', response.data);
      });
    },
  },

  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
