import Draggable from 'gsap/Draggable';
import elementResizeDetectorMaker from 'element-resize-detector';
import _ from 'lodash';

export default {
  state: {
    gridData: [
      {name: 'chart', title: 'Chart', height: 480, width: 840, x: 0, y: 0, isHidden: false},
      {name: 'history', title: 'History', height: 400, width: 400, x: 0, y: 0, isHidden: false},
      {name: 'openOrders', title: 'Open orders', height: 200, width: 520, x: 0, y: 0, isHidden: false},
      // {name: 'closedOrders', title: 'Closed orders', height: '300px'},
      {name: 'orderBook', title: 'Order book', height: 200, width: 720, x: 0, y: 0, isHidden: false},
      // {name: 'buySell', title: 'Place order', height: '400px'},
    ],
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
  },
  actions: {
    addTileToDashboard({commit, dispatch}, tile) {
      Draggable.create(document.getElementsByClassName('gridTile--' + tile.name)[0], {
        type: 'top,left',
        bounds: {top: 0, left: 0},
        trigger: '.gridTile__header--' + tile.name,
        liveSnap: true,
        snap: {
          x: (endValue) => {
            return Math.round(endValue / 20) * 20;
          },
          y: (endValue) => {
            return Math.round(endValue / 20) * 20;
          },
        },
        onDragEnd: function() {
          commit('setTilePosition', {
            name: this.vars.trigger.split('--')[1],
            x: this.x,
            y: this.y,
          });
        },
      });
      dispatch('snapOnResize', tile);
    },
    snapOnResize({state, commit}, tile) {
      if (document.getElementsByClassName('gridTile__content--' + tile.name)[0]) {
        state.resizeDetector.listenTo(document.getElementsByClassName('gridTile__content--' + tile.name)[0], _.debounce((el) => {
          if (document.getElementsByClassName('gridTile__content--' + tile.name)[0]) {
            document.getElementsByClassName('gridTile__content--' + tile.name)[0].style.height = Math.round(el.offsetHeight / 20) * 20 + 'px';
            document.getElementsByClassName('gridTile__content--' + tile.name)[0].style.width = Math.round(el.offsetWidth / 20) * 20 + 'px';
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
          dispatch('addTileToDashboard', i);
        }
      }
    },
    removeTileFromDashboard({commit}, name) {
      commit('removeTile', name);
      commit('setTileSize', {name, height: 0, width: 0});
      // commit('setTilePosition', {name, x: 0, y: 0});
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
