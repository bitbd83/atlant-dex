// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as User from 'services/api/user';

export default {
  state: {
    balance: 0,
    portfolio: {
      balances: [],
      status: 0,
      portfolioValue: 0,
    },
    userCurrencies: ['USD', 'BTC', 'ETH', 'LTC', 'ATL'],
    transactionFees: [],
    account: {
      currency: '',
      email: {
        value: '',
      },
      fullName: '',
      phone: {
        value: null,
        verified: false,
      },
      subscribe: {
        newsletter: false,
        email: false,
        sms: false,
      },
    },
    security: {
      additionalEmail: {
        value: '',
        verified: false,
      },
      tfa: {
        method: '',
      },
    },
    notifications: {
      data: [],
      totalItems: 0,
    },
    notificationsOnPage: 10,
    notificationsCounter: 0,
    theme: 'dark',
  },
  getters: {
    getNotifications(state) {
      return state.notifications.data;
    },
    getNotificationItems(state) {
      return state.notifications.totalItems;
    },
    getNotificationsOnPage(state) {
      return state.notificationsOnPage;
    },
    isTFAEnabled(state) {
      return state.security.tfa.enabled;
    },
    getUserBalancesInCrypto(state) {
      return state.portfolio.balances.filter((balance) => {
        return balance.isCrypto === true && balance.currency !== 'USD';
      });
    },
    getUserBalancesInFiat(state) {
      return state.portfolio.balances.filter((balance) => {
        return balance.currency === 'USD';
      });
    },
    getPortofolioValue(state) {
      return state.portfolio.portfolioValue;
    },
    getPortofolioValue(state) {
      return state.portfolio.portfolioValue;
    },
    getCurrencyTransFees(state) {
      return state.transactionFees;
    },
  },
  mutations: {
    setTheme(state, val) {
      state.theme = val;
    },
    setProfile(state, data) {
      state.account = data.account;
      state.security = data.security;
    },
    setPrefCurrency(state, data) {
      state.account.currency = data;
    },
    setTFAMethod(state, data) {
      state.security.tfa.enabled = data.enabled;
      state.security.tfa.method = data.method;
      state.security.tfa.phoneNumber = data.contact;
    },
    setPhoneNumber(state, data) {
      state.account.phone.value = data.phone;
      state.account.phone.countryCode = data.countryCode;
    },
    setPhoneVerified(state, isVerified) {
      state.account.phone.verified = isVerified;
    },
    setNotifications(state, data) {
      state.notifications = data;
    },
    setNotificationsCounter(state, data) {
      state.notificationsCounter = data;
    },
    setSubscribeNewsletter(state, isEnable) {
      state.account.subscribe.newsletter = isEnable;
    },
    changePortfolio(state, data) {
      state.portfolio.portfolioValue = data.total;

      for (let i = 0; i < data.balances.length; i++) {
        let notMatch = true;
        for (let j = 0; j < state.portfolio.balances.length; j++) {
          if ((state.portfolio.balances[j].currency) == data.balances[i][0]) {
            notMatch = false;
            state.portfolio.balances[j].availableFunds = data.balances[i][1];
            state.portfolio.balances[j].balanceFiat = data.balances[i][2];
          }
        }
        if (notMatch) {
          state.portfolio.balances.push({
            availableFunds: 0,
            balanceFiat: data.balances[i][2],
            blockedFunds: 0,
            currency: data.balances[i][0],
            isCrypto: true,
          });
        }
      }
    },
    setBalances(state, data) {
      state.portfolio = data;
    },
    cleanAfterLogout(state) {
      state.portfolio = {
        balances: [],
        status: 0,
        portfolioValue: 0,
      };
      state.account = {
        currency: '',
          email: {
          value: '',
        },
        fullName: '',
          phone: {
          value: null,
            verified: false,
        },
        subscribe: {
          newsletter: false,
            email: false,
              sms: false,
        },
      };
      state.security = {
        additionalEmail: {
          value: '',
            verified: false,
        },
          tfa: {
            method: '',
        },
      };
      state.notifications = {
        data: [],
          totalItems: 0,
      };
    },
    setNotificationsCounter(state, data) {
      state.notificationsCounter = data;
    },
    setTransactionFees(state, data) {
      state.transactionFees = data;
    },
  },
  actions: {
    getProfileData({commit}) {
      return User.getProfile().then((res) => {
        commit('setProfile', res.data);
      });
    },
    setPhone({commit}, data) {
      return new Promise((resolve, reject) => {
        User.changePhone(data).then(() => {
          commit('setPhoneNumber', data);
          return resolve();
        });
      });
    },
    setAdditionalEmail({state}, data) {
      return new Promise((resolve, reject) => {
        User.changeAdditionalEmail(data).then(() => {
          state.security.additionalEmail.value = data;
          return resolve();
        });
      });
    },
    setPreferredCurrency({state, commit}, currencyCode) {
      if (state.account.currency === currencyCode) return;
      const backUpCurrency = state.account.currency;
      commit('setPrefCurrency', currencyCode);
      return User.changePreferredCurrency(currencyCode)
      .catch((error) => {
        commit('setPrefCurrency', backUpCurrency);
        console.error(error);
      });
    },
    setNewsletterSubscription({state, commit}, isEnable) {
      // Prevent useless request
      if (state.account.subscribe.newsletter === isEnable) return;
      const backUpIsEnable = state.account.subscribe.newsletter;
      commit('setSubscribeNewsletter', isEnable);
      return User.changeNewsletterSubscription(isEnable)
      .catch((error) => {
        commit('setSubscribeNewsletter', backUpIsEnable);
        console.error(error);
      });
    },
    verifyAdditionalEmail({state}, data) {
      return new Promise((resolve, reject) => {
        User.verifyAdditionalEmail(data).then(() => {
          state.security.additionalEmail.verified = true;
          return resolve();
        });
      });
    },
    deposit({state}, {currency, amount}) {
      return User.deposit({currency, amount}).then(() => {
        console.log('successfully deposited', amount, currency);
      });
    },
    getNotificationHistory({state, commit}, {page, sortBy, ascending}) {
      return User.getNotificationHistory({
        page,
        limit: state.notificationsOnPage,
        sortBy,
        ascending,
      }).then((response) => {
        commit('setNotifications', response.data);
      });
    },
    getBalances({commit}) {
      return User.getBalances().then((response) => {
        commit('setBalances', response.data);
      });
    },
    getCurrencies({commit}) {
      User.getCurrencies().then((response) => {
        commit('setTransactionFees', response.data);
      });
    },
  },
  namespaced: true,
};
