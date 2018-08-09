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
      },
    };
  },
  mounted() {
    console.log('Mounted!');
  },
};
</script>
