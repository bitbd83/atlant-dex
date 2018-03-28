import * as Membership from 'services/api/membership';
import {serverNotification2} from 'services/notification';

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
    tryReconnect({dispatch}, {response}) {
      console.log('called tryReconnect');
      dispatch('refreshToken').catch(() => {
        serverNotification2(response);
        dispatch('dropUser');
        reject();
      });
    },
    dropUser({commit}) {
      commit('flushUser');
      commit('trade/emptyWallet', null, {root: true});
    },
    regFinish({state}, code) {
      return Membership.regFinish(code).then((res) => {
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
          console.log('inactive user');
          console.log('time since last action', timeSinceLastAction);
          reject();
        } else {
          Membership.refreshToken({
            grantType: 'RefreshToken',
            refreshToken: state.refreshToken,
            email: state.email,
          }).then((response) => {
            commit('createUser', response.data);
            console.log('successful reconnect');
            console.log('time since last action', timeSinceLastAction);
            return resolve(response);
          }).catch((response) => {
            console.log(response);
            console.log('time since last action', timeSinceLastAction);
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
