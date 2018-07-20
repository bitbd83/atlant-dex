// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from './messages/ru';
import en from './messages/en';
import cn from './messages/cn';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: {
    ru,
    en,
    cn,
  },
});

export default i18n;
