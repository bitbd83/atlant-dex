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

import * as Verification from 'services/api/verify';
import VerificationData from '@/models/VerificationData';
import {notification} from 'services/notification';

export default {
  state: {
    verification: new VerificationData,
    users: {
      accounts: [],
      totalItems: 0,
    },
    limit: 10,
    adminLoggedIn: false,
    applications: {
      verificationRequests: [],
    },
  },
  getters: {
    isAdmin(state) {
      return state.adminLoggedIn;
    },
    users(state) {
      return state.users;
    },
    limit(state) {
      return state.limit;
    },
    latestRequest(state) {
      return state.applications.verificationRequests[state.applications.verificationRequests.length - 1];
    },
  },
  mutations: {
    setVerificationData(state, data) {
      state.verification = new VerificationData(data);
    },
    loginAdmin(state) {
      state.adminLoggedIn = true;
    },
    setUserList(state, data) {
      state.users = data;
    },
    setUserApplications(state, data) {
      state.applications = data;
    },
    setVerificationStatus(state, status) {
      state.applications.verificationRequests[state.applications.verificationRequests.length - 1].status = status;
    },
  },
  actions: {
    verifyTierOne({}, data) {
      Verification.tierOneVerify(data)
      .then(() => {
        notification({
          title: 'Success:',
          text: 'Data was successfully sent',
          type: 'success',
        });
      });
    },
    getLastVerification({commit}) {
      Verification.getLastVerification().then((response) => {
        commit('setVerificationData', response.data);
      });
    },
    adminLogin({commit, dispatch}, {login, password}) {
      Verification.moderatorSignin({login, password}).then((res) => {
        commit('loginAdmin');
        commit('membership/createUser', {
          accessToken: res.data.accessToken,
          refreshTokenCode: res.data.refreshToken,
        }, {root: true});
        dispatch('membership/refreshToken', '', {root: true});
        dispatch('getUserList');
      });
    },
    approveVerification({commit}, requestId) {
      Verification.approveVerification(requestId).then(() => {
        commit('setVerificationStatus', 1);
      });
    },
    rejectVerification({commit}, {verificationId, reason}) {
      Verification.rejectVerification({verificationId, reason}).then(() => {
        commit('setVerificationStatus', 2);
      });
    },
    getUserList({state, commit}, page) {
      Verification.getUserList({
        page,
        limit: state.limit,
      }).then((response) => {
        commit('setUserList', response.data);
      });
    },
    getUserApplication({commit}, userId) {
      Verification.getUserApplication(userId).then((response) => {
        commit('setUserApplications', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
