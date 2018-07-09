<template lang='pug'>
.gridTile(:class="'gridTile--' + data.name")
  .gridTile__header(:class="'gridTile__header--' + data.name")
    .title.gridTile__title {{data.title}}:
    OrderBookHeader(v-if="data.name === 'orderBook'")
    ChartHeader(v-if="data.name === 'chart'")
    Icon.gridTile__icon(id="hide" @click="removeTile(data.name)")
  .gridTile__content(:class="'gridTile__content--' + data.name")
    History(v-if="data.name === 'history'")
    Orders(:isActive="true" v-if="data.name === 'openOrders'")
    Orders(v-if="data.name === 'closedOrders'")
    .gridTile__orderBook(v-if="data.name === 'orderBook'")
      OrderBook.gridTile__orderBookTable(ask)
      OrderBook.gridTile__orderBookTable
    BuySell(v-if="data.name === 'buySell'")
    Chart(v-if="data.name === 'chart'")
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import Chart from './Chart';
import ChartHeader from './ChartHeader';
import Orders from './Orders';
import BuySell from './BuySell';
import OrderBook from './OrderBook';
import OrderBookHeader from './OrderBookHeader';
import History from './History';

export default {
  computed: {
    ...mapState('grid', [
      'gridData',
    ]),
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
    OrderBook,
    OrderBookHeader,
    History,
    BuySell,
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
  // border-radius: 3px;
  padding: 0;
  &__header {
    min-height: 42px;
    max-height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 42px;
    border-left: 7px solid $color__blue;
    margin-bottom: 13px;
    // border-radius: 3px;
    cursor: move;
  }
  &__title {
    margin-left: 20px;
  }
  &__icon {
    fill: $fill__red;
    width: 19px;
    height: 15px;
    cursor: pointer;
    margin-right: 5px;
  }
  &__content {
    position: relative;
    display: flex;
    overflow: hidden;
    resize: both;
    // background-color: transparent;
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
      min-width: 520px;
      min-height: 300px;
    }
    &--history{
      min-width: 300px;
      min-height: 300px;
    }
    &--openOrders {
      min-width: 520px;
      min-height: 200px;
    }
    &--orderBook {
      min-width: 760px;
      min-height: 200px;
    }
  }
  &__orderBook {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__orderBookTable {
    max-width: 47%;
  }
}
</style>
