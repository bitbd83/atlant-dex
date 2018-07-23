// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export const getWidgetType = (name) => {
  return ['chart', 'history', 'orders', 'orderBook'].includes(name) ? 'trade' : 'property';
};

export const getWidgetTitle = (name) => {
  const m = new Map([
    ['chart', 'Chart'],
    ['history', 'Trade history'],
    ['orders', 'Orders'],
    ['orderBook', 'Order book'],
    ['tokenInfo', 'Token Info'],
    ['photos', 'Photos'],
  ]);
  return m.get(name) || name;
};

export const defaultViews = [
  {
    name: 'Trading',
    grid: [
      {name: 'chart', height: 400, width: 740, x: 0, y: 0, isHidden: false},
      {name: 'history', height: 300, width: 340, x: 1170, y: 450, isHidden: false},
      {name: 'orders', height: 300, width: 1160, x: 0, y: 450, isHidden: false},
      {name: 'orderBook', height: 400, width: 760, x: 760, y: 0, isHidden: false},
    ],
  },
  {
    name: 'Research',
    grid: [
      {name: 'chart', height: 400, width: 740, x: 0, y: 0, isHidden: true},
      {name: 'history', height: 300, width: 340, x: 1170, y: 450, isHidden: true},
      {name: 'orders', height: 300, width: 1160, x: 0, y: 450, isHidden: true},
      {name: 'orderBook', height: 400, width: 760, x: 760, y: 0, isHidden: true},
    ],
  },
];
