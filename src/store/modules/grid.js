export default {
  state: {
    gridData: [
      {name: 'history', height: '100px'},
      {name: 'openOrders', height: '200px'},
      {name: 'closedOrders', height: '300px'},
    ],
    hiddenGridData: [
    ],
    // isEdit: false,
  },
  getters: {
    getTileHeight: (state) => (name) => {
      return state.gridData.find((item) => item.name === name).height;
    },
  },
  mutations: {
    changeGrid(state, data) {
      state.gridData = data;
      console.log('changed grid');
    },
    setTileHeight(state, data) {
      state.gridData.find((item) => item.name === data.name).height = data.height;
    },
    removeTile(state, name) {
      state.hiddenGridData.push(state.gridData.find((item) => item.name === name));
      state.gridData = state.gridData.filter((item) => item.name != name);
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
