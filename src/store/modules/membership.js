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

import * as Membership from 'services/api/membership';

export default {
  state: {
    token: '',
    refreshToken: '',
    userId: '',
    email: '',
    lastAction: '',
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
    login({commit, dispatch}, {email, password}) {
      return Membership.login({
        email,
        password,
      }).then((response) => {
        commit('createUser', response.data);
        dispatch('setRefreshTimeout');
      });
    },
    logout({dispatch, state}) {
      return Membership.logout(state.refreshToken).then(() => {
        dispatch('dropUser');
      });
    },
    tryReconnect({getters, dispatch}) {
      return new Promise((resolve, reject) => {
        // console.log('called tryReconnect');
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
    dropUser({commit}) {
      commit('flushUser');
      commit('orders/cleanOrders', null, {root: true});
      commit('user/cleanAfterLogout', null, {root: true});
      commit('modal/open', {name: 'signIn'}, {root: true});
    },
    regFinish({state, commit}, code) {
      return Membership.regFinish(code).then((response) => {
        commit('createUser', response.data);
      });
    },
    setRefreshTimeout({state, commit, dispatch}) {
      setTimeout(() => {
        dispatch('refreshToken').then(() => {
          dispatch('setRefreshTimeout');
        });
      }, 1800000);
    },
    refreshToken({state, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        let timeSinceLastAction = Date.now() - state.lastAction;
        if (timeSinceLastAction > 86400000) {
          // console.log('inactive user');
          // console.log('time since last action', timeSinceLastAction);
          return reject();
        } else {
          Membership.refreshToken({
            grantType: 'RefreshToken',
            refreshToken: state.refreshToken,
            email: state.email,
          }).then((response) => {
            commit('createUser', response.data);
            // console.log('successful reconnect');
            // console.log('time since last action', timeSinceLastAction);
            return resolve(response);
          }).catch((response) => {
            // console.log(response);
            // console.log('time since last action', timeSinceLastAction);
            return reject(response);
          });
        };
      });
    },
    rememberLastAction({getters, commit}) {
      if (getters.isLoggedIn) commit('setLastActionTime');
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
