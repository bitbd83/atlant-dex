<template lang='pug'>
GridTile(title='Trade history')
  .history
    .history__container(v-scrollbar="")
      table.history__table
        tbody.history__body
          tr.history__row(v-for='(trade, index) in lastTrades')
            td.history__cell(:class="`history__cell--${(trade.side) ? 'sell' : 'buy'}`") {{trade.price}}
            td.history__cell {{trade.amount.toFixed(4)}}
            td.history__cell {{(trade.price * trade.amount).toFixed(4)}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import GridTile from './GridTile';

export default {
  computed: {
    ...mapState('tradeInfo', {
      pair: 'pair',
    }),
    ...mapGetters('orders', {
      lastTrades: 'getLastTrades',
    }),
  },
  methods: {
    ...mapActions('orders', {
      getTradeHistory: 'getTradeHistory',
    }),
    getApiRequest() {
      this.getTradeHistory();
    },
  },
  watch: {
    pair() {
      this.getApiRequest();
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    GridTile,
  },
  created() {
    this.getApiRequest();
  },
};
</script>

<style lang="scss">
@import 'variables';

.history {
  display: flex;
  width: 100%;
  border-radius: 8px;
  border: 1px solid $color__grey;
  &__container {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin: 30px;
  }
  &__table {
    width: 100%;
  }
  &__cell {
    width: 33.333%;
    &--buy {
      color: $color_green;
    }
    &--sell {
      color: $color_red;
    }
  }
}
</style>
