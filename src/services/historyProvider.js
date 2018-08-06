/* eslint-disable */
import store from '@/store';
const history = {}

export default {
  history: history,

  getBars: function(symbolInfo, resolution, from, to, first, limit) {
    return store
      .dispatch('chart/loadChart')
      .then(
        (data) => {
          console.log(data);
          // if (data instanceof Array) {
          //   data = data.map(
          //     (el) => ({
          //       time: Date.parse(el.candleOpen),
          //       low: el.low,
          //       high: el.high,
          //       open: el.open,
          //       close: el.close,
          //       volume: el.volume
          //     })
          //   );
          // }
          // data = data.filter((el) => el.time > 0);
          // if (first) {
          //   var lastBar = data[data.length - 1]
          //   history[symbolInfo.name] = {lastBar: lastBar}
          // }
          console.log(history);
          return data;
        }
      );
  }
}

// var rp = require('request-promise').defaults({json: true})

// const api_root = 'https://min-api.cryptocompare.com'
// const history = {'Coinbase:BTC/USD': 671 };

// import store from '@/store';

// export default {
//   history: history,
//   getBars: function(symbolInfo, resolution, from, to, first, limit) {

  
//   }
// }
