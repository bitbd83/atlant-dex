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
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
