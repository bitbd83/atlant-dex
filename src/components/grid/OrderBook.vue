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
  width: 45%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid $color__grey;
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 30px;
  }
  &__cell {
    width: 33.333%;
    &--ask {
      color: $color_red;
    }
    &--bid {
      color: $color_green;
    }
  }
}

</style>
