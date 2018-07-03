export default {
  state: {
    gridData: [
      {name: 'chart', title: 'Chart', height: 473, width: 849, x: 0, y: 0},
      {name: 'history', title: 'History', height: 393, width: 400, x: 0, y: 0},
      // {name: 'openOrders', title: 'Open orders', height: '200px'},
      // {name: 'closedOrders', title: 'Closed orders', height: '300px'},
      // {name: 'orderBook', title: 'Order book', height: '300px'},
      // {name: 'buySell', title: 'Place order', height: '400px'},
    ],
    hiddenGridData: [
    ],
    // isEdit: false,
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
    setTileSize(state, data) {
      console.log(data);
      let el = state.gridData.find((item) => item.name === data.name);
      el.height = data.height;
      el.width = data.width;
    },
    removeTile(state, name) {
      state.hiddenGridData.push(state.gridData.find((item) => item.name === name));
      state.gridData = state.gridData.filter((item) => item.name != name);
    },
    setTilePosition(state, data) {
      state.gridData.find((item) => item.name === data.name).x = data.x;
      state.gridData.find((item) => item.name === data.name).y = data.y;
    },
    // setIsEdit(state) {
    //   state.isEdit = !state.isEdit;
    // },
    // addGridLayout(state, component) {
    //   let unique = true;
    //   state.gridData.forEach((el) => {
    //     if (el.i == component.i) {
    //       unique = false;
    //       return false;
    //     }
    //   });
    //   if (unique) {
    //     state.gridData.push(component);
    //   }
    // },
    // removeGridLayout(state, component) {
    //   // console.log('Remove grid item ', component);
    //   state.gridData = state.gridData.filter((e) => {
    //     return e.i != component;
    //   });
    // },
  },
  // getters: {
  //   getHiddenLayout(state) {
  //     return state.allGridLayout.filter((e) => state.gridData.findIndex((i) => i.i == e.i) === -1);
  //   },
  // },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
