// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export default {
  install(Vue, url, token, pair) {
    const signalR = require('@aspnet/signalr');
    let connection = new signalR.HubConnection(`${url}?token=${token}&pair=${pair}`);
    Vue.prototype.$hub = connection;
  },
};
