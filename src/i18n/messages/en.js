// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import serverErrors from './server-errors/en';
import widgetTitles from './widget-titles/en';

export default {
  copied: 'Copied',
  passwordValidation: {
    tooShort: 'Password must have at least {minLength} letters',
    notMatch: 'Passwords must be identical',
  },
  sent2FA: [
    'You were sent an email to confirm',
    'You were sent text message to confirm',
    'Please enter Google Auth code to confirm',
    'You were sent Telegram message to confirm',
  ],
  tfaConfirmTextTelegramEnable: 'Confirmation code has been sent via Telegram to enable 2FA',
  tfaConfirmTextTelegramDisable: 'Confirmation code has been sent via Telegram to disable 2FA',
  tfaConfirmTextSMSEnable: 'SMS with confirmation code has been sent to enable 2FA',
  tfaConfirmTextSMSDisable: 'SMS with confirmation code has been sent to disable 2FA',
  tfaConfirmTextGoogleEnable: 'Enter the one-time password from Google Auth to enable 2FA',
  tfaConfirmTextGoogleDisable: 'Enter the one-time password from Google Auth to disable 2FA',
  tfaSecureWarning: {
    text: 'Please, enable 2 factor authentication to protect your account',
    yesButton: 'OK, enable 2FA',
    noButton: 'No, thanks',
  },
  notifications: {
    loggedIn: 'You logged in with IP {0}',
    tfaEnabled: 'Two factor authentication on',
    tfaDisabled: 'Two factor authentication off',
    upgradeTier: 'You avalible balance is {0}. Please upgrade to the next verification tier',
    orderPlaced: 'New order #{0} placed',
    orderPartiallyFilledSell: 'Order #{0} partially filled: sold {1} {4} for {3} {2}',
    orderFilledSell: 'Order #{0} filled: sold {1} {4} for {3} {2}',
    orderPartiallyFilledBuy: 'Order #{0} partially filled: bought {1} {4} for {3} {2}',
    orderFilledBuy: 'Order #{0} filled: bought {1} {4} for {3} {2}',
  },
  crypto: {
    deposit: {
      deposit: 'Deposit',
      title: 'Your wallet address for deposit:',
      copy: 'Copy',
      description: 'Funds will be deposited automatically after 3 confirmations',
    },
    withdraw: {
      withdraw: 'WITHDRAW',
      placeholderAddress: 'wallet address',
      placeholderAmount: 'withdrawal amount (e.g. 0.5)',
      fee: 'Fee',
      text: 'Your will receive',
      button: 'Withdraw',
    },
  },
  emailSent: 'Email sent to {0}',
  serverErrors,
  widgetTitles,
};
// Confirmation code has been sent to enable 2FA
// Confirmation code has been sent to disable 2FA
