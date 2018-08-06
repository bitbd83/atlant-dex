// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

// import {hubConnection} from 'signalr-no-jquery';

export default {
  install(Vue, url, token, pair) {
    const signalR = require('@aspnet/signalr');
    let connection = new signalR.HubConnection(`${url}?token=${token}&pair=${pair}`);
    Vue.prototype.$hub = connection;
    // {
      // proxy: null,
      // init() {
      //   this.proxy = connection.createHubProxy(name);
      //   connection.logging = false;
      //   connection.disconnected(() => {
      //     return this.start();
      //   });
      // },
      // start() {
      //   return new Promise((resolve, reject) => {
      //     this.connection.start().then((status) => {
      //       return resolve(status);
      //     }).fail((error) => {
      //       return reject(error);
      //     });
      //   });
      // },
    // };
  },
};
