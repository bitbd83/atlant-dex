<template>
<div class="TVChartContainer" :id="containerId" />
</template>

<script>

import {
  widget,
  onready,
} from '../../static/js/charting_library/charting_library.min';
import {mapState, mapActions} from 'vuex';

import datafeed from '@/services/dataFeed';

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export default {
  name: 'TVChartContainer',
  props: {
    symbol: {
      default: 'Coinbase:BTC/USD',
      type: String,
    },
    interval: {
      default: 'MN',
      type: String,
    },
    containerId: {
      default: 'tv_chart_container',
      type: String,
    },
    datafeedUrl: {
      default: 'https://demo_feed.tradingview.com',
      type: String,
    },
    libraryPath: {
      default: '/static/js/charting_library/',
      type: String,
    },
    chartsStorageUrl: {
      default: 'https://saveload.tradingview.com',
      type: String,
    },
    chartsStorageApiVersion: {
      default: '1.1',
      type: String,
    },
    clientId: {
      default: 'tradingview.com',
      type: String,
    },
    userId: {
      default: 'public_user_id',
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: true,
      type: Boolean,
    },
    studiesOverrides: {
      type: Object,
    },
  },
  computed: {
    ...mapState('chart', ['data']),
  },
  methods: {
    ...mapActions(
      'chart',
      [
        'loadChart',
      ]
    ),
  },
  mounted() {
    // const widgetOptions = {
    //   symbol: this.symbol,
    //   // BEWARE: no trailing slash is expected in feed URL
    //   datafeed: datafeed,
    //   interval: '15',
    //   container_id: this.containerId,
    //   library_path: this.libraryPath,

    //   locale: getLanguageFromURL() || 'en',
    //   disabled_features: [
    //     'use_localstorage_for_settings',
    //     'header_widget',
    //     'left_toolbar',
    //     // 'timeframes_toolbar',
    //     // 'control_bar',
    //   ],
    //   enabled_features: [],
    //   charts_storage_url: this.chartsStorageUrl,
    //   charts_storage_api_version: this.chartsStorageApiVersion,
    //   client_id: this.clientId,
    //   user_id: this.userId,
    //   fullscreen: this.fullscreen,
    //   autosize: this.autosize,
    //   studies_overrides: this.studiesOverrides,
    //   time_frames: [
    //     {
    //       text: '1h',
    //       resolution: '1m',
    //     },
    //     {
    //       text: '1d',
    //       resolution: '5m',
    //     },
    //     {
    //       text: '1w',
    //       resolution: '15m',
    //     },
    //     {
    //       text: '1mn',
    //       resolution: '1h',
    //     },
    //     {
    //       text: '1y',
    //       resolution: '12h',
    //     },
    //   ],
    // };

    const widgetOptions2 = {
      debug: false,
      symbol: 'Coinbase:BTC/USD',
      datafeed: datafeed,
      interval: '15',
      container_id: 'tv_chart_container',
      library_path: '/static/js/charting_library/',
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      studies_overrides: {},
    };

    onready(() => {
      const Widget = widget;
      setTimeout(() => {
        window.tvWidget = new Widget(widgetOptions2);

        window.tvWidget.onChartReady(() => {
          console.log('Chart has loaded!');
        });
      }, 10000);
    });
  },
};
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: 100%;
}
</style>
