// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.grid(:class="{'grid--showGrid' : showGrid}" v-scrollbar="")
  component(
    v-for="item in visibleGrid"
    :key="item.name"
    :data="item"
    :is="item.name"
  )
  BuySell
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {setupDashboard} from '../../services/grid';
import {scrollbar} from '@/directives';
import UserVisibility from 'components/UserVisibility';
import BuySell from './BuySell';

import Photos from './Photos';
import TokenInfo from './TokenInfo';
import Orders from './Orders';
import OrderBook from './OrderBook';
import History from './History';
import Chart from './Chart';
import Documents from './Documents';
import ExtendedInfo from './ExtendedInfo';

export default {
  computed: {
    ...mapState('grid', [
      'showGrid',
    ]),
    ...mapGetters('grid', [
      'getGridData',
    ]),
    visibleGrid() {
      return this.getGridData.filter((item) => item.isHidden === false);
    },
  },
  mounted() {
    setupDashboard(this.$store);
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
    Documents,
    ExtendedInfo,
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
    &--showGrid {
      $gridColor: $color__grey;
      $gridSize: 10px;
      border-top: 1px solid $gridColor;
      background-size: $gridSize $gridSize;
      background-image: repeating-linear-gradient(0deg, $gridColor, $gridColor 1px, transparent 1px, transparent $gridSize),
                        repeating-linear-gradient(-90deg, $gridColor, $gridColor 1px, transparent 1px, transparent $gridSize);
    }
  }
</style>
