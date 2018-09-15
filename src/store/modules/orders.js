// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as Orders from 'services/api/orders';

export default {
  state: {
    book: {
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
    placeOrder: {
      isOpen: false,
      type: 1,
      isBuy: false,
      amount: '',
      price: '',
    },
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
    setOrderPrice(state, price) {
      state.placeOrder.price = price;
    },
    setOrderAmount(state, amount) {
      state.placeOrder.amount = amount;
    },
    setOrderSide(state, isBuy) {
      state.placeOrder.isBuy = isBuy;
    },
    setOrderType(state, type) {
      state.placeOrder.type = type;
    },
    setOrderOpenStatus(state, isOpen) {
      state.placeOrder.isOpen = isOpen;
    },
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
    },
    changeOrderStatus(state, obj) {
      let order = state.orders.find((item) => item.id === obj.id);
      if (order) {
        order.leavesQuantity = obj.leavesQuantity;
        order.status = obj.status;
      }
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
    updateBook(state, data) {
      const newTop = (book, change, filter) => {
        if (change.data.price === 0) {
          book = []; return;
        }
        book = book.filter((item) => filter(item.price, change.data.price));
        book.unshift(change.data);
        if (book.length > state.bookLimit) book = book.slice(0, state.bookLimit);
        return book;
      };

      const newMid = (book, change, filter) => {
        for (let i in book) {
          if (book[i].price === change.data.price) {
            if (change.data.amount === 0) {
              book.splice(i, 1);
            } else {
              book[i].amount = change.data.amount;
            }
            break;
          } else if (filter(book[i].price, change.data.price)) {
            book.splice(i, 0, change.data);
            if (book.length > state.bookLimit) book = book.slice(0, state.bookLimit);
            break;
          } else if (i == book.length - 1) {
            book.push(change.data);
          }
        }
        return book;
      };

      const append = (book, change) => {
        if (book.length < state.bookLimit) book.push(...change.data);
        return book;
      };

      const bookUpdateTypes = [newTop, newMid, append];

      const ordersUpdateBook = (book, filter) => {
        data.changes.forEach((change) => book = bookUpdateTypes[change.type](book, change, filter));
        return book;
      };

      if (data.side === 1) {
        state.book.asks = ordersUpdateBook(state.book.asks, (itemPrice, cutoffPrice) => itemPrice > cutoffPrice);
      } else {
        state.book.bids = ordersUpdateBook(state.book.bids, (itemPrice, cutoffPrice) => itemPrice < cutoffPrice);
      }
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
      return Orders.placeOrder({
        isMarketOrder,
        isSellOrder,
        baseCurrency,
        quoteCurrency,
        price,
        quantity,
        isQuantityInBaseCurrency,
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
    updateOrderBook({state, commit}, data) {
      commit('updateBook', {
        changes: data.changes,
        side: data.side,
      });
    },
  },
  namespaced: true,
};
