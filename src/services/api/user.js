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

// import apiOld from './apiOld';
import api from './apiNew';

export const getProfile = () => api.get('profile/my');

export const requestTFAChange = ({method, contact}) => api.post('profile/requestTfaChanging', {method, contact});
export const finishTFAChange = ({method, contact, code}) => api.put('profile/finishTfaChanging', {method, contact, code});

export const changePhone = ({countryCode, phone}) => api.put(`profile/fields/phone`, {countryCode, phone});
export const changePreferredCurrency = (currencyCode) => api.put(`profile/fields/prefferedCurrency/${currencyCode}`);
export const changeNewsletterSubscription = (isEnable) => api.put(`profile/subscription/${isEnable}`);
export const verifyPhone = (code) => api.put(`/profile/fields/verify/phone/${code}`);
export const changeAdditionalEmail = (email) => api.put(`profile/fields/additionalEmail/${email}`);
export const verifyAdditionalEmail = (confirmationCode) => api.put(`profile/fields/verify/additionalEmail/${confirmationCode}`);

export const getAccountTransactionHistory = ({page, limit, sortBy, ascending}) => api.get('crypto/transactions?', {params: {page, limit, sortBy, ascending}});
export const getNotificationHistory = ({page, limit, sortBy, ascending}) => api.get('/notifications/history', {params: {page, limit, sortBy, ascending}});
export const getSecurityLog = ({page, limit}) => api.get('logs/security', {params: {page, limit}});

export const getBalances = () => api.get('account/balances');
export const getCurrencies = () => api.get('/exchange/currencies');
export const deposit = ({currency, amount}) => api.put('account/deposit', {currency, amount});
export const getDepositAddress = ({currency}) => api.get('crypto/address', {params: {currency}});
export const withdraw = ({currency, amount, address}) => api.post('crypto/withdraw/request', {currency, amount, address});
export const confirmWithdraw = ({currency, code, transactionId}) => api.post('crypto/withdraw/finish', {currency, code, transactionId});
