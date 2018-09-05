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
      .book__side
        Loader(:isLoading="loading")
        .book__container(v-scrollbar="")
          table.book__table
            tr.book__title
              //- th Amount
              th Total
              th Price
            tr.book__row(v-for="(order, index) in book.bids")
              //- td.book__cell {{order.amount.toFixed(4)}}
              td.book__cell {{(order.price * order.amount) | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
              td.book__cell.book__cell--bid {{order.price | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
      .book__side
        Loader(:isLoading="loading")
        .book__container(v-scrollbar="")
          table.book__table
            tr.book__title
              th Price
              //- th Amount
              th Total
            tr.book__row(v-for="(order, index) in book.asks")
              td.book__cell.book__cell--ask {{order.price | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
              //- td.book__cell {{order.amount.toFixed(4)}}
              td.book__cell {{(order.price * order.amount) | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
</template>

<script>
import TileBase from '../../mixins/TileBase';
import {mapState, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import Loader from 'components/Loader';

export default {
  mixins: [TileBase],
  components: {
    Loader,
  },
  computed: {
    ...mapState('tradeInfo', {
      pair: 'pair',
    }),
    ...mapState('orders', {
      book: (state) => state.book,
    }),
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    ...mapActions('orders', [
      'getOrderBook',
    ]),
    getApiRequest() {
      this.loading = true;
      this.getOrderBook({limit: 20})
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

.index--dark .book{
  border: 1px solid $border__dark_theme_tile;
  background: $background__dark_tile;
}

.book {
  display: flex;
  flex-grow: 2;
  padding: 10px 0 10px 10px;
  border-radius: 8px;
  border: 1px solid $color__grey_border;
  background-color: $background__white;
  &__side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    &:first-child {
      border-right: 1px solid $color__grey_border;
    }
    &:nth-child(2) {
      padding-left: 15px;
    }
  }
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-right: 15px;
  }
  &__table {
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
