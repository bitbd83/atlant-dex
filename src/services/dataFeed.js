import store from '@/store';
const supportedResolutions = ['1', '3', '5', '15', '30', '60', '120', '240', 'D'];

const config = {
  supported_resolutions: supportedResolutions,
};

export default function(vm) {
  let savedData = [];
  return {
    onReady: (cb) => {
      setTimeout(() => cb(config), 0);
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
      let splitData = symbolName.split(/[:/]/);
      let symbolStub = {
        name: symbolName,
        description: '',
        type: 'crypto',
        session: '24x7',
        timezone: 'Etc/UTC',
        ticker: symbolName,
        exchange: splitData[0],
        minmov: 1,
        pricescale: 100000000,
        has_intraday: true,
        intraday_multipliers: ['1', '60'],
        supported_resolution: supportedResolutions,
        volume_precision: 8,
        data_status: 'streaming',
      };
      setTimeout(function() {
        onSymbolResolvedCallback(symbolStub);
      }, 0);
    },
    getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
      store
        .dispatch('chart/loadChart')
        .then(
          (data) => {
            if (data instanceof Array) {
              data = data.map(
                (el) => ({
                  time: Date.parse(el.candleOpen),
                  low: el.low,
                  high: el.high,
                  open: el.open,
                  close: el.close,
                  volume: el.volume,
                })
              );
              savedData = data;
              onHistoryCallback(savedData, {noData: false});
            }
          }
        );
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
      vm.$hub.on(
        'Send',
        ({metadata, payload}) => {
          if (
            metadata &&
            metadata.type === 'candle' &&
            payload.baseCurrency === vm.$store.getters['tradeInfo/baseCurrency'] &&
            payload.quoteCurrency === vm.$store.getters['tradeInfo/quoteCurrency'] &&
            payload.period === vm.$store.getters['chart/candlePeriod']
          ) {
            let newCandle = {
              time: Date.parse(payload.candleOpen),
              low: payload.low,
              high: payload.high,
              open: payload.open,
              close: payload.close,
              volume: payload.volume,
            };
            onRealtimeCallback(newCandle);
          }
        }
      );
    },
    unsubscribeBars: (subscriberUID) => {},
    getServerTime: (cb) => {},
  };
}
