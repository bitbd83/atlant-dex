// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.grid(v-scrollbar="")
  component(
    v-for="item in visibleGrid"
    :key="item.name"
    :data="item"
    :is="item.name"
  )
  BuySell
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import UserVisibility from 'components/UserVisibility';
import BuySell from './BuySell';

import Photos from './Photos';
import TokenInfo from './TokenInfo';
import Orders from './Orders';
import OrderBook from './OrderBook';
import History from './History';
import Chart from './Chart';

export default {
  computed: {
    ...mapGetters('grid', [
      'getGridData',
    ]),
    visibleGrid() {
      return this.getGridData.filter((item) => item.isHidden === false);
    },
  },
  methods: {
    ...mapActions(
      'grid',
      [
        'setupDashboard',
      ]
    ),
  },
  mounted() {
    this.setupDashboard();
  },
  components: {
    UserVisibility,
    BuySell,
    TokenInfo,
    Photos,
    Orders,
    OrderBook,
    History,
    Chart,
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
