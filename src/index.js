// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import Vue from 'vue';
import i18n from './i18n';
import store from './store';
import router from './router';
import hub from './services/hub';
import Vuelidate from 'vuelidate';
import {hubURL} from './config.js';
import Icon from './components/Icon';
import Vue2Filters from 'vue2-filters';

Vue.component('Icon', Icon);

Vue.use(Vue2Filters);
Vue.use(Vuelidate);
Vue.use(hub, hubURL, store.state.membership.token, store.state.tradeInfo.pair);

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  created() {
    const icons = require.context('./assets/icons/', true, /\.(svg)$/);
    icons.keys().forEach(icons);
  },
});
