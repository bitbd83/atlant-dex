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

import * as Alerts from 'services/api/alerts';

export default {
  state: {
    sidebarAlerts: [],
    sidebarAlertsCount: 1,
    isSidebarLoading: false,
    isSidebarLoadingError: false,
    alertsList: [],
    alertsListCount: 0,
    alertsPage: 1,
    alertsLimit: 10,
  },
  getters: {
  },
  mutations: {
    setSidebarAlerts(state, data) {
      state.sidebarAlerts.push(...data.data);
      state.sidebarAlertsCount = data.totalItems;
    },
    dropSidebarAlerts(state) {
      state.sidebarAlerts = [];
      state.sidebarAlertsCount = 1;
    },
    removeSidebarAlert(state, id) {
      state.sidebarAlerts = state.sidebarAlerts.filter((item) => item.id != id);
      state.sidebarAlertsCount --;
    },
    updateSidebarAlert(state, alert) {
      let alertIndex = state.sidebarAlerts.indexOf(state.sidebarAlerts.find((item) => item.id === alert.id));
      state.sidebarAlerts.splice(alertIndex, 1);
      state.sidebarAlerts.unshift(alert);
    },
    setAlertsList(state, data) {
      state.alertsList = data.data;
      state.alertsListCount = data.totalItems;
    },
    setAlertsPage(state, num) {
      state.alertsPage = num;
    },
    dropAlertsList(state, data) {
      state.alertsList = [];
      state.alertsListCount = 0;
    },
    setSidebarLoading(state, isLoading) {
      state.isSidebarLoading = isLoading;
    },
    setSidebarLoadingError(state, isLoadingError) {
      state.isSidebarLoadingError = isLoadingError;
    },
    insertSidebarAlert(state, alert) {
      for (let i in state.sidebarAlerts) {
        if (!state.sidebarAlerts[i].activationDate) {
          state.sidebarAlerts.splice(i, 0, alert);
          state.sidebarAlerts.splice(-1, 1);
          break;
        }
      }
    },
  },
  actions: {
    getAlertsList({state, commit}, data) {
      return Alerts.getAlerts({
        page: data.page,
        limit: state.alertsLimit,
        sortBy: data.sortBy,
        isSortAscending: data.ascending,
        triggeredFirst: data.isSidebar ? true : false,
        active: data.isSidebar ? true : false,
      }).then((response) => {
        if (data.isSidebar) {
          commit('setSidebarAlerts', response.data);
          commit('setSidebarLoading', false);
        } else {
          commit('setAlertsList', response.data);
        };
      }).catch(() => {
        if (data.isSidebar) {
          commit('setSidebarLoadingError', true);
        }
      });
    },
    insertSidebarAlert({commit, dispatch}, data) {
    //   commit('setSidebarLoading', true);
    //   commit('dropSidebarAlerts');
    //   dispatch('getAlertsList', {
    //     page: 1,
    //     isSidebar: true,
    //   });
    // },
      commit('insertSidebarAlert', data);
    },
    resetAlertsList({state, dispatch}, data) {
      dispatch('getAlertsList', {
        page: state.alertsPage,
      });
    },
    disableAlertInSidebar({commit}, alertId) {
      return Alerts.disableAlert(alertId).then(() => {
        commit('removeSidebarAlert', alertId);
      });
    },
    deleteAlert({commit, dispatch}, data) {
      return Alerts.deleteAlert(data.alertId, data.alertsDeleteModel).then(() => {
        commit('setSidebarLoading', true);
        // commit('removeSidebarAlert', id);
        commit('dropSidebarAlerts');
        dispatch('getAlertsList', {
          page: 1,
          isSidebar: true,
        });
        dispatch('resetAlertsList');
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
