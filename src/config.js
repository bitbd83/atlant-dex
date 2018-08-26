// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export const baseURL = 'https://api.coin.gi/';
export const baseURLOld = 'https://apiex.atlant.io';
export const timeout = 30000;
export const hubURL = `${baseURL}main`;
export const hubName = 'notificationHub';
export const showWelcome = false;
export const periods = {
  '1h': '1m',
  '1d': '5m',
  '1w': '15m',
  '1mn': '1h',
  '1y': '12h',
};
export const defPeriod = Object.keys(periods)[3];
export const defCandleSize = periods[defPeriod];

export const sidebarSections = [
  {
    name: 'wallet',
    title: 'Wallet',

  },
  {
    name: 'quotes',
    title: 'Quotes',
    isShowOnLogout: true,
  },
  {
    name: 'alerts',
    title: 'Alerts',
  },

];

export const operatingSystems = [
  {
    id: 'android',
    name: 'Android',
    link: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=ru',
  },
  {
    id: 'ios',
    name: 'iOS',
    link: 'https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8',
  },
  {
    id: 'windows',
    name: 'Windows phone',
    link: '',
  },
];

export const tfaMethods = [
  {
    id: 3,
    name: 'Telegram',
  },
  {
    id: 1,
    name: 'SMS',
  },
  {
    id: 2,
    name: 'Google authentificator',
  },
];
