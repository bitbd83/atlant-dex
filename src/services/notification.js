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

import Noty from 'noty';
import i18n from '@/i18n';
import {serverCodes} from './serverCodes';

window.i18n = i18n;

export const getServerErrorText = (responseData) => {
  if (i18n.te(`serverErrors.${responseData.status}`)) {
    return i18n.t(`serverErrors.${responseData.status}`);
  } else if (responseData.description) {
    return responseData.description;
  } else {
    return 'Something wrong';
  }
};

export const notification = ({title = '', text, type = 'info'}) => {
  let errorTag = '';
  if (type === 'error') {
    errorTag = `<b style="color:red;">Error. </b>`;
  };
  new Noty({
    text: `${errorTag}<b>${title}</b> ${text}`,
    type: 'info',
    layout: 'topRight',
    closeWith: ['click', 'button'],
    progressBar: false,
    timeout: 3000,
  }).show();
};

export const serverNotification = (response) => {
  const {data: {code}, status} = response;
  let alias = '';
  let type = '';

  if (status === 401) {
    alias = 'Session Timed Out';
    type = 'error';
  } else {
    const message = serverCodes[code];
    alias = (message) ? message.name : ``;
    type = (message) ? message.type : 'error';
  }

  notification({
    title: `Code #${code}: `,
    text: alias,
    type,
  });
};

export const serverNotification2 = (response) => {
  const {data} = response;
  if (response.status >= 400) {
    const type = 'error';
    notification({
      text: getServerErrorText(data),
      type,
    });
  }
};

export const notificationType = (level) => {
  switch (level) {
    case 0: return 'info';
    case 1: return 'warning';
    case 2: return 'error';
  }
};

export const getSignalRNotification = (type) => {
  switch (type) {
    case 1: return 'loggedIn';
    case 2: return 'tfaEnabled';
    case 3: return 'tfaDisabled';
    case 6: return 'upgradeTier';
    case 7: return 'orderPlaced';
    case 8: return 'orderPartiallyFilledSell';
    case 9: return 'orderFilledSell';
    case 10: return 'orderPartiallyFilledBuy';
    case 11: return 'orderFilledBuy';
  };
};
