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

import * as User from 'services/api/user';

export default {
  state: {
    portfolio: {
      balances: [],
      status: 0,
      portfolioValue: 0,
    },
    userCurrencies: ['USD', 'BTC', 'ETH', 'LTC'],
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
        value: null,
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
    accountTransactionHistory: {
      data: [],
    },
    notificationsOnPage: 10,
    notificationsCounter: 0,
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
        return balance.isCrypto === true;
      });
    },
    getUserBalancesInFiat(state) {
      return state.portfolio.balances.filter((balance) => {
        return balance.isCrypto === false;
      });
    },
    getPortofolioValue(state) {
      return state.portfolio.portfolioValue;
    },
    getPortofolioValue(state) {
      return state.portfolio.portfolioValue;
    },
    getAccountTransactions(state) {
      return state.accountTransactionHistory.data;
    },
    getAccountTransactionItems(state) {
      return state.accountTransactionHistory.totalItems;
    },
    getCurrencyTransFees(state) {
      return state.transactionFees;
    },
  },
  mutations: {
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
          value: null,
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
      state.accountTransactionHistory = {
        data: [],
      };
    },
    setAccountTransactionHistory(state, data) {
      state.accountTransactionHistory = data;
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
    getAccountTransactionHistory({commit, state, getters}, {page, limit, sortBy, ascending}) {
      return User.getAccountTransactionHistory({
        page,
        limit,
        sortBy,
        ascending,
      }).then((response) => {
        commit('setAccountTransactionHistory', response.data);
      });
    },
    getCurrencies({commit}) {
      User.getCurrencies().then((response) => {
        commit('setTransactionFees', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
