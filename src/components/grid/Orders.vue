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
    OrdersHeader

  TileContent(
    :height="data.height"
    :width="data.width"
    :name="data.name"
  )
    .orders
      CSSLoader(v-if="loading")
      .orders__container(v-scrollbar="")
        table.orders__table
          th.orders__head
            td.orders__title.orders__title--trash
            td.orders__title.orders__title--sell {{$t('side')}}
            td.orders__title.orders__title--type {{$t('type')}}
            td.orders__title.orders__title--number {{$t('price')}}
            td.orders__title.orders__title--number {{$t('current')}}
            td.orders__title.orders__title--number {{$t('initial')}}
            td.orders__title.orders__title--status {{$t('status')}}
            td.orders__title.orders__title--date {{$t('date')}}
        table.orders__table
          tr.orders__row(v-for="order in (isActive ? getActiveOrders : getClosedOrders)", :key="order.id")
            td.orders__cell.orders__cell--trash
              Icon.orders__trash(id='trash' @click="isActive ? deleteOrder(order.id) : ''", :class="'orders__trash--' + (isActive ? 'active' : 'disabled')")
            td.orders__cell.orders__cell--sell
              .orders__typeWrapper
                .orders__square(:class="'orders__square--' + getAction(order.side)")
                .orders__type {{getAction(order.side)}}
            td.orders__cell.orders__cell--type {{orderType[order.type]}}
            td.orders__cell.orders__cell--number {{order.price | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
            td.orders__cell.orders__cell--number {{order.leavesQuantity | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
            td.orders__cell.orders__cell--number {{order.totalQuantity | currency('', 2, { thousandsSeparator: '', decimalSeparator: '.'})}}
            td.orders__cell.orders__cell--status {{orderStatus[order.status]}}
            td.orders__cell.orders__cell--date {{setDate(order.creationDate)}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {scrollbar} from '@/directives';
import OrdersHeader from './OrdersHeader';
import TileBase from '../../mixins/TileBase';
import CSSLoader from 'components/CSSLoader';

export default {
  mixins: [TileBase],
  data() {
    return {
      loading: false,
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
      this.loading = true;
      this.getOrders()
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
    CSSLoader,
  },
};

</script>

<style lang='scss'>
@import 'variables';
.orders {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  border-radius: 8px;
  border: 1px solid $color__grey_border;
  background-color: $background__white;
  padding: 10px;
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  &__table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
  }
  &__row {
    height: 33px;
    padding-bottom: 15px;
    cursor: pointer;
    &:hover {
      background-color: $background__blue_light;
    }
  }
  &__cell, &__title {
    width: 12%;
    padding-bottom: 4px;
    &--sell {
      width: 90px;
    }
    &--date {
      min-width: 140px;
    }
    &--trash {
      width: 20px;
      max-width: 20px;
      min-width: 20px;
    }
    &--number {
      text-align: right;
      padding-right: 20px;
    }
  }
  &__head {
    text-align: left;
    text-transform: uppercase;
    color: $color__grey;
    font-size: 10px;
    font-weight: 300;
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
