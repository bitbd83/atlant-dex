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

<template lang="pug">
TablePageLayout(
  title="Transaction history",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage"
  :checkedArray.sync="checkedArray",
  :getRepeat="true",
  :getCancel="true",
  :getExport="true",
)
  .tHistory.table
    table.table__body
      thead
        tr
          th
          th ID
          th.table__sortable(:class="{'table__sortable--active': sortBy==='datetime'}" @click="sortTransactions('datetime')") Time
          th Amount
          th.tHistory__header--description Description
          th.table__sortable(:class="{'table__sortable--active': sortBy==='status'}" @click="sortTransactions('status')") Type Status
      tbody
        tr(v-for="(item, index) in data")
          td.tHistory__checkboxContainer
            Checkbox.tHistory__checkbox(:value="isChecked(item.id)", @change="setCheckedArray(item.id)", color="yellow")
          td {{item.id}}
          td.tHistory__date {{setDate(item.creationDate)}}
          td.tHistory__amount(:class="'tHistory__amount--' + (item.amount > 0 ? 'positive' : 'negative')") {{item.amount}} {{item.currency}}
          td.tHistory__description {{item.description}}
          td.tHistory__status(:class="'tHistory__status--' + status[item.status].toLowerCase()") {{status[item.status]}}
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import Checkbox from 'components/Checkbox';
import TablePageLayout from 'layouts/TablePageLayout';

export default {
  data() {
    return {
      checkedArray: [],
      status: [
        'Pending',
        'Processing',
        'Completed',
        'Cancelled',
        'Declined',
        'Authorizing',
        'Wallet',
      ],
      page: 1,
      limit: 10,
      sortBy: 'datetime',
      asc: false,
    };
  },
  computed: {
    ...mapGetters('user', {
      data: 'getAccountTransactions',
      totalItems: 'getAccountTransactionItems',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.limit);
    },
  },
  methods: {
    ...mapActions('user', {
      getAccountTransactionHistory: 'getAccountTransactionHistory',
    }),
    setDate(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    isChecked(id) {
      return this.checkedArray.indexOf(id) > -1;
    },
    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },
    getUserTransactions() {
      this.getAccountTransactionHistory({
        page: this.page,
        limit: this.limit,
        sortBy: this.sortBy,
        ascending: this.asc,
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
      this.page = num;
      this.getUserTransactions();
    },
  },
  created() {
    this.getUserTransactions();
  },
  components: {
    TablePageLayout,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';
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
