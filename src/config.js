// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

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
export const defPeriod = Object.keys(periods)[2];
export const defCandleSize = periods[defPeriod];

export const profileSections = [
  {
    name: 'accountInformation',
    label: 'Account information',
    category: 'user info',
  },
  {
    name: 'verification',
    label: 'Verification',
    category: 'user info',
  },
  // {
  //   name: 'verificationAdmin',
  //   label: 'Verification (admin)',
  //   category: 'user info',
  // },
  {
    name: 'securitySettings',
    label: 'Security settings',
    category: 'security',
  },
  {
    name: 'securityLog',
    label: 'Security log',
    category: 'security',
  },
  // {
  //   name: 'faq',
  //   label: 'FAQ',
  //   category: 'user info',
  // },
  {
    name: 'transactionHistory',
    label: 'Transaction history',
  },
  {
    name: 'myOrders',
    label: 'My orders',
  },
  {
    name: 'notificationHistory',
    label: 'Notification History',
  },
];

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
  },
  {
    id: 'ios',
    name: 'iOS',
  },
  {
    id: 'windows',
    name: 'Windows phone',
  },
];

export const tfaMethods = [
  {
    id: 1,
    name: 'SMS',
  },
  {
    id: 2,
    name: 'Google Auth',
  },
  {
    id: 3,
    name: 'Telegram',
  },
];
