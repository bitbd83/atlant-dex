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

import Draggable from 'gsap/Draggable';
import elementResizeDetectorMaker from 'element-resize-detector';
import _ from 'lodash';

export default {
  state: {
    gridData: [
      {name: 'chart', title: 'Chart', height: 480, width: 840, x: 0, y: 0, isHidden: false},
      {name: 'history', title: 'History', height: 400, width: 400, x: 0, y: 0, isHidden: false},
      {name: 'orders', title: 'Orders', height: 200, width: 520, x: 0, y: 0, isHidden: false},
      {name: 'orderBook', title: 'Order book', height: 200, width: 720, x: 0, y: 0, isHidden: false},
    ],
    gridSize: 10,
    savedViews: [],
    resizeDetector: {},
  },
  getters: {
    getTileSize: (state) => (name) => {
      return {
        height: state.gridData.find((item) => item.name === name).height,
        width: state.gridData.find((item) => item.name === name).width,
      };
    },
    getTilePosition: (state) => (name) => {
      return {
        x: state.gridData.find((item) => item.name === name).x,
        y: state.gridData.find((item) => item.name === name).y,
      };
    },
  },
  mutations: {
    createResizeDetector(state) {
      state.resizeDetector = elementResizeDetectorMaker({
        strategy: 'scroll',
      });
    },
    setTileSize(state, data) {
      let el = state.gridData.find((item) => item.name === data.name);
      el.height = data.height;
      el.width = data.width;
    },
    setTilePosition(state, data) {
      state.gridData.find((item) => item.name === data.name).x = data.x;
      state.gridData.find((item) => item.name === data.name).y = data.y;
    },
    removeTile(state, name) {
      state.gridData.find((item) => item.name === name).isHidden = true;
    },
    addTile(state, name) {
      state.gridData.find((item) => item.name === name).isHidden = false;
    },
    setGrid(state, grid) {
      state.gridData = grid;
    },
    addView(state, name) {
      const x = [
        {name: 'chart', title: 'Chart', height: 480, width: 840, x: 0, y: 0, isHidden: false},
        {name: 'history', title: 'History', height: 400, width: 400, x: 0, y: 0, isHidden: false},
        {name: 'orders', title: 'Orders', height: 200, width: 520, x: 0, y: 0, isHidden: false},
        {name: 'orderBook', title: 'Order book', height: 200, width: 720, x: 0, y: 0, isHidden: false},
      ];
      state.savedViews.push({
        title: name,
        grid: x,
      });
    },
    // removeView(state, grid) {
    //   console.log('removing view');
    // },
  },
  actions: {
    addTileToDashboard({state, commit, dispatch}, tile) {
      Draggable.create(tile.target, {
        type: 'top,left',
        bounds: {top: 0, left: 0},
        trigger: tile.trigger,
        liveSnap: true,
        zIndexBoost: tile.isHideable,
        snap: {
          x: (endValue) => {
            return Math.round(endValue / state.gridSize) * state.gridSize;
          },
          y: (endValue) => {
            return Math.round(endValue / state.gridSize) * state.gridSize;
          },
        },
        onDragEnd: function() {
          if (tile.isHideable) {
            commit('setTilePosition', {
              name: this.vars.trigger.split('--')[1],
              x: this.x,
              y: this.y,
            });
          }
        },
      });
      if (tile.isResizeable) dispatch('snapOnResize', tile);
    },
    snapOnResize({state, commit}, tile) {
      if (tile.container) {
        state.resizeDetector.listenTo(tile.container, _.debounce((el) => {
          if (tile.container) {
            tile.container.style.height = Math.round(el.offsetHeight / state.gridSize) * state.gridSize + 'px';
            tile.container.style.width = Math.round(el.offsetWidth / state.gridSize) * state.gridSize + 'px';
            commit('setTileSize', {
              name: tile.name,
              height: el.offsetHeight,
              width: el.offsetWidth,
            });
          }
        }, 250));
      }
    },
    setupDashboard({state, commit, dispatch}) {
      commit('createResizeDetector');
      for (let i of state.gridData) {
        if (!i.isHidden) {
          dispatch('addTileToDashboard', {
            name: i.name,
            target: document.getElementsByClassName('gridTile--' + i.name)[0],
            trigger: '.gridTile__headerContainer--' + i.name,
            container: document.getElementsByClassName('gridTile__content--' + i.name)[0],
            isHideable: true,
            isResizeable: true,
          });
        }
      }
    },
    removeTileFromDashboard({commit}, name) {
      commit('removeTile', name);
      commit('setTileSize', {name, height: 0, width: 0});
      // commit('setTilePosition', {name, x: 0, y: 0});
    },
    removeAllTiles({state, dispatch}) {
      for (let i of state.gridData) {
        dispatch('removeTileFromDashboard', i.name);
      }
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
