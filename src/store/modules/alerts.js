// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as Alerts from 'services/api/alerts';

export default {
  state: {
    sidebarAlerts: [],
    sidebarAlertsCount: 1,
    isSidebarLoading: false,
    isSidebarLoadingError: false,
    alertsList: [],
    alertsListCount: 0,
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
    dropAlertsList(state) {
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
    insertListAlert(state, data) {
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
        statuses: '0,1,2',
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
      commit('insertSidebarAlert', data);
    },
    disableAlertInSidebar({commit}, alertId) {
      return Alerts.disableAlert(alertId).then(() => {
        commit('removeSidebarAlert', alertId);
      });
    },
    deleteAlert({commit, dispatch}, data) {
      return Alerts.deleteAlert(data.alertId, data.alertsDeleteModel).then(() => {
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
