// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TablePageLayout(
  title="Transaction history",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :checkedArray='checked',
  :changeActivePage="changeActivePage"
  :getRepeat="getRepeat",
  :isCheckbox="false",
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
  :getApiRequest="getUserTransactions"
)
  .tHistory.table
    table.table__body
      thead
        tr
          th
          th {{$t('pages.id')}}
          th.table__sortable(:class="{'table__sortable--active': sortBy==='datetime'}" @click="sortTransactions('datetime')") {{$t('pages.time')}}
          th {{$t('pages.amount')}}
          th.tHistory__header--description {{$t('pages.description')}}
          th.table__sortable(:class="{'table__sortable--active': sortBy==='status'}" @click="sortTransactions('status')") {{$t('pages.type_status')}}
      tbody
        tr(v-for="(item, index) in data")
          td.tHistory__checkboxContainer
            Radio(size="17", :name="item", :value="item", v-model="checked")
          td {{item.transactionId}}
          td.tHistory__date {{setDate(item.creationDate)}}
          td.tHistory__amount(:class="'tHistory__amount--' + (!item.type ? 'positive' : 'negative')") {{item.amount}} {{item.currency}}
          td.tHistory__description {{item.description}}
          td.tHistory__status(:class="'tHistory__status--' + status[item.status].toLowerCase()") {{status[item.status]}}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {notification} from 'services/notification';
import Radio from 'components/Radio';
import Icon from 'components/Icon';
import TablePageLayout from 'layouts/TablePageLayout';

export default {
  data() {
    return {
      checked: {},
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
      if (this.isNothingChecked()) return false;
      let name = !this.checked.type ? 'cryptoWithdraw' : 'cryptoDeposit';
      this.openModal({
        name: name,
        data: {
          currency: this.checked.currency,
          amount: this.checked.amount,
        },
      });
    },
    isNothingChecked() {
      if (typeof this.checked.transactionId == 'undefined') {
        notification({
          title: '',
          text: this.$t('please_choose_transaction'),
          type: 'error',
        });
        return true;
      };
      return false;
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
  components: {
    TablePageLayout,
    Icon,
    Radio,
  },
};
</script>


<style lang="scss" scoped>
@import "~variables";
.tHistory {
  &__header {
    &--description {
      padding-left: 26px;
    }
  }
  &__description {
    min-width: 320px;
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
    min-width: 32px;
    position: relative;
  }
  &__checkbox {
    position: absolute;
    top: 20px;
  }
}
</style>
