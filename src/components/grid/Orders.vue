// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
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
import GridTile from './GridTile';

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
    GridTile,
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
    margin: 15px;
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
