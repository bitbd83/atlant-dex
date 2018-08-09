/* eslint-disable */
import store from '@/store';
const history = {}
import clinetrp from 'request-promise';

var rp = clinetrp.defaults({json: true});

const api_root = 'https://min-api.cryptocompare.com'

export default {
  history: history,

  getBars: function(symbolInfo, resolution, from, to, first, limit) {
        var split_symbol = symbolInfo.name.split(/[:/]/)

          const url = resolution === 'D' ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute'
          const qs = {
              e: split_symbol[0],
              fsym: split_symbol[1],
              tsym: split_symbol[2],
              toTs:  to ? to : '',
              limit: limit ? limit : 2000, 
              aggregate: 1
            }
          console.log(qs);
          // console.log({qs})

            return rp({
                    url: `${api_root}${url}`,
                    qs,
                })
                .then(data => {
                    console.log({data})
            if (data.Response && data.Response === 'Error') {
              console.log('CryptoCompare API error:',data.Message)
              return []
            }
            if (data.Data.length) {
              console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`)
              var bars = data.Data.map(el => {
                return {
                  time: el.time * 1000, //TradingView requires bar time in ms
                  low: el.low,
                  high: el.high,
                  open: el.open,
                  close: el.close,
                  volume: el.volumefrom 
                }
              })
                if (first) {
                  var lastBar = bars[bars.length - 1]
                  history[symbolInfo.name] = {lastBar: lastBar}
                }
              return bars
            } else {
              return []
            }
          })
    // return store
    //   .dispatch('chart/loadChart')
    //   .then(
    //     (data) => {
    //       console.log(data);
    //       if (data instanceof Array) {
    //         data = data.map(
    //           (el) => ({
    //             time: Date.parse(el.candleOpen),
    //             low: el.low,
    //             high: el.high,
    //             open: el.open,
    //             close: el.close,
    //             volume: el.volume
    //           })
    //         );
    //       }
    //       if (first) {
    //         var lastBar = data[data.length - 1]
    //         history[symbolInfo.name] = {lastBar: lastBar}
    //       }
    //       return data;
    //     }
    //   );
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
