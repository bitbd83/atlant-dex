// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export default {
  install(Vue, url, token, pair) {
    let connection = new HubConnectionBuilder()
      .withUrl(`${url}?token=${token}&pair=${pair}`)
      .build();
    Vue.prototype.$hub = connection;
  },
};
