// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as Verification from 'services/api/verify';
import {notification} from 'services/notification';
import {birthdayMonths} from '@/store/staticData/birthday.js';

export default {
  state: {
    verification: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      address: '',
      postCode: '',
      phoneNumber: '',
      dateOfBirth: '',
      day: '',
      month: '',
      year: '',
      passportId: '',
      passportScan: '',
      selfie: '',
      proofOfResidenceScan: '',
    },
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
    getFormDataForApiRequest(state) {
      const formData = new FormData();
      Object.keys(state.verification).forEach((key) => {
        if (!['day', 'month', 'year'].includes(key)) formData.append(key, state.verification[key]);
      });
      return formData;
    },
  },
  mutations: {
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
    updateVerificationData(state, {val, section}) {
      state.verification[section] = val;
    },
    setLastVerificationData(state, value) {
      if (value.dateOfBirth) {
        let dateOfBirth = new Date(value.dateOfBirth);
        value.day = dateOfBirth.toLocaleTimeString([], {day: '2-digit'}).split(',')[0];
        value.month = birthdayMonths[dateOfBirth.toLocaleTimeString([], {month: 'numeric'}).split(',')[0] - 1];
        value.year = dateOfBirth.toLocaleTimeString([], {year: 'numeric'}).split(',')[0];
      };
      state.verification = value;
    },
    updateVerificationDateOfBirth(state, value) {
      state.verification.dateOfBirth = value;
    },
  },
  actions: {
    verifyTierOne({getters}) {
      Verification.tierOneVerify(getters.getFormDataForApiRequest)
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
        commit('setLastVerificationData', response.data);
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
};
