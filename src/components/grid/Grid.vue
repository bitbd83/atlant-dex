<template lang="pug">
.grid(v-scrollbar="")
  // UserVisibility(hide-on-logout)
  GridTile(v-for="item in visibleGrid", :key="item.name", :data="item")
  BuySell
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import UserVisibility from 'components/UserVisibility';
import GridTile from './GridTile';
import BuySell from './BuySell';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('grid', [
      'gridData',
    ]),
    visibleGrid() {
      return this.gridData.filter((item) => item.isHidden === false);
    },
  },
  methods: {
    ...mapActions('grid', [
      'setupDashboard',
    ]),
  },
  mounted() {
    this.setupDashboard();
  },
  components: {
    UserVisibility,
    GridTile,
    BuySell,
  },
  directives: {
    scrollbar,
  },
};
</script>

<style lang="scss">
  @import 'variables';
  .grid {
    position: relative;
    display: flex;
    overflow: scroll;
    flex: 1;
  }
</style>
