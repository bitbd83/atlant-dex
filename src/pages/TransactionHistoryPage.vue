// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title="Transaction history",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :checked='checked',
  :changeActivePage="changeActivePage"
  :getRepeat="getRepeat",
  :getExport="getExport",
  :isCheckbox="false",
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
)
  .tHistory
    .table
      table.table__body
        thead
          tr
            th.tHistory__checkboxContainer
            th.tHistory__cell {{$t('pages.id')}}
            th.tHistory__cell.table__sortable(:class="{'table__sortable--desc': sortBy==='datetime' && !asc}" @click="sortTransactions('datetime')") {{$t('pages.time')}}
            th.tHistory__cell {{$t('pages.amount')}}
            th.tHistory__header--description {{$t('pages.description')}}
            th.tHistory__cell.table__sortable(:class="{'table__sortable--desc': sortBy==='status' && !asc}" @click="sortTransactions('status')") {{$t('pages.type_status')}}
    Loader(v-if="loadingContent")
    .table.tHistory__table(v-else v-scrollbar="")
      table.table__body
        tbody
          tr(v-for="(item, index) in data")
            td.tHistory__checkboxContainer
              Radio.tHistory__radio(isTable="", :name="item", :value="item", v-model="checked")
            td.tHistory__cell {{item.transactionId}}
            td.tHistory__cell.tHistory__date {{setDate(item.creationDate)}}
            td.tHistory__cell.tHistory__amount(:class="'tHistory__amount--' + (!item.type ? 'positive' : 'negative')") {{item.amount}} {{item.currency}}
            td.tHistory__description {{item.description}}
            td.tHistory__cell.tHistory__status(:class="'tHistory__status--' + status[item.status].toLowerCase()") {{status[item.status]}}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {getAccountTransactionCSV} from 'services/api/user';
import {exportCSV} from 'services/misc';
import {serverNotification} from 'services/notification.js';
import {scrollbar} from '@/directives';
import {DateTime} from 'luxon';
import TableLayout from 'layouts/TableLayout';
import Radio from 'components/Radio';
import Loader from 'components/Loader';

export default {
  data() {
    return {
      checked: undefined,
      status: [
        'Pending',
        'Processing',
        'Completed',
        'Cancelled',
        'Declined',
        'Authorizing',
        'Wallet',
      ],
      sortBy: 'datetime',
      asc: false,
      loadingContent: false,
      isLoadingError: false,
    };
  },
  computed: {
    ...mapGetters('user', {
      data: 'getAccountTransactions',
      totalItems: 'getAccountTransactionItems',
      page: 'getAccountTransactionPage',
      limit: 'getAccountTransactionLimit',
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.limit);
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapMutations('user', [
      'setAccountTransactionPage',
    ]),
    ...mapActions('user', {
      getAccountTransactionHistory: 'getAccountTransactionHistory',
    }),
    setDate(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    getUserTransactions() {
      if (this.isLoggedIn === false) return false;

      this.isLoadingError = false;
      this.loadingContent = true;
      this.getAccountTransactionHistory({
        page: this.page,
        limit: this.limit,
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
    getExport() {
      getAccountTransactionCSV({
        SortBy: this.sortBy,
        Ascending: this.asc,
      }).then((res) => {
        exportCSV(res, 'transactions');
      }).catch((res) => {
        serverNotification(res);
      });
    },
    sortTransactions(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getUserTransactions();
    },
    changeActivePage(num) {
      this.setAccountTransactionPage(num);
      this.getUserTransactions();
    },
    getRepeat() {
      if (this.checked == undefined) return false;
      let name = this.checked.type ? 'cryptoWithdraw' : 'cryptoDeposit';
      this.openModal({
        name: name,
        data: {
          currency: this.checked.currency,
          amount: this.checked.amount,
        },
      });
    },
  },
  watch: {
    isLoggedIn() {
      this.getUserTransactions();
    },
  },
  created() {
    this.setAccountTransactionPage(1);
    this.getUserTransactions();
  },
  directives: {
    scrollbar,
  },
  components: {
    TableLayout,
    Radio,
    Loader,
  },
};
</script>


<style lang="scss" scoped>
@import "~variables";
.tHistory {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  width: 100%;
  &__table {
    position: relative;
  }
  &__amount {
    &--positive {
      color: $color_malachite;
      &:before {
        content: "+ ",
      }
    }
    &--negative {
      color: $color_red;
      &:before {
        content: "- ",
      }
    }
  }
  &__icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 14px;
    width: 12px;
    height: 12px;
    fill: $color_white;
    visibility: hidden;
    &--visible {
      visibility: visible;
    }
  }
  &__status {
    color: $color_grey;
    &--completed {
      color: $color_green;
    }
    &--error {
      color: $color_red;
    }
  }
  &__checkboxContainer {
    width: 50px;
    position: relative;
  }
  &__radio {
    padding-left: 10px;
  }
  &__cell, &__sortable {
    width: 10%;
  }
  &__description {
    min-width: 320px;
  }
}
</style>
