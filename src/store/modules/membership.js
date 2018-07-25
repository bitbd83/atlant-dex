// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as Membership from 'services/api/membership';

export default {
  state: {
    token: '',
    refreshToken: '',
    userId: '',
    email: '',
    lastAction: '',
    tokenRefreshTime: 30000,
    maxInactiveTime: 86400000,
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token !== '';
    },
    hasRefreshToken(state) {
      return state.refreshToken != '';
    },
    getLastAction(state) {
      return state.lastAction;
    },
  },
  mutations: {
    createUser(state, data) {
      state.token = data.accessToken;
      state.refreshToken = data.refreshTokenCode;
    },
    flushUser(state) {
      state.token = '';
      state.refreshToken = '';
    },
    setLastActionTime(state) {
      state.lastAction = Date.now();
    },
  },
  actions: {
    regFinish({state, commit}, code) {
      return Membership.regFinish(code).then((response) => {
        commit('createUser', response.data);
      });
    },
    login({commit, dispatch}, {email, password}) {
      return Membership.login({email, password}).then((response) => {
        commit('createUser', response.data);
        dispatch('setRefreshTimeout');
      });
    },
    logout({dispatch, state}) {
      return Membership.logout(state.refreshToken).then(() => {
        dispatch('dropUser');
      });
    },
    dropUser({commit}) {
      commit('flushUser');
      commit('orders/cleanOrders', null, {root: true});
      commit('user/cleanAfterLogout', null, {root: true});
      commit('modal/open', {name: 'signIn'}, {root: true});
    },
    refreshToken({state, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        let timeSinceLastAction = Date.now() - state.lastAction;
        if (timeSinceLastAction > state.maxInactiveTime) {
          return reject();
        } else {
          Membership.refreshToken({
            grantType: 'RefreshToken',
            refreshToken: state.refreshToken,
            email: state.email,
          }).then((response) => {
            commit('createUser', response.data);
            dispatch('setRefreshTimeout');
            return resolve(response);
          }).catch((response) => {
            return reject(response);
          });
        };
      });
    },
    tryReconnect({getters, dispatch}) {
      return new Promise((resolve, reject) => {
        if (getters.hasRefreshToken) {
          dispatch('refreshToken').then(() => {
            return resolve('success');
          }).catch(() => {
            dispatch('dropUser');
            return reject('fail');
          });
        } else {
          dispatch('dropUser');
          return reject();
        };
      });
    },
    setRefreshTimeout({state, commit, dispatch}) {
      setTimeout(() => {
        dispatch('refreshToken');
      }, state.tokenRefreshTime);
    },
    rememberLastAction({getters, commit}) {
      if (getters.isLoggedIn) commit('setLastActionTime');
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
