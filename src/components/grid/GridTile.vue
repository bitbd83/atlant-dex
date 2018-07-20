// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.gridTile(:class="'gridTile--' + data.name")
  .gridTile__headerContainer(:class="'gridTile__headerContainer--' + data.name")
    .gridTile__header
      .title.gridTile__title {{data.title}}:
      OrdersHeader(v-if="data.name === 'orders'")
      ChartHeader(v-if="data.name === 'chart'")
      Icon.gridTile__icon(id="cross" @click="removeTile(data.name)")
  .gridTile__content(:class="'gridTile__content--' + data.name")
    History(v-if="data.name === 'history'")
    Orders(v-if="data.name === 'orders'")
    TokenInfo(v-if="data.name === 'tokenInfo'")
    Photos(v-if="data.name === 'photos'")

    .gridTile__orderBook(v-if="data.name === 'orderBook'")
      OrderBook.gridTile__orderBookTable(ask)
      OrderBook.gridTile__orderBookTable
    Chart(v-if="data.name === 'chart'")
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import Chart from './Chart';
import ChartHeader from './ChartHeader';
import Orders from './Orders';
import OrdersHeader from './OrdersHeader';
import OrderBook from './OrderBook';
import History from './History';
import TokenInfo from './TokenInfo';
import Photos from './Photos';

export default {
  computed: {
    ...mapGetters('grid', [
      'getTileSize',
      'getTilePosition',
    ]),
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations('grid', [
      'setTileHeight',
      'removeTile',
    ]),
    setMaxZIndex() {
      let maxZ = 0;
      for (let tile of document.getElementsByClassName('gridTile')) {
        maxZ = Math.max(maxZ, tile.style.zIndex);
      };
      document.getElementsByClassName('gridTile--' + this.data.name)[0].style.zIndex = maxZ + 1;
    },
  },
  components: {
    Chart,
    ChartHeader,
    Orders,
    OrdersHeader,
    OrderBook,
    History,
    TokenInfo,
    Photos,
  },
  mounted() {
    document.getElementsByClassName('gridTile__content--' + this.data.name)[0].style.height = this.getTileSize(this.data.name).height + 'px';
    document.getElementsByClassName('gridTile__content--' + this.data.name)[0].style.width = this.getTileSize(this.data.name).width + 'px';
    document.getElementsByClassName('gridTile--' + this.data.name)[0].style.left = this.getTilePosition(this.data.name).x + 'px';
    document.getElementsByClassName('gridTile--' + this.data.name)[0].style.top = this.getTilePosition(this.data.name).y + 'px';
    this.setMaxZIndex();
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';

.gridTile {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: $background__grey_white;
  border-radius: 8px;
  padding: 0;
  &__headerContainer {
    padding: 10px 0;
    border-radius: 8px 8px 0 0;
  }
  &__header {
    min-height: 28px;
    max-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 42px;
    border-left: 5px solid $color__blue;
    // border-radius: 3px;
    cursor: move;
  }
  &__title {
    white-space: nowrap;
    margin-left: 25px;
  }
  &__icon {
    fill: $fill__red;
    width: 12px;
    height: 12px;
    cursor: pointer;
    margin-right: 9px;
  }
  &__content {
    position: relative;
    display: flex;
    overflow: hidden;
    resize: both;
    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      right: 0px;
      border-color: transparent;
      border-style: solid;
    }
    &::after {
      border-width: 6.5px;
      border-right-color: $color__blue;
      border-bottom-color: $color__blue;
      cursor: nw-resize;
    }
    &--chart {
      min-width: 740px;
      min-height: 300px;
    }
    &--history{
      min-width: 300px;
      min-height: 300px;
    }
    &--orders {
      min-width: 960px;
      min-height: 200px;
    }
    &--orderBook {
      min-width: 760px;
      min-height: 200px;
    }
    &--photos {
      min-width: 600px;
      min-height: 330px;
    }
    &--tokenInfo {
      min-width: 500px;
      min-height: 400px;
    }
  }
  &__orderBook {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__orderBookTable {
    // max-width: 47%;
  }
}
</style>
