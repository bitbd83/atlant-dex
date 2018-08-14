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
    .book
      .book__container(v-scrollbar="")
        table.book__body
          tr.book__title
            //- th Amount
            th Total
            th Price
          tr.book__row(v-for="(order, index) in book.bids")
            //- td.book__cell {{order.amount.toFixed(4)}}
            td.book__cell {{(order.price * order.amount).toFixed(4)}}
            td.book__cell.book__cell--bid {{order.price}}
    .book
      .book__container(v-scrollbar="")
        table.book__body
          tr.book__title
            th Price
            //- th Amount
            th Total
          tr.book__row(v-for="(order, index) in book.asks")
            td.book__cell.book__cell--ask {{order.price}}
            //- td.book__cell {{order.amount.toFixed(4)}}
            td.book__cell {{(order.price * order.amount).toFixed(4)}}
</template>

<script>
import TileBase from '../../mixins/TileBase';
import {mapState, mapActions} from 'vuex';
import {scrollbar} from '@/directives';

export default {
  mixins: [TileBase],
  computed: {
    ...mapState('tradeInfo', {
      pair: 'pair',
    }),
    ...mapState('orders', {
      book: (state) => state.book,
    }),
  },
  methods: {
    ...mapActions('orders', [
      'getOrderBook',
    ]),
    getApiRequest() {
      this.getOrderBook({limit: 20});
    },
  },
  watch: {
    pair() {
      this.getApiRequest();
    },
  },
  created() {
    this.getApiRequest();
  },
  props: {
    ask: {
      type: Boolean,
      default: false,
      required: false,
    },
    limit: {
      type: Number,
      default: 20,
      required: false,
    },
  },
  directives: {
    scrollbar,
  },
};
</script>

<style lang="scss">
@import 'variables';

.book {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  padding: 5px 0 5px 5px;
  border-radius: 8px;
  border: 1px solid $color__grey_border;
  background-color: $background__white;
  &:hover {
    background-color: $background__grey_dark;
  }
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-right: 15px;
  }
  &__title {
    text-transform: uppercase;
    color: $color__grey;
    font-size: 12px;
    font-weight: 300;
    height: 25px;
    padding-bottom: 25px;
    & th {
      text-align: right;
    }
  }
  &__row {
    & td {
      text-align: right;
    }
  }
  &__cell {
    width: 50%;
    // border: 1px solid black;
    &--ask {
      color: $color__red;
    }
    &--bid {
      color: $color__green;
    }
  }
}

</style>
