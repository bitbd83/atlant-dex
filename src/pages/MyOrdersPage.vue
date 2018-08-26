// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title="My orders",
  :data="orders",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checked='checked',
  :getRepeat="getRepeat",
  :getExport="getExport",
  :isCheckbox="false",
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
)
  .myOrders.table
    table.table__body
      thead
        tr.myOrders__row
          th
          th
          th ID
          th Timestamp
          th Fee
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='action' && !asc}" @click="sortOrders('action')") Action
          th Pair
          th Amount
          th Price
          th Total
    CSSLoader(v-if="loadingContent")
    .table.myOrders__table(v-else v-scrollbar="")
      table.table__body
        transition-group(
          v-for="(item, index) in orders",
          tag="tbody",
          :key="index",
          name="order-list",
        )
          tr.myOrders__row(
            @click="getTrades(item.id)"
            key="main"
          )
            td.myOrders__checkboxCell
              .myOrders__checkboxContainer
                div(@click.stop="()=>{}")
                  Radio(isTable="", :name="item", :value="item", v-model="checked")
            td.myOrders__checkboxCell
              .myOrders__chevronContainer(v-if="isOrderHasDetails(item)")
                .myOrders__chevron(:class="{'myOrders__chevron--down': isOrderDetailed(item)}")
            td {{item.id}}
            td {{setDate(item.creationDate)}}
            td {{getOrderFee(item)}}
            td.myOrders__action(:class="'myOrders__action--' + getAction(item.side)") {{getAction(item.side)}}
            td {{item.baseCurrency}}/{{item.quoteCurrency}}
            td {{item.totalQuantity | setFixNumber}} {{item.baseCurrency}}
            td {{item.price | setFixNumber}} {{item.quoteCurrency}}
            td {{item.totalQuantity * item.price | setFixNumber}} {{item.quoteCurrency}}
          tr.myOrders__loading(
            key="spinner"
            v-if="isOrderTradesLoading(item)",
          )
            td(colspan="9") loading...
          tr.myOrders__trades.order-list-item(
            v-for="(trade, index) in item.trades",
            v-if="isOrderDetailed(item)",
            :key="index",
          )
            td.myOrders__guidline
            td
            td
            td
            td {{getTradeFee(item.side, trade)}}
            td.myOrders__action(:class="'myOrders__action--' + getTradeAction(item.side)") {{getTradeAction(item.side)}}
            td {{trade.baseCurrency}}/{{trade.quoteCurrency}}
            td {{trade.amount | setFixNumber}} {{trade.baseCurrency}}
            td {{trade.price | setFixNumber}} {{trade.quoteCurrency}}
            td {{trade.amount * trade.price | setFixNumber}} {{trade.quoteCurrency}}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {getOrdersCSV} from 'services/api/orders';
import {exportCSV} from 'services/misc';
import {scrollbar} from '@/directives';
import {DateTime} from 'luxon';
import TableLayout from 'layouts/TableLayout';
import Radio from 'components/Radio';
import CSSLoader from 'components/CSSLoader';

