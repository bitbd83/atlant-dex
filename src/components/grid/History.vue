// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
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
  background-color: $background__white;
  padding: 15px 0 15px 15px;
  border-radius: 8px;
  border: 1px solid $color__grey_border;
  &:hover {
    background-color: $background__grey_dark;
  }
  &__container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-right: 15px;
  }
  &__table {
    width: 100%;
  }
  &__row {
    & td {
      &:nth-child(1) {
        text-align: left;
      }
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
        text-align: right;
      }
    }
  }
  &__cell {
    width: 33.333%;
    &--buy {
      color: $color__green;
    }
    &--sell {
      color: $color__red;
    }
  }
}
</style>
