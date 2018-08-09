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
      },
    };
  },
  mounted() {
    console.log('Mounted!');
  },
};
</script>
