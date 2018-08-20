// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
Tile(
  :name="data.name"
  :left="data.x"
  :top="data.y"
)
  TileHeader(
    :name="data.name"
  )

  TileContent(
    :height="data.height"
    :width="data.width"
    :name="data.name"
  )
    .history
      CSSLoader(v-if="loading")
      .history__container(v-scrollbar="")
        table.history__table
          tbody.history__body
            tr.history__title
              th Price
              th Total
            tr.history__row(v-for='(trade, index) in lastTrades')
              td.history__cell(:class="`history__cell--${(trade.side) ? 'sell' : 'buy'}`") {{trade.price | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
              //- td.history__cell {{trade.amount | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
              td.history__cell {{(trade.price * trade.amount) | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import TileBase from '../../mixins/TileBase';
import CSSLoader from 'components/CSSLoader';

export default {
  mixins: [TileBase],
  components: {
    CSSLoader,
  },
  data() {
    return {
      loading: true,
    };
  },
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
      this.loading = true;
      this.getTradeHistory()
        .then(
          () => {
            this.loading = false;
          }
        )
        .catch(
          () => {
            this.loading = false;
          }
        );
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
  padding: 10px 0 10px 10px;
  border-radius: 8px;
  position: relative;
  border: 1px solid $color__grey_border;
  &__container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-right: 15px;
  }
  &__table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
  }
  &__title {
    text-transform: uppercase;
    color: $color__grey;
    font-size: 10px;
    font-weight: 300;
    height: 25px;
    padding-bottom: 25px;
    & th {
      text-align: right;
    }
  }
  &__row {
    cursor: pointer;
    &:hover {
      background-color: $background__blue_light;
    }
    & td {
      text-align: right;
    }
  }
  &__cell {
    &:nth-child(2) {
      width: 100%;
    }
    &--buy {
      color: $color__green;
    }
    &--sell {
      color: $color__red;
    }
  }
}
</style>
