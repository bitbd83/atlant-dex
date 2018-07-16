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
  padding: 30px 15px 30px 30px;
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
