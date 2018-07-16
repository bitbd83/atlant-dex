// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

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
  padding: 30px 15px 30px 30px;
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
    &--ask {
      color: $color__red;
    }
    &--bid {
      color: $color__green;
    }
  }
}

</style>
