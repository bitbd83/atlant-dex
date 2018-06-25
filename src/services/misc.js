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
