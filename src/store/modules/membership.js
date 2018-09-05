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
      commit('page/close', null, {root: true});
      commit('modal/open', {name: 'signIn'}, {root: true});
    },
    refreshToken({state, commit, dispatch}) {
      let timeSinceLastAction = Date.now() - state.lastAction;
      if (timeSinceLastAction > state.maxInactiveTime) {
        return Promise.reject();
      }
      Membership.refreshToken({
        grantType: 'RefreshToken',
        refreshToken: state.refreshToken,
        email: state.email,
      }).then((response) => {
        commit('createUser', response.data);
        dispatch('setRefreshTimeout');
        return response;
      }).catch((response) => {
        return new Error(response);
      });
    },
    tryReconnect({getters, dispatch}) {
      if (getters.hasRefreshToken) {
        return dispatch('refreshToken').then(() => {
          return 'success';
        }).catch(() => {
          dispatch('dropUser');
          return new Error('fail');
        });
      }
      dispatch('dropUser');
      return Promise.reject('');
    },
    setRefreshTimeout({state, getters, commit, dispatch}) {
      setTimeout(() => {
        if (getters.hasRefreshToken) dispatch('refreshToken');
      }, state.tokenRefreshTime);
    },
    rememberLastAction({getters, commit}) {
      if (getters.isLoggedIn) commit('setLastActionTime');
    },
  },
  namespaced: true,
};
