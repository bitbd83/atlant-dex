// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.book
  .book__container(v-scrollbar="")
    table.book__body
      tr.book__row(v-for="(order, index) in orderBook")
        td.book__cell(:class="`book__cell--${(ask) ? 'ask' : 'bid'}`") {{order.price}}
        td.book__cell {{order.amount.toFixed(4)}}
        td.book__cell {{(order.price * order.amount).toFixed(4)}}
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {scrollbar} from '@/directives';

export default {
  computed: {
    ...mapState('tradeInfo', {
      pair: 'pair',
    }),
    ...mapState('orders', {
      book: (state) => state.book,
      status: (state) => state.book.status,
    }),
    orderBook() {
      const items = this.ask ? this.book.asks : this.book.bids;
      return items; // .slice(0, this.limit);
    },
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
    status() {
      if (this.status === 1) this.getApiRequest();
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
  padding: 15px 0 15px 15px;
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
