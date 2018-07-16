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

import serverErrors from './server-errors/en';

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
    text: 'Please, enable 2 factor authorization to protect your account',
    title: 'Your account is not secure',
    yesButton: 'OK, enable 2FA',
    noButton: 'No, thanks',
  },
  notifications: {
    loggedIn: 'You logged in with IP {0}',
    tfaEnabled: 'Two factor authorization on',
    tfaDisabled: 'Two factor authorization off',
    upgradeTier: 'You avalible balance is {0}. Please upgrade to the next verification tier',
    orderPlaced: 'New order #{0} placed',
    orderPartiallyFilledSell: 'Order #{0} partially filled: sold {1} {4} for {3} {2}',
    orderFilledSell: 'Order #{0} filled: sold {1} {4} for {3} {2}',
    orderPartiallyFilledBuy: 'Order #{0} partially filled: bought {1} {4} for {3} {2}',
    orderFilledBuy: 'Order #{0} filled: bought {1} {4} for {3} {2}',
  },
  emailSent: 'Email sent to {0}',
  serverErrors,
};
// Confirmation code has been sent to enable 2FA
// Confirmation code has been sent to disable 2FA
