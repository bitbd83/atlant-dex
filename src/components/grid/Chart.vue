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
import IEcharts from 'vue-echarts-v3/src/lite.js';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/lines';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import {mapState, mapGetters, mapActions} from 'vuex';
import {priceChartSettings} from 'services/misc';
import Chart from './../Chart';

export default {
  mixins: [TileBase],
  data() {
    return {
      chart: {},
      maxRenderedCandles: 0,
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
      this.chart = {
        tooltip: {
          trigger: 'axis',
          showContent: false,
        },
        axisPointer: {
          type: 'cross',
        },
        animation: false,
        grid: [
          {
            show: false,
            left: 0,
            right: 70,
            bottom: 32,
            top: 64,
            width: 'auto',
            height: 'auto',
            containLabel: false,
          },
          {
            show: false,
            left: 0,
            right: 70,
            bottom: 32,
            top: '70%',
            width: 'auto',
            height: 'auto',
            containLabel: false,
          },
        ],
        xAxis: [
          {
            type: 'category',
            data: this.timeSeries,
            scale: true,
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: '#7aa9ff',
              fontFamily: 'Supply',
            },
            axisTick: {
              show: false,
            },
            axisPointer: {
              show: true,
              lineStyle: {
                color: '#004dff',
                type: 'dashed',
              },
              label: {
                show: true,
                color: '#004dff',
                fontFamily: 'Supply',
                backgroundColor: '#fff',
                shadowBlur: 0,
              },
            },
          },
          {
            show: false,
            gridIndex: 1,
            type: 'category',
            data: this.volumeSeries,
            scale: false,
            boundaryGap: true, // don't touch this!
            axisPointer: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            scale: true,
            position: 'right',
            offset: false,
            width: 100,
            splitArea: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f1f1f1',
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              color: '#3f79f7',
              fontFamily: 'Supply',
              verticalAlign: 'middle',
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            scale: false,
            gridIndex: 1,
            splitNumber: 5,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: this.setStartDataZoomOfChart,
            end: 100,
            throttle: false,
          },
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: this.setStartDataZoomOfChart,
            end: 100,
            throttle: false,
          },
        ],
        series: [
          priceChartSettings(this.currentChart, this.priceSeries),
          {
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(10),
            lineStyle: {
              color: this.technicalIndicators['MA10'].color,
              opacity: this.technicalIndicators['MA10'].enabled,
            },
            showSymbol: false,
            symbolSize: 0,
            zlevel: 1,
          },
          {
            name: 'EMA10',
            type: 'line',
            data: this.calculateEMA(10),
            lineStyle: {
              color: this.technicalIndicators['EMA10'].color,
              opacity: this.technicalIndicators['EMA10'].enabled,
            },
            showSymbol: false,
            symbolSize: 0,
            zlevel: 1,
          },
          // {
          //   name: 'MACD',
          //   type: 'line',
          //   data: this.technical('MACD'),
          //   lineStyle: {
          //     color: this.technicalIndicators['MACD'].color,
          //     opacity: this.technicalIndicators['MACD'].enabled,
          //   },
          //   showSymbol: false,
          //   zlevel: 1,
          // },
          {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.volumeSeries,
            itemStyle: {
              color: '#376691',
              opacity: 0.3,
            },
          },
        ],
      };
    },
    calculateMA(count = 10) {
      let result = [];

      for (let i = 0, len = this.rawCandles.length; i < len; i++) {
        if (i < count) {
          result.push('');
          continue;
        };
        let sum = 0;
        for (let j = 0; j < count; j++) {
          sum += this.rawCandles[i - j].high;
        };
        result.push(sum / count);
      }
      return result;
    },
    calculateEMA(count = 10) {
      if (!this.rawCandles.length) return 0;
      let result = [];
      let k = 2 / (count + 1);

      result = [this.rawCandles[0].high];
      for (let i = 1; i < this.rawCandles.length; i++) {
        result.push(this.rawCandles[i].high * k + result[i - 1] * (1 - k));
      };
      return result;
    },
    onSendSignal({payload, metadata}) {
      if (
        metadata &&
        metadata.type === 'candle' &&
        payload.baseCurrency === this.baseCurrency &&
        payload.quoteCurrency === this.quoteCurrency &&
        payload.period === this.candlePeriod
      ) {
        this.addNewCandle(payload);
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
    // this.$hub.on('Send', this.onSendSignal);
  },
  components: {
    IEcharts,
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
