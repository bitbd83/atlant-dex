export default {
  state: {
    // allGridLayout: [
    //   {i: 'buySell', x: 0, y: 0, w: 3, h: 7, minW: 2, minH: 7, maxH: 7},
    //   {i: 'chart', x: 3, y: 0, w: 9, h: 7, minW: 5, minH: 7},
    //   {i: 'history', x: 0, y: 7, w: 3, h: 8, minW: 3, minH: 2},
    //   {i: 'book', x: 3, y: 7, w: 5, h: 8, minW: 5, minH: 2},
    //   {i: 'orders', x: 8, y: 7, w: 4, h: 8, minW: 4, minH: 2},
    // ],
    gridData: [
      {name: 'history', order: '541px'},
      {name: 'openOrders', height: '281px'},
      {name: 'closedOrders', height: '281px'},
    ],
    // isEdit: false,
  },

  mutations: {
    changeGrid(state, data) {
      state.gridData = data;
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
