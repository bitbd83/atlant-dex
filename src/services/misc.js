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

export const getSeparatedNumber = (str, symbol) =>
  str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);

export const getCryptoName = (short) => {
  switch (short) {
    case ('BTC'): return 'Bitcoin';
    case ('LTC'): return 'Litecoin';
    case ('ETC'): return 'Ethereum Classic';
    case ('ZEC'): return 'ZCash';
    case ('ETH'): return 'Ethereum';
    case ('BCC'): return 'Bitcoin Cash';
  }
};

export const isFiat = (short) => {
  return ['USD', 'EUR'].includes(short);
};

export const getRandomInt = (min, max) => {
  const random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
};

export const ticksToMilliseconds = (ticks) => {
  const epochTicks = 621355968000000000;
  const ticksPerMillisecond = 10000;
  const jsTicks = (ticks - epochTicks) / ticksPerMillisecond;
  const date = new Date(jsTicks);
  return date.getTime();
};

export function debounce(f, ms) {
  let timer = null;
  return function(...args) {
    const onComplete = () => {
      // eslint-disable-next-line
      f.apply(this, args);
      timer = null;
    };
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(onComplete, ms);
  };
}

export const priceChartSettings = (chartType, priceSeries) => {
  return {
    name: 'Price',
    type: chartType,
    data: priceSeries,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
          offset: 0, color: '#FFC75E',
        }, {
          offset: 1, color: '#F03DA2',
        }],
      },
      width: 3,
    },
    itemStyle: {
      color: (chartType === 'candlestick') ? '#2acc97' : '#f78280',
      color0: '#f34856',
      borderColor: null,
      borderColor0: null,
    },
  };
};
