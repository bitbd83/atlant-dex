// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import Draggable from 'gsap/Draggable';
import elementResizeDetectorMaker from 'element-resize-detector';
import _ from 'lodash';

export default {
  state: {
    gridData: [
      {name: 'Chart', title: 'Chart', height: 480, width: 840, x: 0, y: 0, isHidden: false},
      {name: 'History', title: 'History', height: 400, width: 400, x: 0, y: 0, isHidden: false},
      {name: 'Orders', title: 'Orders', height: 200, width: 520, x: 0, y: 0, isHidden: false},
      {name: 'OrderBook', title: 'Order book', height: 200, width: 720, x: 0, y: 0, isHidden: false},
      {
        title: 'Token Info',
        name: 'TokenInfo',
        height: 400,
        width: 740,
        x: 0,
        y: 0,
        isHidden: false,
      },
      {
        title: 'Photos',
        name: 'Photos',
        height: 311,
        width: 851,
        x: 0,
        y: 0,
        isHidden: false,
      },
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
    getSavedViews(state) {
      return state.savedViews;
    },
    getGridData(state) {
      return state.gridData;
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
      state.gridData = JSON.parse(JSON.stringify(grid));
    },
    addView(state, name) {
      state.savedViews.push({
        name,
        grid: JSON.parse(JSON.stringify(state.gridData)),
      });
    },
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
