// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
Tile(
  :name="data.name"
  :left="data.x"
  :top="data.y"
)
  TileHeader(
    :name="data.name"
  )
    ChartHeader

  TileContent(
    :height="data.height"
    :width="data.width"
    :name="data.name"
  )
    .chart
      Chart
</template>

<script>
import TileBase from '../../mixins/TileBase';
import ChartHeader from './ChartHeader';
// import IEcharts from 'vue-echarts-v3/src/lite.js';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/dataZoom';
import {mapState, mapGetters, mapActions} from 'vuex';
import {priceChartSettings} from 'services/misc';
import Chart from './../Chart';

export default {
  mixins: [TileBase],
  data() {
    return {
      chart: {},
      maxRenderedCandles: 0,
      loading: false,
    };
  },
  computed: {
    ...mapState('chart', {
      rawCandles: (state) => state.data.candles,
      technicalIndicators: 'technicalIndicators',
      currentChart: 'currentChart',
    }),
    ...mapGetters('chart', [
      'candlePeriodInMs',
      'candlePeriod',
      'lastCandleOpenTime',
      'getEmptyCandle',
    ]),
    ...mapGetters('tradeInfo', [
      'baseCurrency',
      'quoteCurrency',
    ]),
    priceSeries() {
      if (this.rawCandles) {
        if (this.currentChart === 'candlestick') {
          return this.rawCandles.map(
            ({open, close, low, high}) => [open, close, low, high]
          );
        } else {
          return this.rawCandles.map((item) => item.close);
        }
      }
    },
    timeSeries() {
      return this.rawCandles.map((item) => {
        const date = new Date(item.candleOpen);
        if (this.candlePeriodInMs <= 300000) {
          // Don't show seconds
          return date.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute: '2-digit'});
        } else {
          return date.toLocaleDateString();
        }
      });
    },
    volumeSeries() {
      return this.rawCandles.map(({volume}) => volume);
    },
    setStartDataZoomOfChart() {
      let containerWidth = document.getElementById('chart').clientWidth;
      let howManyCandlesInTheScreen = containerWidth / 10;
      let result = 100 - (howManyCandlesInTheScreen * 100 / this.timeSeries.length);
      return result;
    },
  },
  methods: {
    ...mapActions('chart', [
      'loadChart',
    ]),
    ...mapActions('chart', [
      'addNewCandle',
    ]),
    initChart() {
    },
    createChart() {
    },
    calculateMA(count = 10) {
    },
    calculateEMA(count = 10) {
    },
    onSendSignal({payload, metadata}) {
      if (
        metadata &&
        metadata.type === 'candle' &&
        payload.baseCurrency === this.baseCurrency &&
        payload.quoteCurrency === this.quoteCurrency &&
        payload.period === this.candlePeriod
      ) {
        console.log(payload);
        // this.addNewCandle(payload);
      }
    },
    addEmptyCandle() {
      const emptyCandle = this.getEmptyCandle();
      this.addNewCandle(emptyCandle);
    },
    setEmptyCandleHandler() {
      if (!this.rawCandles.length) return;
      clearTimeout(this._emptyCandleTimeoutId);
      const pastTime = new Date().getTime() - this.lastCandleOpenTime;
      const timeout = this.candlePeriodInMs - pastTime;
      if (timeout >= 0) {
        this._emptyCandleTimeoutId = setTimeout(this.addEmptyCandle, timeout);
      }
    },
  },
  watch: {
    rawCandles() {
      this.calculateMA(10);
      this.calculateEMA(10);
      // this.createChart();
      this.setEmptyCandleHandler();
    },
    currentChart() {
      this.chart = ({
        series: [
          priceChartSettings(this.currentChart, this.priceSeries),
        ],
      });
    },
    technicalIndicators: {
      handler() {
        // this.createChart();
      },
      deep: true,
    },
  },
  created() {
    this.initChart();
    // this.loadChart().then(() => {
    //   this.createChart();
    // });
    this.$hub.on(
      'candle_1d_BTC_USD',
      (data, data2) => {
        console.log('hell', data, data2);
      }
    );
    this.$hub.on('Send', this.onSendSignal);
  },
  components: {
    // IEcharts,
    ChartHeader,
    Chart,
  },
};
</script>

<style lang='scss'>
@import 'variables';
.chart {
  height: 100%;
  width: 100%;
  background-color: $background__white;
  border-radius: 8px;
  border: 1px solid $color__grey_border;
  padding: 0 0 0 3px;
}
</style>
