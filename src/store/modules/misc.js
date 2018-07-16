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

import {sidebarSections} from '@/config';

export default {
  state: {
    showSidebar: false,
    section: '',
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
