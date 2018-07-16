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

import api from './apiNew';
import apiOld from './apiOld';

export const getChart = ({period, pair}) => apiOld.get('/trade/chart', {params: {period, pair}});
// export const getTradeInfo = ({pair}) => apiOld.get('/trade/getTraderInfo?', {params: {pair}});
// export const getTraderWallet = () => apiOld.get('/trade/traderWallets');

// NEW API
export const coinsInfo = ({period, currencies}) => api.get(`/exchange/coinsInfo?period=${period}${currencies}`);

export const exchangePairs = () => api.get('/Exchange/pairs');
export const exchangePairInfo = ({baseCurrency, quoteCurrency}) => api.get(`/Exchange/pair/${baseCurrency}/${quoteCurrency}`);


export const getTradeHistory = ({Pair, CurrencyPairValid, Page, Limit}) => api.get('/trades', {params: {Pair, CurrencyPairValid, Page, Limit}});
export const getAccountTradeHistory = ({page, limit, pair}) => api.get(`/trades/my?page=${page}&limit=${limit}&pair=${pair}`);

export const placeOrder = ({isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity, isQuantityInBaseCurrency}) => api.post(`/orders`, {isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity});
export const cancelOrder = ({orderId, priority}) => api.put('/orders/cancel', {orderId, priority});

export const getOrders = (param) => api.get('/orders/my', {params: param});
export const getTradesForOrder = (orderId) => api.get(`/trades/order/${orderId}`);
export const getOrderBook = ({baseCurrency, quoteCurrency, limit}) => api.get('/orders/orderBook', {params: {baseCurrency, quoteCurrency, limit}});

export const getCandlesCollection = ({period, pair}) => api.get('/candlescollection?', {params: {period, pair}});