export default {
  data() {
    return {
      checked: undefined,
      currentOrderId: null,
      orderIdTradesLoading: null,
      page: 1,
      sortBy: 'action',
      asc: false,
      itemsOnPage: 10,
      loadingContent: false,
      isLoadingError: false,
    };
  },
  computed: {
    ...mapGetters('orders', {
      orders: 'getAccountOrders',
      orderFilter: 'getAccountOrderFilter',
      totalItems: 'getAccountOrdersItems',
    }),
    ...mapGetters('membership', ['isLoggedIn']),

    setPagesCount() {
      return Math.ceil(this.totalItems / this.itemsOnPage);
    },
    // isCancelActive() {
    //   return (this.checked.status == 0 || this.checked.status == 1);
    // },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('orders', [
      'getAccountOrders',
      'getTradesForOrder',
    ]),
    setDate(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    getAction(side) {
      return (side === 0) ? 'buy' : 'sell';
    },
    getOrderFee(order) {
      return `${order.fee} ${(order.side === 0) ? order.baseCurrency : order.quoteCurrency}`;
    },
    getTradeAction(orderSide) {
      return (orderSide === 1) ? 'buy' : 'sell';
    },
    getTradeFee(orderSide, trade) {
      return (orderSide === 1) ? `${trade.buyerFee} ${trade.baseCurrency}` : `${trade.sellerFee} ${trade.quoteCurrency}`;
    },
    setCurrentOrderId(orderId) {
      if (this.currentOrderId === orderId) {
        this.currentOrderId = null;
      } else {
        this.currentOrderId = orderId;
      }
    },
    isOrderDetailed(order) {
      return order.id === this.currentOrderId;
    },
    isOrderHasDetails(order) {
      return order.leavesQuantity !== order.totalQuantity;
    },
    isOrderTradesLoading(order) {
      return order.id === this.orderIdTradesLoading;
    },
    getMyOrders() {
      if (this.isLoggedIn === false) return false;
      this.isLoadingError = false;
      this.loadingContent = true;
      this.getAccountOrders({
        page: this.page,
        limit: this.itemsOnPage,
        sortBy: this.sortBy,
        ascending: this.asc,
      }).then((response) => {
        this.loadingContent = false;
        return response;
      }).catch((error) => {
        this.isLoadingError = true;
        return error;
      });
    },
    getTrades(orderId) {
      if (this.currentOrderId !== orderId) {
        this.orderIdTradesLoading = orderId;
        this.getTradesForOrder(orderId).then((response) => {
          this.orderIdTradesLoading = false;
          return response;
        }).catch((error) => {
          this.orderIdTradesLoading = false;
          return error;
        });
      }
      this.setCurrentOrderId(orderId);
    },
    changeActivePage(num) {
      this.page = num;
      this.getMyOrders();
    },
    sortOrders(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getMyOrders();
    },
    getRepeat() {
      if (this.checked == undefined) return false;
      this.openModal({
        name: 'modalBuySell',
        data: {
          baseCurrency: this.checked.baseCurrency,
          quoteCurrency: this.checked.quoteCurrency,
          totalQuantity: this.checked.totalQuantity,
          price: this.checked.price,
          isBuy: !this.checked.side,
          type: this.checked.type,
        },
      });
    },
    getExport() {
      getOrdersCSV({
        SortBy: this.sortBy,
        Ascending: this.asc,
      }).then((res) => {
        exportCSV(res, 'orders');
      }).catch((res) => {
        serverNotification(res);
      });
    },
  },
  filters: {
    setFixNumber(num, fixedTo = 4) {
      return (num.toString().split('.').pop().length > fixedTo) ? num.toFixed(fixedTo) : num;
    },
  },
  watch: {
    asc() {
      this.page = 1;
    },
    orderFilter() {
      this.page = 1;
      this.getMyOrders();
    },
    setPageNum() {
      this.getAccountTradeHistory;
    },
    setPagesCount() {
      this.getAccountTradeHistory;
    },
    dataType() {
      this.getAccountTradeHistory;
    },
    isLoggedIn() {
      this.getMyOrders();
    },
  },
  created() {
    this.getMyOrders();
  },
  directives: {
    scrollbar,
  },
  components: {
    TableLayout,
    Radio,
    CSSLoader,
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';
.myOrders {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  width: 100%;
  &__table {
    position: relative;
  }
  &__action {
    text-transform: capitalize;
    &--buy {
      color: $color_green;
    }
    &--sell {
      color: $color_red;
    }
  }
  &__row {
    cursor: pointer;
    & > td, th {
      width: 10%;
      &:nth-child(1) {
        width: 50px;
      }
      &:nth-child(2) {
        width: 50px;
      }
      &:nth-child(4) {
        width: 125px;
      }
      &:nth-child(5) {
        width: 125px;
      }
    }
    &:hover {
      background-color: rgba(#000, .1);
    }
  }
  &__trades {
    height: 30px;
    font-size: 11px;
    /*background-color: rgba(#000, .1);*/
    font-weight: normal;
  }
  &__guidline {
    $line-color: #e9bd2455;
    position: relative;
    tbody tr.myOrders__trades:last-child &:before {
      bottom: 50%;
      width: 5px;
      border-bottom: 1px solid $line-color;
    }
  }
  &__chevronContainer {
    display: flex;
    align-items: center;
    flex: 1;
  }
  &__chevron {
    border-color: $color__blue;
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    height: 10px;
    margin: 0 5px 0 15px;
    position: relative;
    transform: rotate(-45deg);
    transition: transform .3s;
    width: 10px;

    &--down {
      transform: rotate(135deg);
    }
  }
  &__checkboxCell {
    width: 50px;
    position: relative;
  }
  &__checkboxContainer {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__checkbox {
    position: absolute;
    top: 20px;
  }
  &__loading {
    text-align: center;
    height: 30px;
    font-size: 10px;
    font-weight: 300;
  }
  .order-list-enter, .order-list-leave-to {
    opacity: 0;
    height: 0;
    line-height: 0;
  }
  .order-list-enter-active, .order-list-leave-active {
    transition: all .3s;
  }
}
</style>
