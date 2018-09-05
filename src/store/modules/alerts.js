// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export default {
  getters: {
  },
  mutations: {
    updateSidebarAlert(state, alert) {
      let alertIndex = state.sidebarAlerts.indexOf(state.sidebarAlerts.find((item) => item.id === alert.id));
      state.sidebarAlerts.splice(alertIndex, 1);
      state.sidebarAlerts.unshift(alert);
    },
  },
  namespaced: true,
};
