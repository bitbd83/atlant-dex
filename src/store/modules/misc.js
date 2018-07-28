// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import {sidebarSections} from '@/config';

export default {
  state: {
    showSidebar: false,
    section: '',
    loading: false,
  },
  getters: {
    section(state, getters, rootState, rootGetters) {
      // Return section from state if user logged in
      if (rootGetters['membership/isLoggedIn']) {
        return state.section;
      } else {
        // Get current section object by state
        const currentSection = sidebarSections.find((sect) => sect.name === state.section);
        // If it should show when user logout
        if (currentSection && currentSection.isShowOnLogout) {
          // return it
          return state.section;
        } else {
          // Otherwise return first section which can show
          return sidebarSections.find((sect) => sect.isShowOnLogout).name;
        }
      }
    },
  },
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    hiddenSidebar(state) {
      if (state.showSidebar) {
        state.showSidebar = false;
        state.section = '';
      };
    },
    setSidebar(state, showSidebar) {
      state.showSidebar = showSidebar;
    },
    setSection(state, section) {
      if (state.section === section) {
        state.showSidebar = false;
        state.section = '';
        return;
      }
      state.section = section;
      if (state.showSidebar === false) state.showSidebar = true;
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
