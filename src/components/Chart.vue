<template>
  <div id="chart">
    <VueCharting :options="options" />
  </div>
</template>
<script>
import VueCharting from 'vue-charting';
import DataFeed from '../services/dataFeed';

export default {
  name: 'Chart',
  components: {
    VueCharting,
  },
  data() {
    return {
      options: {
        datafeed: DataFeed,
        library_path: '/static/js/charting_library/',
        disabled_features: ['left_toolbar', 'timeframes_toolbar', 'header_symbol_search', 'header_resolutions', 'header_saveload'],
      },
    };
  },
};
</script>
