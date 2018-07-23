// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export const defaultData = new Map([
  ['Chart', {name: 'Chart', height: 400, width: 740, x: 0, y: 0, isHidden: false}],
  ['History', {name: 'History', height: 300, width: 340, x: 1170, y: 450, isHidden: false}],
  ['Orders', {name: 'Orders', height: 300, width: 1160, x: 0, y: 450, isHidden: false}],
  ['OrderBook', {name: 'OrderBook', height: 400, width: 760, x: 760, y: 0, isHidden: false}],
  ['TokenInfo', {name: 'TokenInfo', height: 400, width: 740, x: 0, y: 0, isHidden: false}],
  ['Photos', {name: 'Photos', height: 311, width: 851, x: 0, y: 0, isHidden: false}],
]);

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
    pickDefaultData: (state, getters) => (keys) => {
      let result = [];
      keys.forEach(
        (k) => {
          result.push(defaultData.get(k));
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
          grid: getters.pickDefaultData(['Chart', 'History', 'Orders', 'OrderBook']),
        },
      ];
    },
    getWidgetType: (state) => (name) => {
      return ['chart', 'history', 'orders', 'orderBook'].includes(name) ? 'trade' : 'property';
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
