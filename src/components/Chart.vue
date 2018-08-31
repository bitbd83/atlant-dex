<template>
  <div id="chart">
    <VueCharting :options="options" height="auto" />
  </div>
</template>
<script>
import VueCharting from 'vue-charting';
import dataFeed from '../services/dataFeed';

export default {
  name: 'Chart',
  components: {
    VueCharting,
  },
  data() {
    return {
      options: {
        symbol: 'BTC/USD',
        overrides: {
          'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0)',
        },
        datafeed: dataFeed(this),
        library_path: '/static/js/charting_library/',
        disabled_features: [
          'left_toolbar',
          'timeframes_toolbar',
          'header_symbol_search',
          'header_resolutions',
          'header_saveload',
          'header_screenshot',
          'header_compare',
          'header_settings',
          'header_undo_redo',
          'header_indicators',
          'header_fullscreen_button',
          'header_widget',
        ],
      },
    };
  },
};
</script>

<style scoped>
  #vue-charting-library{
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
</style>
