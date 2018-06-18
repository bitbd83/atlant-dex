<template lang='pug'>
.gridTile
  .gridTile__header
    .title.gridTile__title {{data.title}}:
    Icon.gridTile__icon(id="hide" @click="removeTile(data.name)")
  .gridTile__content(:class="'gridTile__content--' + data.name")
    History(v-if="data.name === 'history'")
    Orders(:isActive="true" v-if="data.name === 'openOrders'")
    Orders(v-if="data.name === 'closedOrders'")
    .gridTile__orderBook(v-if="data.name === 'orderBook'")
      OrderBook(ask)
      OrderBook
    BuySell(v-if="data.name === 'buySell'")
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import Chart from './Chart';
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
      'getTileHeight',
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
  },
  components: {
    Chart,
    Orders,
    OrderBook,
    OrderBookHeader,
    History,
    BuySell,
  },
  mounted() {
    document.getElementsByClassName('gridTile__content--' + this.data.name)[0].style.height = this.getTileHeight(this.data.name);
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';

.gridTile {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: $default_spacing;
  &__header {
    min-height: 42px;
    max-height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 42px;
    border-left: 7px solid $color__blue;
    margin-bottom: 13px;
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
  }
  &__content {
    position: relative;
    display: flex;
    overflow: hidden;
    resize: vertical;
    min-height: 80px;
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
      border-width: 13px;
      border-right-color: $color__blue;
      border-bottom-color: $color__blue;
    }
  }
  &__orderBook {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}
</style>
