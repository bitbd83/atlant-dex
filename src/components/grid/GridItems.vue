<template lang="pug">
.gridItem
  .gridItem__tile(v-if="this.component === 'buySell'")
    .gridItem__tileContent
      BuySell
  .gridItem__tile(v-if="this.component === 'chart'")
    .gridItem__tileContent
      Chart
  .gridItem__tile.gridItem__tile--history(v-if="this.component === 'history'" )
    .gridItem__tileContent.gridItem__tileContent--history
      History
  .gridItem__tile(v-if="this.component === 'book'")
    .gridItem__tileContent.gridItem__tileContent--books
      .gridItem__booksTitle
        .gridItem__tile
          OrderBookHeader
        .gridItem__tile
          OrderBookHeader(ask)
      .gridItem__books
        .gridItem__containerWitchOverflow(v-scrollbar="")
          OrderBook.gridItem__book(:limit='19')
        .gridItem__containerWitchOverflow(v-scrollbar="")
          OrderBook.gridItem__book(ask, :limit='19')
  .gridItem__tile(v-if="this.component === 'orders'")
    .gridItem__tileContent.gridItem__tileContent--orders
      .gridItem__tileContent--ordersTop
        Orders(:isActive="true")
      .gridItem__ordersSep
      .gridItem__tileContent--ordersBottom
        Orders
  Icon.gridItem__deleteTile(id="trash", @click="removeGridLayout(component)" v-show="isEdit")
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {scrollbar} from '@/directives';
import BuySell from './BuySell';
import Chart from './Chart';
import Orders from './Orders';
import OrderBook from './OrderBook';
import OrderBookHeader from './OrderBookHeader';
import History from './History';

export default {
  computed: {
    ...mapState('grid', {
      isEdit: 'isEdit',
    }),
  },
  methods: {
    ...mapMutations('grid', {
      removeGridLayout: 'removeGridLayout',
    }),
  },
  props: {
    component: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    BuySell,
    Chart,
    Orders,
    OrderBook,
    OrderBookHeader,
    History,
  },
};
</script>

<style lang="scss">
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import 'variables';
@import '~@/sass/overrides';

.gridItem {
  height: 100%;
  outline: 1px solid #032537;
  position: relative;
  &__tile {
    width: 100%;
    height: 100%;
    background-color: $color__white;
  }
  &__tileContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &--buysell {
      width: 15%;
    }
    &--chart {
      width: 35%;
      height: 512px;
    }
    &--map {
      width: 40%;
    }
    &--history {
      padding: $default_spacing;
    }
    &--orders {
      padding: $default_spacing;
    }
    &--ordersTop {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    &--ordersBottom {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  &__tileHeader {
    &--history {
      margin-bottom: $default_spacing;
    }
    &--book {
      padding: $default_spacing;
    }
    &--orders {
      margin-bottom: $default_spacing;
    }
  }
  &__booksTitle {
    display: flex;
  }
  &__books {
    width: 100%;
    display: flex;
    padding: 13px;
  }
  &__ordersSep {
    $margin: 18px;
    width: 100%;
    margin-top: $margin;
    margin-bottom: $margin + 8;
    border: 1px solid #032537;
  }
  &__containerWitchOverflow {
    position: relative;
    display: flex;
    flex: 1;
  }
  &__deleteTile {
    position: absolute;
    top: 10px;
    right: 10px;
    fill: red;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
