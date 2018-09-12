// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export const defaultData = new Map([
  ['Chart', {name: 'Chart', height: 400, width: 740, x: -20, y: -20, isHidden: false}],
  ['History', {name: 'History', height: 300, width: 220, x: 1170, y: 450, isHidden: false}],
  ['Orders', {name: 'Orders', height: 300, width: 700, x: -20, y: 450, isHidden: false}],
  ['OrderBook', {name: 'OrderBook', height: 360, width: 340, x: 760, y: -20, isHidden: false}],
  ['TokenInfo', {name: 'TokenInfo', height: 400, width: 740, x: 0, y: 0, isHidden: true}],
  ['Photos', {name: 'Photos', height: 260, width: 780, x: 0, y: 0, isHidden: true}],
  ['Documents', {name: 'Documents', height: 280, width: 400, x: 0, y: 0, isHidden: true}],
  ['ExtendedInfo', {name: 'ExtendedInfo', height: 300, width: 840, x: 0, y: 0, isHidden: true}],
]);

export default {
  state: {
    gridData: Array.from(defaultData.values()),
    gridSize: 10,
    savedViews: [],
    resizeDetector: {},
    showGrid: false,
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
    pickDefaultData: (state, getters) => (keys) => {
      let result = [];
      keys.forEach(
        (k) => {
          result.push(defaultData.get(k));
        }
      );
      return result;
    },
    pickData: (state, getters) => (keys) => {
      let result = [];
      let tmp;
      keys.forEach(
        (k) => {
          tmp = state.gridData.find((el) => el.name == k);
          if (tmp) {
            result.push(tmp);
          }
        }
      );
      return result;
    },
    defaultViews(state, getters) {
      return [
        {
          name: 'Trading',
          grid: getters.pickDefaultData(['Chart', 'History', 'Orders', 'OrderBook']),
        },
        {
          name: 'Research',
          grid: getters.pickDefaultData(['TokenInfo', 'Photos', 'Documents', 'ExtendedInfo']),
        },
      ];
    },
    widgetsByGroup: (state, getters) => {
      return [
        {
          name: 'trading',
          items: getters.pickData(['Chart', 'History', 'Orders', 'OrderBook']),
        },
        {
          name: 'property',
          items: getters.pickData(['TokenInfo', 'Photos', 'Documents', 'ExtendedInfo']),
        },
        {
          name: 'views',
          items: [
            ...getters.defaultViews,
            ...state.savedViews,
            {
              type: 'setView',
              name: 'saveView',
            },
          ],
        },
      ];
    },
  },
  mutations: {
    createResizeDetector(state, resizeDetector) {
      state.resizeDetector = resizeDetector;
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
      state.gridData = [...grid].map(
        (tile) => {
          return {...tile};
        }
      );
    },
    addView(state, name) {
      state.savedViews.push({
        name,
        grid: [...state.gridData].map(
          (tile) => {
            return {...tile};
          }
        ),
        type: 'custom',
      });
      state.savedViews = [...state.savedViews];
    },
    setGridVisibility(state, isVisible) {
      state.showGrid = isVisible;
    },
  },
  actions: {
    removeTileFromDashboard({commit}, name) {
      commit('removeTile', name);
      commit('setTileSize', defaultData.get(name));
    },
    removeAllTiles({state, dispatch}) {
      for (let i of state.gridData) {
        dispatch('removeTileFromDashboard', i.name);
      }
    },
  },
  namespaced: true,
};
