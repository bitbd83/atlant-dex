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
Tile(
  :name="data.name"
  :left="data.x"
  :top="data.y"
)
  TileHeader(
    :name="data.name"
    :title="data.title"
  )
    OrdersHeader

  TileContent(
    :height="data.height"
    :width="data.width"
    :name="data.name"
  )
    .orders
      .orders__container(v-scrollbar="")
        table.orders__body
          tr.orders__title
            td.orders__cell.orders__cell--trash
            td.orders__cell.orders__cell--sell Side
            td.orders__cell.orders__cell--type Type
            td.orders__cell.orders__cell--number Price
            td.orders__cell.orders__cell--number Current
            td.orders__cell.orders__cell--number Initial
            td.orders__cell.orders__cell--status Status
            td.orders__cell.orders__cell--date Date
        table.orders__body
          tr.orders__row(v-for="order in (isActive ? getActiveOrders : getClosedOrders)", :key="order.id")
            td.orders__cell.orders__cell--trash
              Icon.orders__trash(id='trash' @click="isActive ? deleteOrder(order.id) : ''", :class="'orders__trash--' + (isActive ? 'active' : 'disabled')")
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
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {scrollbar} from '@/directives';
import OrdersHeader from './OrdersHeader';
import TileBase from '../../mixins/TileBase';

export default {
  mixins: [TileBase],
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
    ...mapState('orders', {
      dashboardOrdersType: 'dashboardOrdersType',
      orders: (state) => state.orders,
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapGetters('orders', {
      getActiveOrders: 'getActiveOrders',
      getClosedOrders: 'getClosedOrders',
    }),
    isActive() {
      return this.dashboardOrdersType === 'open';
    },
  },
  methods: {
    ...mapActions('orders', {
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
  directives: {
    scrollbar,
  },
  components: {
    OrdersHeader,
  },
};

</script>

<style lang='scss'>
@import 'perfect-scrollbar/dist/css/perfect-scrollbar';
@import 'variables';
.gridTile__content--orders {
  min-width: 960px;
  min-height: 200px;
}
.orders {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
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
    margin: 30px;
  }
  &__body {
    width: 100%;
    padding-right: 15px;
  }
  &__row {
    height: 33px;
    padding-bottom: 15px;
  }
  &__cell {
    width: 12%;
    padding-bottom: 4px;
    &--sell {
      width: 90px;
    }
    // &--type {
    //   width: 43px;
    // }
    // &--number {
    //   width: 69px;
    // }
    &--status {
      width: 124px;
    }
    &--date {
      width: 130px;
    }
    &--trash {
      max-width: 40px;
      width: 40px;
    }
  }
  &__title {
    text-align: left;
    text-transform: uppercase;
    color: $color__grey;
    font-size: 12px;
    font-weight: 300;
    height: 40px;
    padding-bottom: 25px;
  }
  &__typeWrapper {
    display: flex;
    align-items: center;
  }
  &__type {
    text-transform: uppercase;
  }
  &__square  {
    width: 30px;
    height: 10px;
    border-radius: 1px;
    margin-right: 16px;
    &--buy {
      background-color: $background__green;
    }
    &--sell {
      background-color: $background__red;
    }
  }
  &__trash {
    width: 11px;
    height: 11px;
    opacity: 0.2;
    &--active {
      cursor: pointer;
      &:hover {
        opacity: 1;
        fill: $color__red;
      }
    }
    &--disabled {
      fill: #4a4a4a;
    }
  }
}
</style>
