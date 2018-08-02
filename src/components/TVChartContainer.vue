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
      default: 'D',
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
    const widgetOptions = {
      symbol: this.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: datafeed,
      interval: this.interval,
      container_id: this.containerId,
      library_path: this.libraryPath,

      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings', 'header_widget', 'left_toolbar'],
      enabled_features: [],
      charts_storage_url: this.chartsStorageUrl,
      charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: this.userId,
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      studies_overrides: this.studiesOverrides,
    };

    onready(() => {
      const Widget = widget;
      window.tvWidget = new Widget(widgetOptions);
    });
  },
};
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: 100%;
}
</style>
