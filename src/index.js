import Vue from 'vue';
import i18n from './i18n';
import store from './store';
import router from './router';
import hub from './services/hub';
import Vuelidate from 'vuelidate';
import {hubURL} from './config.js';
import {numbersFormat} from '@/mixins';
import Icon from './components/Icon';

Vue.component('Icon', Icon);
Vue.use(Vuelidate);
Vue.use(hub, hubURL, store.state.membership.token, store.state.tradeInfo.pair);

Vue.mixin(numbersFormat);

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
