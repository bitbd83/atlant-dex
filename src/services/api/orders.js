// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import api from './api';

export const getTradeHistory = ({Pair, CurrencyPairValid, Page, Limit}) => api.get('/trades', {params: {Pair, CurrencyPairValid, Page, Limit}});
export const getAccountTradeHistory = ({page, limit, pair}) => api.get(`/trades/my?page=${page}&limit=${limit}&pair=${pair}`);

export const placeOrder = ({isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity, isQuantityInBaseCurrency}) => api.post(`/orders`, {isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity});
export const cancelOrder = ({orderId, priority}) => api.put('/orders/cancel', {orderId, priority});
export const getOrdersCSV = (param) => api.get('/orders/my/csv', {params: param});

export const getOrders = (param) => api.get('/orders/my', {params: param});
export const getTradesForOrder = (orderId) => api.get(`/trades/order/${orderId}`);
export const getOrderBook = ({baseCurrency, quoteCurrency, limit}) => api.get('/orders/orderBook', {params: {baseCurrency, quoteCurrency, limit}});

