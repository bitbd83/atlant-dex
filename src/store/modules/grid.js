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

export default {
  state: {
    allGridLayout: [
      {i: 'buySell', x: 0, y: 0, w: 3, h: 7, minW: 2, minH: 7, maxH: 7},
      {i: 'chart', x: 3, y: 0, w: 9, h: 7, minW: 5, minH: 7},
      {i: 'history', x: 0, y: 7, w: 3, h: 8, minW: 3, minH: 2},
      {i: 'book', x: 3, y: 7, w: 5, h: 8, minW: 5, minH: 2},
      {i: 'orders', x: 8, y: 7, w: 4, h: 8, minW: 4, minH: 2},
    ],
    gridData: [
      {i: 'buySell', x: 0, y: 0, w: 3, h: 7, minW: 2, minH: 7, maxH: 7},
      {i: 'chart', x: 3, y: 0, w: 9, h: 7, minW: 5, minH: 7},
      {i: 'history', x: 0, y: 7, w: 3, h: 8, minW: 3, minH: 2},
      {i: 'book', x: 3, y: 7, w: 5, h: 8, minW: 5, minH: 2},
      {i: 'orders', x: 8, y: 7, w: 4, h: 8, minW: 4, minH: 2},
    ],
    mobileGridData: [
      {i: 'buySell', x: 0, y: 0, w: 12, h: 7, minW: 2, minH: 7, maxH: 7},
      {i: 'chart', x: 0, y: 7, w: 12, h: 7, minW: 5, minH: 7},
      {i: 'history', x: 0, y: 14, w: 12, h: 8, minW: 3, minH: 2},
      {i: 'book', x: 0, y: 22, w: 12, h: 8, minW: 5, minH: 2},
      {i: 'orders', x: 0, y: 30, w: 12, h: 8, minW: 4, minH: 2},
    ],
    isEdit: false,
  },

  mutations: {
    changeGrid(state, data) {
      state.gridData = data.map((el) => {
        return {
          i: el.i,
          x: el.x,
          y: el.y,
          w: el.w,
          h: el.h,
          minW: el.minW,
          minH: el.minH,
          maxH: el.maxH,
        };
      });
    },
    setIsEdit(state) {
      state.isEdit = !state.isEdit;
    },
    addGridLayout(state, component) {
      let unique = true;
      state.gridData.forEach((el) => {
        if (el.i == component.i) {
          unique = false;
          return false;
        }
      });
      if (unique) {
        state.gridData.push(component);
      }
    },
    removeGridLayout(state, component) {
      // console.log('Remove grid item ', component);
      state.gridData = state.gridData.filter((e) => {
        return e.i != component;
      });
    },
  },
  getters: {
    getHiddenLayout(state) {
      return state.allGridLayout.filter((e) => state.gridData.findIndex((i) => i.i == e.i) === -1);
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
