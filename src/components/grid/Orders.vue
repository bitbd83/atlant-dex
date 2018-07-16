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
.orders
  .orders__container(v-scrollbar="")
    table.orders__body
      tr.orders__row(v-for="order in (isActive ? getActiveOrders : getClosedOrders)", :key="order.id")
        td.orders__cell.orders__cell--sell
          .orders__typeWrapper
            .orders__square(:class="'orders__square--' + getAction(order.side)")
            .orders__type {{getAction(order.side)}}
        td.orders__cell.orders__cell--type {{orderType[order.type]}}
        td.orders__cell.orders__cell--number {{order.price}}
        td.orders__cell.orders__cell--number {{order.leavesQuantity}}
        td.orders__cell.orders__cell--number {{order.totalQuantity}}
        td.orders__cell.orders__cell--status {{orderStatus[order.status]}}
        td.orders__cell.orders__cell--date {{setDate(order.creationDate)}}
        td.orders__cell.orders__cell--trash
          Icon.orders__trash(id='trash' @click="isActive ? deleteOrder(order.id) : ''", :class="'orders__trash--' + (isActive ? 'active' : 'disabled')")
  table.orders__body
    tr.orders__title
      td.orders__cell--sell Side
      td.orders__cell--type Type
      td.orders__cell--number Price
      td.orders__cell--number Current
      td.orders__cell--number Initial
      td.orders__cell--status Status
      td.orders__cell--date Date
      td.orders__cell--trash
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {scrollbar} from '@/directives';

export default {
  data() {
    return {
      orderStatus: [
        'Open',
        'Partially filled',
        'Filled',
        'Cancelled',
      ],
      orderType: [
        'Limit',
        'Market',
      ],
    };
  },
  computed: {
    ...mapState('trade', {
      orders: (state) => state.orders,
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapGetters('trade', {
      getActiveOrders: 'getActiveOrders',
      getClosedOrders: 'getClosedOrders',
    }),
  },
  methods: {
    ...mapActions('trade', {
      getOrders: 'getOrders',
      cancelOrder: 'cancelOrder',
    }),
    setDate(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    deleteOrder(id) {
      this.cancelOrder(id);
    },
    getApiRequest() {
      this.getOrders();
    },
    getAction(side) {
      return (side === 0) ? 'buy' : 'sell';
    },
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) this.getApiRequest();
    },
  },
  created() {
    this.getApiRequest();
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  directives: {
    scrollbar,
  },
};

</script>

<style lang='scss'>
// @import 'perfect-scrollbar/dist/css/perfect-scrollbar';
@import 'variables';
.orders {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  &__container {
    position: relative;
    display: flex;
  }
  &__body {
    width: 100%;
    padding-right: 15px;
  }
  &__cell {
    padding-bottom: 4px;
    &--sell {
      width: 55px;
    }
    &--type {
      width: 43px;
    }
    &--number {
      width: 69px;
    }
    &--status {
      width: 55px;
    }
    &--date {
      width: 66px;
    }
    &--trash {
      width: 12px;
    }
  }
  &__title {
    text-align: left;
    text-transform: uppercase;
    color: lighten(desaturate(adjust-hue($color_blue, 9), 47.23), 11.96);
  }
  &__typeWrapper {
    display: flex;
    align-items: center;
  }
  &__type {
    text-transform: uppercase;
  }
  &__square  {
    $size: 8px;
    width: $size;
    height: $size;
    border-radius: 1px;
    margin-right: 16px;
    &--buy {
      background-color: #7ed321;
    }
    &--sell {
      background-color: #f33a3a;
    }
  }
  &__trash {
    width: 7px;
    height: 9px;
    &--active {
      cursor: pointer;
      fill: $color_yellow;
      &:hover {
        fill: $color_red;
      }
    }
    &--disabled {
      fill: #4a4a4a;
    }
  }
}
</style>
